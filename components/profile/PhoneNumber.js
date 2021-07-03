import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button, Loading} from '..';
import validator from 'validator';

import {COLORS, FONTFAMIY, FONTS, SIZES} from '../../constants';

const PhoneNumber = ({onSubmit}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    Keyboard.dismiss();
    if (loading) return;
    setLoading(true);

    await onSubmit(`+91${phoneNumber}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login or Signup</Text>
        <Text style={styles.desc}>Make Count of Every Drop</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Number"
            keyboardType="number-pad"
            value={phoneNumber}
            maxLength={10}
            onChangeText={text => setPhoneNumber(text)}
          />
        </View>
        <Button
          label="Continue"
          loading={loading}
          containerStyle={{marginTop: 20}}
          onPress={signIn}
          disabled={
            !(
              validator.isMobilePhone(phoneNumber) &&
              validator.isLength(phoneNumber, {min: 10})
            )
          }
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black1,
  },
  desc: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 17,
    color: COLORS.gray,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 16,
    color: COLORS.gold,
  },
  input: {
    marginTop: 5,
    borderBottomWidth: 0.5,
    fontSize: 20,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    color: COLORS.black1,
  },
});
