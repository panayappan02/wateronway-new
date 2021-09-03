import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Carousel, Loading, ProductCard, VectorIcon} from '../components';
import {SIZES, icons, FONTS, FONTFAMIY, COLORS, images} from '../constants';
import {locationHelper, calculateDistance} from '../utils';
import {GeoFirestore} from 'geofirestore';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {setSellerList} from '../redux/productSlice';
import {setUserDetails} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';

// COLLECTION
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('users');

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(state => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isProductsNotAvialable, setProductsNotAvailable] = useState(false);
  const geofirestore = new GeoFirestore(firestore());
  const geocollection = geofirestore.collection('sellers');
  const sellerCollection = firestore().collection('sellers');
  const productCollection = firestore().collection('products');

  useEffect(() => {
    initializeUserDetails();
    getSellerDetails();
  }, []);

  const initializeUserDetails = async () => {
    try {
      if (userId) {
        const userDetailResponse = await usersCollection.doc(userId).get();
        dispatch(
          setUserDetails({
            name: userDetailResponse.data()?.name,
            email: userDetailResponse.data()?.email,
            phoneNumber: userDetailResponse.data()?.phoneNumber,
          }),
        );
      }
    } catch (error) {
      console.log('ERROR IN INITIALIZEUSERDETAILS IN HOME JS ', error);
    }
  };

  const getSellerDetails = async () => {
    try {
      setProductsNotAvailable(false);
      const locationResponse = await locationHelper.getLocation();
      setLocation(locationResponse);

      const geoSnapshot = await geocollection
        .near({
          center: new firestore.GeoPoint(
            locationResponse?.latitude,
            locationResponse?.longitude,
          ),
          radius: 10,
        })
        .get();

      const sellerSnapshot = await sellerCollection
        .where('deliverableDistance', '>=', 10)
        .get();

      const geoSnapshotData = geoSnapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data(),
      }));

      const sellerSnapshotData = sellerSnapshot.docs.map(doc => ({
        id: doc.id,
        item: doc.data(),
      }));

      const uniqueSellersSnapshotData = _.unionWith(
        geoSnapshotData,
        sellerSnapshotData,
        _.isEqual,
      );

      const sellers = [];

      uniqueSellersSnapshotData.map(doc => {
        const distance = calculateDistance(
          locationResponse?.latitude,
          locationResponse?.longitude,
          doc.item.g.geopoint._latitude,
          doc.item.g.geopoint._longitude,
          'K',
        );

        if (distance <= doc.item.deliverableDistance) {
          const docRef = {...doc, distance};

          sellers.push(docRef);
        } else {
          // TODO: If not satisfy the deliverable distance of seller
          // console.log(locationResponse?.latitude);
          // console.log(locationResponse?.longitude);
          // console.log(doc.item.g.geopoint._latitude);
          // console.log(doc.item.g.geopoint._longitude);
        }
      });
      setSellers(sellers);
      const sellerListForRedux = _.map(sellers, function (seller) {
        return {
          sellerId: seller.id,
          sellerName: seller.item.sellerName,
          sellerMobile: seller.item.sellerMobile,
          sellerLocation: {
            latitude: seller.item.g.geopoint._latitude,
            longitude: seller.item.g.geopoint._longitude,
          },
          deliverableDistance: seller.item.deliverableDistance,
        };
      });
      dispatch(setSellerList(sellerListForRedux));
      const arrayOfBanners = _.map(sellers, 'item.banners');
      const banners = _.flattenDeep(arrayOfBanners);
      setBanners(banners);

      const sellerIds = _.map(sellers, 'id');
      const sellersDistanceFromUserArray = _.map(sellers, 'distance');
      getProductDetails(sellerIds, sellersDistanceFromUserArray);
    } catch (error) {
      console.log('ERROR IN GETSELLERDETAILS ', error);
    }
  };

  const getProductDetails = async (
    sellerIdsArr,
    sellersDistanceFromUserArray,
  ) => {
    try {
      productCollection
        .where('seller_id', 'in', sellerIdsArr)
        .onSnapshot(snapshot => {
          const productSnapshotData = snapshot.docs.map((doc, index) => {
            if (doc.data()?.priceByKM !== undefined) {
              return {
                id: doc.id,
                item: {
                  ...doc.data(),
                  price: doc.data().priceByKM[
                    `${Math.round(sellersDistanceFromUserArray[index])}`
                  ],
                },
              };
            } else {
              return {
                id: doc.id,
                item: doc.data(),
              };
            }
          });
          if (productSnapshotData.length == 0) {
            setProductsNotAvailable(true);
          }
          setProducts(productSnapshotData);
        });
    } catch (error) {
      //  console.log('ERROR IN GETPRODUCTDETAILS ', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLocationSelection = () => {
    navigation.navigate('LocationSelection', {
      lat: location?.latitude,
      lng: location?.longitude,
    });
  };

  function renderAddressBar() {
    return (
      <TouchableOpacity
        onPress={navigateToLocationSelection}
        style={styles.cardShadow}>
        <View style={styles.locationRow}>
          <View style={[styles.cardContainer, styles.addressContainer]}>
            <VectorIcon.Ionicons name="ios-location-outline" size={30} />
            <Text style={styles.addressText} numberOfLines={2}>
              {location?.address}
            </Text>
          </View>
          <View>
            <Image source={images.logo} style={styles.logoImage} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderCarousel() {
    if (banners.length) {
      return <Carousel banners={banners} />;
    }
  }

  function renderProducts() {
    return (
      <View style={styles.productListWrapper}>
        {!isProductsNotAvialable ? (
          <Text style={styles.productListTitle}>Our Services Near You !</Text>
        ) : (
          <></>
        )}
        <View style={styles.productListContainer}>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
          {isProductsNotAvialable ? (
            <Text style={styles.notAvailableTitle}>
              Sorry! Now we are not available in your location!
            </Text>
          ) : (
            <></>
          )}
          {isProductsNotAvialable ? (
            <Text style={styles.notAvailableSubTitle}>
              Please try changing your location.
            </Text>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loading loading={loading} color={COLORS.primary} size={40}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderAddressBar()}
          {renderCarousel()}
          {renderProducts()}
        </ScrollView>
      </Loading>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BGColor,
    paddingBottom: 75,
  },
  cardShadow: {
    // borderRadius: 5,
    height: 70,
    width: '100%',
    backgroundColor: COLORS.white,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    elevation: 5,
    //   marginHorizontal: 5,
    //  marginTop: 9,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  addressContainer: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
  },
  addressText: {
    marginLeft: 5,
    ...FONTS.body6SB,
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 16,
    width: '90%',
    color: COLORS.transparentBlack9,
  },
  productListWrapper: {
    marginTop: SIZES.padding,
  },
  productListTitle: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    ...FONTS.h3M,
    //  fontSize: 18,
    marginLeft: 5,
    marginBottom: SIZES.base,
    color: COLORS.transparentBlack9,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoImage: {
    height: 70,
    width: 70,
  },
  notAvailableTitle: {
    ...FONTS.h3M,
    marginLeft: 5,
    marginBottom: SIZES.base,
  },
  notAvailableSubTitle: {
    textAlign: 'center',
    marginLeft: 5,
    ...FONTS.h4M,
  },
});
