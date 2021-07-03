import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Authenticated, Loading, PhoneNumber, VerifyCode} from '../components';
import auth from '@react-native-firebase/auth';

import {COLORS} from '../constants';

const Profile = () => {
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(user);
      } else {
        setAuthenticated(false);
      }

      setLoading(false);
    });
  }, []);

  const signIn = async phoneNumber => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      alert(error);
    }
  };

  const confirmVerificationCode = async code => {
    try {
      await confirm.confirm(code);
      setConfirm(null);
    } catch (error) {
      alert('Invalid code');
      return {
        status: 'error',
        error: error,
      };
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Loading loading={true} color={COLORS.primary} size={40} />
      </View>
    );

  if (authenticated) return <Authenticated user={authenticated} />;

  if (confirm)
    return (
      <VerifyCode
        onSubmit={confirmVerificationCode}
        cancel={() => setConfirm(null)}
      />
    );

  return <PhoneNumber onSubmit={signIn} />;
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
