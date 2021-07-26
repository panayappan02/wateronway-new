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
  VectorIcon,
} from '../components';
import {COLORS, FONTFAMIY, icons, SIZES} from '../constants';
import {FONTS} from '../constants/theme';
import {Divider} from 'react-native-elements';
import {useNavigation, StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {locationHelper} from '../utils';
import _ from 'lodash';

// Collection
const userCollection = firestore().collection('users');

const Checkout = () => {
  const navigation = useNavigation();
  const userId = useSelector(state => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [userDetailsAvailable, setUserDetailsAvailable] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    checkAddress();
  }, [userId]);

  const checkAddress = async () => {
    try {
      const locationResponse = await locationHelper.getLocation();

      userCollection.doc(userId).onSnapshot(snapshot => {
        if (snapshot.data()?.addresses === undefined) {
          if (userId && snapshot.data()) {
            setUserDetailsAvailable(true);
            navigation.dispatch(
              StackActions.replace('LocationSelection', {
                to: 'AddNewAddress',
                lat: locationResponse.latitude,
                lng: locationResponse.longitude,
              }),
            );
          } else {
            setUserDetailsAvailable(false);
          }
        } else {
          // TODO: IF ADDRESS AVAILABLE
          const defaultAddress = _.find(
            snapshot.data()?.addresses,
            function (address) {
              return address.default === true;
            },
          );
          setDefaultAddress(defaultAddress);
          setLoading(false);
        }
      });
    } catch (error) {
      console.log('ERROR IN CHECKADDRESS IN CHECKOUT JS ', error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <VectorIcon.Ionicons
            name="chevron-back"
            size={25}
            color={COLORS.black2}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View></View>
      </View>
    );
  }

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
        <View style={styles.titleBar}>
          <Text style={[styles.title, styles.left]}>Payment Mode</Text>
          <TouchableOpacity style={styles.right}>
            <Text style={styles.rightOption}>Cash On Delivery</Text>
          </TouchableOpacity>
        </View>
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
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Cart Total:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Delivery Charges:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Discount:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>

        <Divider />
        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, styles.priceLabelHighLight]}>
            Total Amount:
          </Text>
          <View style={styles.row}>
            <Text style={styles.priceMTContainer}>
              ₹<Text style={[styles.price, styles.priceHighLight]}>112</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (!userId && userDetailsAvailable === false)
    return <Profile fromOtherComponent={true} />;

  if (loading)
    return (
      <View style={styles.container}>
        <Loading loading={true} color={COLORS.primary} size={35} />
      </View>
    );

  // TODO:
  // if (!addressList.length) return <AddNewAddress />;

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.content}>
        {renderAddress()}
        {renderPayment()}
        {renderPriceDetails()}
      </View>
      <View style={styles.submitBtnContainer}>
        <Button label="Submit Order" containerStyle={styles.submitBtn} />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.lightGray4,
    backgroundColor: COLORS.BGColor,
  },
  header: {
    height: 88 - StatusBar.currentHeight,
    backgroundColor: COLORS.headerBackground,
    justifyContent: 'center',
    padding: 15,
    elevation: 5,
  },
  backIcon: {
    marginLeft: '2%',
  },
  headerTitle: {
    position: 'absolute',
    alignSelf: 'center',
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 20,
    ...FONTS.body6SB,
    color: COLORS.black2,
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
});
