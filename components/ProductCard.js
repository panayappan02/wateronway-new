import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {COLORS, SIZES, images, FONTS, FONTFAMIY, icons} from '../constants';
import {VectorIcon} from '.';

const ProductCard = () => {
  return (
    <View style={styles.productCardWrapper}>
      <View style={styles.productCardContainer}>
        <Image source={images.watercane} style={styles.productImage} />
        <View style={styles.productCardBottomContainer}>
          <Text style={styles.productName}>Mineral Water</Text>
          <Text style={styles.litre}>20L</Text>
          <Rating
            ratingCount={5}
            imageSize={18}
            readonly
            style={styles.ratingStyle}
          />
          <View style={styles.productCardFooter}>
            <View style={styles.footerLeftSide}>
              <Text style={[styles.price, styles.cartPrice]}>
                <VectorIcon.FontAwesome name="rupee" size={13} />
                50
              </Text>
              <Text style={[styles.price, styles.discountedPrice]}>
                <VectorIcon.FontAwesome name="rupee" size={13} />
                40
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCardWrapper: {
    width: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.radius,
  },
  productCardContainer: {
    width: '90%',
    borderWidth: 0.5,
    borderColor: COLORS.lightGray3,
    borderRadius: SIZES.base,
  },
  productImage: {
    height: 80,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: SIZES.base,
    borderTopRightRadius: SIZES.base,
  },
  productCardBottomContainer: {
    paddingVertical: 5,
    paddingHorizontal: SIZES.base,
  },
  productName: {
    fontSize: 16,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    marginTop: SIZES.base,
  },
  litre: {
    marginTop: 5,
    fontFamily: FONTFAMIY.TTCommonsDemiBold,
    color: COLORS.gray,
    fontSize: 15,
  },
  ratingStyle: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  productCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.base,
  },
  footerLeftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 19,
    marginLeft: 0.5,
  },
  cartPrice: {
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    color: COLORS.primary,
    marginLeft: 8,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: 3,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 16,
  },
});
