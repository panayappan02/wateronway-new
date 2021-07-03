import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {COLORS} from '../../constants';
import {userHelper} from '../../utils';

const ProfileInfo = () => {
  const logout = async () => {
    await userHelper.removeUserId();
    auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile Info</Text>
      <Button title="Log Out" onPress={logout} />
    </SafeAreaView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
