import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {COLORS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';


const Payments = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Payments</Text>
    </SafeAreaView>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
