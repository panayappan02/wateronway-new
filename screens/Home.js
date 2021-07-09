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
import {SIZES, icons, FONTS, FONTFAMIY, COLORS} from '../constants';
import {locationHelper} from '../utils';
import firestore from '@react-native-firebase/firestore';
import {GeoFirestore} from 'geofirestore';
import _ from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {setSellerList} from '../redux/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  const geofirestore = new GeoFirestore(firestore());
  const geocollection = geofirestore.collection('sellers');
  const sellerCollection = firestore().collection('sellers');
  const productCollection = firestore().collection('products');

  useEffect(() => {
    getSellerDetails();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      }
      if (unit == 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  };

  const getSellerDetails = async () => {
    try {
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
          sellers.push(doc);
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
      getProductDetails(sellerIds);
    } catch (error) {
      console.log('ERROR IN GETSELLERDETAILS ', error);
    }
  };

  const getProductDetails = async sellerIdsArr => {
    try {
      productCollection
        .where('seller_id', 'in', sellerIdsArr)
        .onSnapshot(snapshot => {
          const productSnapshotData = snapshot.docs.map(doc => ({
            id: doc.id,
            item: doc.data(),
          }));

          setProducts(productSnapshotData);
        });
    } catch (error) {
      console.log('ERROR IN GETPRODUCTDETAILS ', error);
    } finally {
      setLoading(false);
    }
  };

  function renderAddressBar() {
    return (
      <TouchableOpacity style={styles.cardShadow}>
        <View style={[styles.cardContainer, styles.addressContainer]}>
          <VectorIcon.Ionicons name="ios-location-outline" size={30} />
          <Text style={styles.addressText} numberOfLines={1}>
            {location?.address}
          </Text>
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
        <Text style={styles.productListTitle}>Our Services Near You !</Text>
        <View style={styles.productListContainer}>
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
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
    backgroundColor: COLORS.white,
    paddingBottom: 75,
  },
  cardShadow: {
    borderRadius: 5,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 5,
    marginTop: 5,
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
  },
  addressText: {
    marginLeft: 5,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    width: '90%',
    color: COLORS.transparentBlack9,
  },
  productListWrapper: {
    marginTop: SIZES.padding,
  },
  productListTitle: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    marginLeft: 5,
    marginBottom: SIZES.base,
    color: COLORS.transparentBlack9,
  },
  productListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
