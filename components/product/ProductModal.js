import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {useSelector, useDispatch} from 'react-redux';
import {
  toggleProductModal,
  incrementQty,
  decrementQty,
} from '../../redux/productSlice';
import {COLORS, FONTFAMIY, images, SIZES} from '../../constants';
import {Button, VectorIcon} from '..';
import {useNavigation} from '@react-navigation/native';

const ProductModal = ({visible}) => {
  const navigation = useNavigation();
  const {productModalVisible, selectedProduct} = useSelector(
    state => state.product,
  );
  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggleProductModal());
  };

  const navigateToCheckoutScreen = () => {
    toggleModal();
    navigation.navigate('Checkout');
  };

  function renderCloseIcon() {
    return (
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={toggleModal}>
          <VectorIcon.Ionicons
            name="ios-close-circle-outline"
            size={40}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCard() {
    function renderQuantity() {
      return (
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(decrementQty())}>
            <VectorIcon.Entypo name="minus" color={COLORS.white} size={15} />
          </TouchableOpacity>
          <Text style={styles.qty}>{selectedProduct?.qty}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(incrementQty())}>
            <VectorIcon.Entypo name="plus" color={COLORS.white} size={15} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardImageContainer}>
          <Image source={images.watercane} style={styles.cardImage} />
        </View>
        <View style={styles.cardContentContainer}>
          <Text style={styles.title}>{selectedProduct?.product_name}</Text>
          <Rating
            ratingCount={5}
            imageSize={18}
            readonly
            style={styles.ratingStyle}
          />
          {renderQuantity()}
          <View style={[styles.row, styles.priceContainer]}>
            <Text style={[styles.price, styles.cartPrice]}>
              <VectorIcon.FontAwesome name="rupee" size={13} />
              {selectedProduct?.mrp}
            </Text>
            <Text style={[styles.price, styles.discountedPrice]}>
              <VectorIcon.FontAwesome name="rupee" size={13} />
              {selectedProduct?.price}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderTotal() {
    return (
      <View style={styles.totalContainer}>
        <View style={styles.row}>
          <VectorIcon.AntDesign name="shoppingcart" size={25} />
          <Text style={styles.label}>Total Amount</Text>
        </View>
        <View>
          <View style={styles.row}>
            <VectorIcon.FontAwesome
              name="rupee"
              size={15}
              color={COLORS.gold}
              style={{
                marginTop: 2.3,
              }}
            />
            <Text style={styles.total}>
              {selectedProduct?.price * selectedProduct?.qty}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderContinueBtn() {
    return (
      <View style={styles.continueBtnContainer}>
        <Button
          label="Continue"
          containerStyle={{
            borderRadius: 10,
          }}
          disabled={selectedProduct?.qty === 0 && true}
          onPress={navigateToCheckoutScreen}
        />
      </View>
    );
  }

  return (
    <View>
      <Modal
        isVisible={productModalVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        deviceHeight={SIZES.height}
        deviceWidth={SIZES.width}>
        <View style={styles.container}>
          {renderCloseIcon()}
          {renderCard()}
          {renderTotal()}
          {renderContinueBtn()}
        </View>
      </Modal>
    </View>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: COLORS.white,
    padding: SIZES.radius,
  },
  closeIconContainer: {
    alignItems: 'flex-end',
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    height: 160,
    borderRadius: 10,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardImageContainer: {
    flex: 0.5,
  },
  cardImage: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContentContainer: {
    flex: 0.5,
    padding: 20,
  },
  title: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 22,
    color: COLORS.black1,
  },
  ratingStyle: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  qtyContainer: {
    marginTop: 15,
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 13,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  qty: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    color: COLORS.black1,
  },
  qtyBtn: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    marginTop: 15,
  },
  price: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 19,
  },
  cartPrice: {
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    color: COLORS.primary,
    marginLeft: 10,
  },

  totalContainer: {
    marginTop: '8%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  total: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 20,
    color: COLORS.gold,
    marginLeft: 0.2,
  },

  label: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    marginLeft: 8,
  },

  continueBtnContainer: {
    flex: 0.9,
    justifyContent: 'flex-end',
  },
});
