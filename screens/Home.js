import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Carousel, ProductCard, VectorIcon} from '../components';
import {SIZES, icons, FONTS, FONTFAMIY, COLORS} from '../constants';

const Home = () => {
  function renderAddressBar() {
    return (
      <TouchableOpacity style={styles.cardShadow}>
        <View style={[styles.cardContainer, styles.addressContainer]}>
          <VectorIcon.Ionicons name="ios-location-outline" size={30} />
          <Text style={styles.addressText} numberOfLines={1}>
            18,south street, ganapathy nagr, thanavur - 613001
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function renderCarousel() {
    return <Carousel />;
  }

  function renderProducts() {
    return (
      <View style={styles.productListWrapper}>
        <Text style={styles.productListTitle}>Our Services Near You !</Text>
        <View style={styles.productListContainer}>
          {[1, 2, 3, 4].map((product, index) => {
            return <ProductCard key={index} />;
          })}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderAddressBar()}
        {renderCarousel()}
        {renderProducts()}
      </ScrollView>
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
