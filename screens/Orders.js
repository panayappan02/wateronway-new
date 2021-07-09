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

const Orders = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <OrderCard />
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 70,
    backgroundColor: COLORS.white,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.gray3,
    marginVertical: SIZES.base,
    marginLeft: 5,
  },
});
