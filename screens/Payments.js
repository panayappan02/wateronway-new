import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const Payments = () => {
  const userId = useSelector(state => state.user.userId);

  return (
    <View>
      <Text>payments</Text>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({});
