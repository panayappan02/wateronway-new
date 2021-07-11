import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {OrderCard, VectorIcon} from '../components';
import {COLORS, FONTFAMIY, FONTS, SIZES} from '../constants';
import {useSelector, useDispatch} from 'react-redux';

const Orders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <ScrollView>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingBottom: 70,
 //   backgroundColor: COLORS.white,
    backgroundColor: COLORS.BGColor
  },
  title: {
    ...FONTS.h1M,
    color: COLORS.black2,
    marginVertical: SIZES.base,
    marginLeft: 5,
  },
});
