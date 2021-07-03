import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from '..';
import validator from 'validator';

import {COLORS, FONTFAMIY} from '../../constants';

const UserDetailForm = ({onSubmit}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const saveUserDetails = async () => {
    Keyboard.dismiss();
    if (loading) return;
    setLoading(true);

    const res = await onSubmit(name, email);
    if (res?.status === 'error') {
      setLoading(false);
      alert('Something Went Wrong');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>UserName</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              selectionColor={COLORS.gold}
              value={name}
              onChangeText={name => setName(name)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              keyboardType="email-address"
              selectionColor={COLORS.gold}
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>

          <Button
            label="Save"
            containerStyle={{
              marginTop: 20,
            }}
            loading={loading}
            disabled={
              !(validator.isLength(name, {min: 1}) && validator.isEmail(email))
            }
            onPress={saveUserDetails}
          />
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UserDetailForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    color: COLORS.gold,
  },
  input: {
    marginTop: 3,
    borderBottomWidth: 0.5,
    fontSize: 20,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    color: COLORS.black1,
  },
});
