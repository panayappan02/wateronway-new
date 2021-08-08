import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating} from 'react-native-ratings';
import Modal from 'react-native-modal';
import {ProductModal, VectorIcon} from '.';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSelectedProduct,
  toggleProductModal,
  setSelectedSeller,
  setQty,
} from '../redux/productSlice';
import {COLORS, SIZES, images, FONTS, FONTFAMIY, icons} from '../constants';
import _ from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';

const ProductCard = ({product}) => {
  const {id: product_id} = product;
  const {
    image_url,
    product_name,
    quantity,
    mrp,
    price,
    seller_id,
    deliveryCharges,
    tax,
  } = product.item;
  const {
    productModalVisible,
    selectedSeller,
    sellerList,
    selectedProduct,
  } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const buyNow = () => {
    const seller = _.find(sellerList, ['sellerId', seller_id]);
    dispatch(setSelectedSeller(seller));

    dispatch(
      setSelectedProduct({
        product_id,
        product_name,
        image_url,
        quantity,
        mrp,
        price,
        qty: 1,
        deliveryCharges,
        tax,
      }),
    );
    refRBSheet.current.open();
    //  dispatch(toggleProductModal());
  };

  const quantitySelected = quantity => {
    dispatch(setQty(quantity));
    refRBSheet.current.close();
    navigation.navigate('Checkout');
  };
  return (
    <>
      <View style={styles.productCardWrapper}>
        <View style={styles.productCardContainer}>
          <Image source={{uri: image_url}} style={styles.productImage} />
          <View style={styles.productCardBottomContainer}>
            <Rating
              ratingCount={5}
              imageSize={18}
              readonly
              style={styles.ratingStyle}
            />
            <Text style={styles.litre}>{quantity}</Text>
            <Text style={styles.productName}>{product_name}</Text>

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
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    buyNow();
                  }}>
                  <Text style={styles.btnText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        height={360}
        openDuration={300}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            padding: 14,
            alignItems: 'center',
            backgroundColor: COLORS.BGColor,
            borderRadius:0,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
          },
          draggableIcon: {
            width: 60,
            height: 6,
            backgroundColor: COLORS.gray5,
          },
        }}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.productCountTitle}>Select Quantity</Text>
          </View>

          <View style={styles.quantityCardsContainer}>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(1)}>
              <Text style={styles.quantityText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(2)}>
              <Text style={styles.quantityText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(3)}>
              <Text style={styles.quantityText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(4)}>
              <Text style={styles.quantityText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(5)}>
              <Text style={styles.quantityText}>5</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quantityCardsContainer}>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(6)}>
              <Text style={styles.quantityText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(7)}>
              <Text style={styles.quantityText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(8)}>
              <Text style={styles.quantityText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(9)}>
              <Text style={styles.quantityText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(10)}>
              <Text style={styles.quantityText}>10</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quantityCardsContainer}>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(11)}>
              <Text style={styles.quantityText}>11</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(12)}>
              <Text style={styles.quantityText}>12</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(13)}>
              <Text style={styles.quantityText}>13</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(14)}>
              <Text style={styles.quantityText}>14</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityCard}
              onPress={() => quantitySelected(15)}>
              <Text style={styles.quantityText}>15</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.moreDiscountContainer}>
            <Text style={styles.needMoreText}>
              Need More? <Text style={styles.contactUsText}>CONTACT US</Text>{' '}
              for volumetric discounts that suits your needs!
            </Text>
          </View>

          {/* <View style={styles.checkoutButtonContainer}><Text style={styles.checkoutBtnText}>CHECK OUT</Text></View> */}
        </View>
      </RBSheet>

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
    backgroundColor: COLORS.BGColor,
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
    height: 148,
    width: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: SIZES.base,
    borderTopRightRadius: SIZES.base,
  },
  productCardBottomContainer: {
    paddingVertical: 5,
    paddingHorizontal: SIZES.base,
  },
  productName: {
    ...FONTS.h3M,
    color: COLORS.black2,
    marginTop: 5,
  },
  litre: {
    marginTop: 8,
    color: COLORS.gray5,
    ...FONTS.body7M,
    fontFamily: FONTFAMIY.TTCommonsDemiBold,
    color: COLORS.gray,
  },
  ratingStyle: {
    alignItems: 'flex-start',
    marginTop: 8,
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
    ...FONTS.body4SB,
    color: COLORS.gray5,
    marginLeft: 0.5,
  },
  cartPrice: {
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    ...FONTS.body4SB,
    color: COLORS.primary,
    marginLeft: 8,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: 15,
    height: 30,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.body4M,
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 16,
  },
  modalContainer: {
    padding: 16,
    width: '100%',
  },
  productCountTitle: {
    ...FONTS.body6SB,
    textAlign: 'center',
    color: COLORS.black2,
  },
  quantityCardsContainer: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityCard: {
    width: 50,
    height: 40,
    borderWidth: 0.4,
    borderColor: COLORS.gray5,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...FONTS.body4SB,
  },
  checkoutButtonContainer: {
    width: 343,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  checkoutBtnText: {
    ...FONTS.body4M,
    color: COLORS.white,
  },
  moreDiscountContainer: {
    marginTop: 30,
  },
  needMoreText: {
    ...FONTS.h3M,
    color: COLORS.black2,
  },
  contactUsText: {
    ...FONTS.h4MSB,
    color: COLORS.primary,
  },
});
