import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Profile} from '.';
import {
  AddNewAddress,
  AddressCard,
  Button,
  Loading,
  NavigationBar,
  VectorIcon,
} from '../components';
import {COLORS, FONTFAMIY, icons, SIZES} from '../constants';
import {FONTS} from '../constants/theme';
import {Divider} from 'react-native-elements';
import {
  useNavigation,
  StackActions,
  useIsFocused,
} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {calculateDistance, locationHelper} from '../utils';
import _ from 'lodash';
import {setSelectedProduct} from '../redux/productSlice';
import {createOrder} from '../helper/api';

// Collection
const userCollection = firestore().collection('users');
const orderCollection = firestore().collection('orders');

const Checkout = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);
  const userDetails = useSelector(state => state.user.userDetails);
  const selectedSeller = useSelector(state => state.product.selectedSeller);
  const selectedProduct = useSelector(state => state.product.selectedProduct);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [userDetailsAvailable, setUserDetailsAvailable] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [isDeliverable, setIsDeliverable] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    checkAddress();
  }, [userId]);

  const checkAddress = async () => {
    try {
      const locationResponse = await locationHelper.getLocation();

      userCollection.doc(userId).onSnapshot(snapshot => {
        if (snapshot.data()?.addresses === undefined) {
          if (user && userId && !_.isEmpty(snapshot.data())) {
            setUserDetailsAvailable(true);
            navigation.dispatch(
              StackActions.replace('LocationSelection', {
                to: 'AddNewAddress',
                lat: locationResponse.latitude,
                lng: locationResponse.longitude,
                navigationBar: true,
              }),
            );
          } else {
            setUserDetailsAvailable(false);
          }
        } else {
          // TODO: IF ADDRESS AVAILABLE
          setUserDetailsAvailable(true);
          const defaultAddress = _.find(
            snapshot.data()?.addresses,
            function (address) {
              return address.default === true;
            },
          );

          if (
            defaultAddress?.isLiftAvailable !== 'yes' &&
            defaultAddress?.floor > 0
          ) {
            setDeliveryCharge(
              selectedProduct?.deliveryCharges[`${defaultAddress?.floor}`] *
                selectedProduct?.qty,
            );
          }

          setDefaultAddress(defaultAddress);
          const distance = calculateDistance(
            defaultAddress?.Map.Coordinates._latitude,
            defaultAddress?.Map.Coordinates._longitude,
            selectedSeller?.sellerLocation.latitude,
            selectedSeller?.sellerLocation.longitude,
            'K',
          );

          if (distance <= selectedSeller?.deliverableDistance) {
            setIsDeliverable(true);
          } else {
            setIsDeliverable(false);
          }

          setLoading(false);
        }
      });
    } catch (error) {
      console.log('ERROR IN CHECKADDRESS IN CHECKOUT JS ', error);
    }
  };

  const onPlaceOrderByCashOnDelivery = async () => {
    if (btnLoading) return;
    setBtnLoading(true);

    try {
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;
      var ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000,
      );

      // ORDER CREATION IN GRAPHQL API
      const res = await createOrder(
        selectedSeller?.sellerId,
        userId,
        selectedProduct?.price * selectedProduct?.qty +
          deliveryCharge +
          selectedProduct?.tax,
      );

      console.log('CREATE ORDER RESPONSE ', res);

      if (res?.status === 'success') {
        orderCollection
          .doc(res?.response?.data?.CreateOrder?.id.toString())
          .set({
            Charges: {
              CartPrice: selectedProduct?.mrp * selectedProduct?.qty,
              DC: deliveryCharge,
              Discount:
                (selectedProduct?.mrp - selectedProduct?.price) *
                selectedProduct?.qty,
              Tax: selectedProduct?.tax,
              Total:
                selectedProduct?.price * selectedProduct?.qty +
                deliveryCharge +
                selectedProduct?.tax,
            },
            Customer: {
              Tel: userDetails?.phoneNumber,
              address: {
                AddressType: defaultAddress?.AddressType,
                Dno: defaultAddress?.Dno,
                Landmark: defaultAddress?.Landmark,
                Map: {
                  // TODO: ADDRESSLINE
                  // AddressLine: defaultAddress?.Map?.AddressLine,
                  Coordinates: new firestore.GeoPoint(
                    defaultAddress?.Map?.Coordinates?._latitude,
                    defaultAddress?.Map?.Coordinates?._longitude,
                  ),
                },
                Street: defaultAddress?.Street,
                address_id: defaultAddress?.address_id,
                deleted: defaultAddress?.deleted,
                floor: defaultAddress?.floor,
                fullName: defaultAddress?.fullName,
                isLiftAvailable: defaultAddress?.isLiftAvailable,
                mobileNumber: defaultAddress?.mobileNumber,
              },
              email: userDetails?.email,
              id: userId,
              name: userDetails?.name,
            },
            Product: {
              Count: selectedProduct?.qty,
              Name: selectedProduct?.product_name,
              id: selectedProduct?.product_id,
            },
            Seller: {
              Name: selectedSeller?.sellerName,
              Tel: selectedSeller?.sellerMobile,
              id: selectedSeller?.sellerId,
            },
            oTime: ISTTime,
            payment: {
              amountPaid: 0,
              paymentMode: 'cash on delivery',
            },
            sTime: currentTime,
            status: 'Ordered',
          })

          .then(() => {
            navigation.dispatch(StackActions.replace('PaymentSuccess'));
          })
          .catch(error => {
            setBtnLoading(false);
            console.log('ERROR IN CREATING ORDER ', error);
          });
      } else {
        alert('Something Went Wrong');
      }
    } catch (error) {
      console.log(
        'ERROR IN ONPLACEORDERBYCASHONDELIVERY IN CHECKOUT JS ',
        error,
      );
    } finally {
      setBtnLoading(false);
    }
  };

  const onSubmit = () => {
    onPlaceOrderByCashOnDelivery();
  };

  function renderAddress() {
    return (
      <>
        <Text style={styles.title}>Delivery Address</Text>
        <View style={styles.adressCardContainer}>
          <AddressCard readOnly address={defaultAddress} />
        </View>
      </>
    );
  }

  function renderPayment() {
    return (
      <View style={styles.payment}>
       {isDeliverable ? <View style={styles.titleBar}>
          <Text style={[styles.title, styles.left]}>Payment Mode</Text>
          <TouchableOpacity style={styles.right}>
            <Text style={styles.rightOption}>Cash On Delivery</Text>
          </TouchableOpacity>
        </View>: <></>}
        {/* <View style={styles.paymentCardContainer}>
          <View style={styles.paymentCard}>
            <Image source={icons.cod} style={styles.paymentIcon} />
            <Text style={styles.paymentMethodName}>COD</Text>
          </View>
        </View> */}
      </View>
    );
  }
  function renderPriceDetails() {
    return (
      <View style={styles.priceDetails}>
        {isDeliverable ? (
          <>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Cart Total:</Text>
              <View style={styles.row}>
                <VectorIcon.FontAwesome name="rupee" size={13} />
                <Text style={styles.price}>
                  {selectedProduct?.mrp * selectedProduct?.qty}
                </Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Delivery Charges:</Text>
              <View style={styles.row}>
                {deliveryCharge ? (
                  <>
                    <VectorIcon.FontAwesome name="rupee" size={13} />
                    <Text style={styles.price}>{deliveryCharge}</Text>
                  </>
                ) : (
                  <>
                    <Text style={[styles.price, {color: COLORS.primary}]}>
                      Free
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Discount:</Text>
              <View style={styles.row}>
                <VectorIcon.FontAwesome name="rupee" size={13} />
                <Text style={styles.price}>
                  {(selectedProduct?.mrp - selectedProduct?.price) *
                    selectedProduct?.qty}
                </Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Tax:</Text>
              <View style={styles.row}>
                <VectorIcon.FontAwesome name="rupee" size={13} />
                <Text style={styles.price}>{selectedProduct?.tax}</Text>
              </View>
            </View>

            <Divider />
            <View style={styles.priceContainer}>
              <Text style={[styles.priceLabel, styles.priceLabelHighLight]}>
                Total Amount:
              </Text>
              <View style={styles.row}>
                <Text style={styles.priceMTContainer}>
                  ₹
                  <Text style={[styles.price, styles.priceHighLight]}>
                    {selectedProduct?.price * selectedProduct?.qty +
                      deliveryCharge +
                      selectedProduct?.tax}
                  </Text>
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.notDeliverMsgContainer}>
            <Image
              source={icons.notDeliverable}
              style={styles.notDeliverMsgImg}
            />
            <Text style={styles.notDeliverMsg}>
              Can't Deliver at this Address.
            </Text>
            <Text style={styles.notDeliverMsgSubTitle}>
             Try changing address!
            </Text>
          </View>
        )}

       {isDeliverable? <Text style={styles.msgInfo}>{selectedProduct?.msg}</Text>:<></>}
      </View>
    );
  }

  // TODO: SINCE USERID IS IN REDUX STATE WE USE OR OPERATOR

  if (!userId || userDetailsAvailable === false)
    return <Profile fromOtherComponent={true} />;

  if (loading)
    return (
      <View style={styles.container}>
        <Loading loading={true} color={COLORS.primary} size={35} />
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar label="Checkout" />

      <View style={styles.content}>
        {renderAddress()}
        {renderPayment()}
        {renderPriceDetails()}
      </View>
      <View style={styles.submitBtnContainer}>
        <Button
          onPress={onSubmit}
          loading={btnLoading}
          label="Confirm Order"
          disabled={!isDeliverable}
          containerStyle={styles.submitBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BGColor,
  },

  content: {
    paddingVertical: 20,
    paddingHorizontal: SIZES.radius,
  },
  title: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 19,
    ...FONTS.body3SB,
    color: COLORS.black2,
  },
  adressCardContainer: {
    marginTop: 20,
  },
  payment: {
    marginTop: '12%',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingRight: 15,
  },
  left: {
    flex: 0.6,
  },
  right: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  rightOption: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 16,
    ...FONTS.body4SB,
    color: COLORS.primary,
  },
  paymentCardContainer: {
    marginTop: 20,
  },
  paymentCard: {
    width: 100,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  paymentIcon: {
    height: 50,
    width: 50,
  },
  paymentMethodName: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    marginTop: 5,
    color: COLORS.gray5,
  },
  priceDetails: {
    marginTop: 50,
    // paddingHorizontal: '3%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //  marginTop: '5%',
    marginVertical: 8,
  },
  priceLabel: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 18,
    ...FONTS.body4M,
    color: COLORS.gray5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 18,
    ...FONTS.body3M,
    marginLeft: 2,
  },
  submitBtnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: '4%',
    paddingHorizontal: '5%',
  },
  submitBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  priceLabelHighLight: {
    ...FONTS.body3SB,
    marginTop: 7,
  },
  priceMTContainer: {
    ...FONTS.body3SB,
    marginTop: 7,
    color: COLORS.black2,
  },
  priceHighLight: {
    ...FONTS.body3SB,
    marginTop: 7,
    color: COLORS.black2,
  },
  notDeliverMsgContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notDeliverMsgImg: {
    height: 50,
    width: 50,
    tintColor: COLORS.gray,
  },
  notDeliverMsg: {
    marginTop: 20,
    fontFamily: FONTFAMIY.MetropolisRegular,
    fontSize: 20,
    color: COLORS.black1,
  },
  notDeliverMsgSubTitle: {
    marginTop: 20,
    fontFamily: FONTFAMIY.MetropolisRegular,
    fontSize: 20,
    color: COLORS.warning,
  },
  msgInfo: {
    ...FONTS.body3SB,
    color: COLORS.warning,
    textAlign: 'center',
    margin: 20
  }
});
