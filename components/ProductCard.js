import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating} from 'react-native-ratings';
import Modal from 'react-native-modal';
import {ProductModal, VectorIcon} from '.';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedProduct, toggleProductModal} from '../redux/productSlice';
import {COLORS, SIZES, images, FONTS, FONTFAMIY, icons} from '../constants';

const ProductCard = ({product}) => {
  const {image_url, product_name, quantity, mrp, price} = product.item;
  const {productModalVisible} = useSelector(state => state.product);
  const dispatch = useDispatch();

  const buyNow = () => {
    dispatch(
      setSelectedProduct({
        product_name,
        image_url,
        quantity,
        mrp,
        price,
        qty: 1,
      }),
    );
    dispatch(toggleProductModal());
  };

  return (
    <>
      <View style={styles.productCardWrapper}>
        <View style={styles.productCardContainer}>
          <Image source={{uri: image_url}} style={styles.productImage} />
          <View style={styles.productCardBottomContainer}>
            <Text style={styles.productName}>{product_name}</Text>
            <Text style={styles.litre}>{quantity}</Text>
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
                  {mrp}
                </Text>
                <Text style={[styles.price, styles.discountedPrice]}>
                  <VectorIcon.FontAwesome name="rupee" size={13} />
                  {price}
                </Text>
              </View>
              <View>
                <TouchableOpacity style={styles.btn} onPress={buyNow}>
                  <Text style={styles.btnText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ProductModal />
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCardWrapper: {
    width: wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  productCardContainer: {
    width: '95%',
    borderWidth: 0.5,
    borderColor: COLORS.lightGray3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.white,
    elevation: 1,
    paddingBottom: 5,
  },
  productImage: {
    height: 85,
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
