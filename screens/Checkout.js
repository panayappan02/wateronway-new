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
import {AddressCard, Button, Loading, VectorIcon} from '../components';
import {COLORS, FONTFAMIY, icons, SIZES} from '../constants';

const Checkout = () => {
  const userId = useSelector(state => state.user.userId);
  const [loading, setLoading] = useState(false);

  function renderHeader() {
    return (
      <View style={styles.header}>
        <VectorIcon.Ionicons
          name="chevron-back"
          size={25}
          color={COLORS.black2}
          style={styles.backIcon}
        />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View></View>
      </View>
    );
  }

  function renderAddress() {
    return (
      <>
        <Text style={styles.title}>Shipping Address</Text>
        <View style={styles.adressCardContainer}>
          <AddressCard />
        </View>
      </>
    );
  }

  function renderPayment() {
    return (
      <View style={styles.payment}>
        <View style={styles.titleBar}>
          <Text style={[styles.title, styles.left]}>Payment</Text>
          <TouchableOpacity style={styles.right}>
            <Text style={styles.rightOption}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentCardContainer}>
          <View style={styles.paymentCard}>
            <Image source={icons.cod} style={styles.paymentIcon} />
            <Text style={styles.paymentMethodName}>COD</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderPriceDetails() {
    return (
      <View style={styles.priceDetails}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Order:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Delivery:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Summary:</Text>
          <View style={styles.row}>
            <VectorIcon.FontAwesome name="rupee" size={13} />
            <Text style={styles.price}>112</Text>
          </View>
        </View>
      </View>
    );
  }

  if (!userId) return <Profile fromOtherComponent={true} />;

  return (
    <SafeAreaView style={styles.container}>
      <Loading loading={loading} color={COLORS.primary}>
        {renderHeader()}
        <View style={styles.content}>
          {renderAddress()}
          {renderPayment()}
          {renderPriceDetails()}
        </View>
        <View style={styles.submitBtnContainer}>
          <Button label="Submit Order" containerStyle={styles.submitBtn} />
        </View>
      </Loading>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  header: {
    height: 88 - StatusBar.currentHeight,
    backgroundColor: COLORS.headerBackground,
    justifyContent: 'center',
  },
  backIcon: {},
  headerTitle: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 20,
    color: COLORS.black2,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: SIZES.radius,
  },
  title: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 19,
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
    paddingRight: 15,
  },
  left: {
    flex: 0.7,
  },
  right: {
    flex: 0.3,
    alignItems: 'center',
  },
  rightOption: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 16,
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
    color: COLORS.gray,
  },
  priceDetails: {
    marginTop: '12%',
    paddingHorizontal: '3%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  priceLabel: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    color: COLORS.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
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
});
