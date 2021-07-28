import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Button} from '../components';
import {FONTFAMIY} from '../constants';
import {useNavigation, StackActions} from '@react-navigation/native';

const PaymentSuccess = () => {
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.dispatch(StackActions.replace('Tabs'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/lottie/52058-check.json')}
          autoPlay
          loop={false}
          duration={3500}
          style={{height: 200}}
        />
      </View>
      <Text style={styles.successText}>Order Placed</Text>
      <View style={styles.btnContainer}>
        <Button
          onPress={navigateToHomeScreen}
          label="Continue"
          containerStyle={{
            borderRadius: 5,
            height: 36,
          }}
        />
      </View>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieContainer: {},
  successText: {
    fontFamily: FONTFAMIY.MetropolisMedium,
    fontSize: 18,
  },
  btnContainer: {
    width: '50%',
    marginTop: '3%',
  },
});
