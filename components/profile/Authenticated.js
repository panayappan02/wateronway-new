import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Loading, UserDetailForm} from '..';
import {COLORS} from '../../constants';
import {nanoid} from 'nanoid';

// Collection
const usersCollection = firestore().collection('users');

const Authenticated = ({user}) => {
  const [loading, setLoading] = useState(true);
  const [isUserDetailsAvailable, setIsUserDetailsAvailable] = useState(null);

  useEffect(() => {
    checkIsUserDetailsAvailable();
  }, [user.uid]);

  const checkIsUserDetailsAvailable = async () => {
    const userSnapshot = await usersCollection
      .where('phoneNumber', '==', user.phoneNumber)
      .get();

    if (userSnapshot.docs.length) {
      setIsUserDetailsAvailable(true);
    } else {
      setIsUserDetailsAvailable(false);
    }

    setLoading(false);
  };

  const saveUserDetails = async (name, email) => {
    let userId = nanoid(5);
    const users = await usersCollection.get();
    const existingUsersIdList = users.docs.map(doc => doc.id);
    if (existingUsersIdList.includes(userId)) {
      saveUserDetails(name, email);
    } else {
      try {
        await usersCollection.doc(userId).set({
          name,
          email,
          phoneNumber: user.phoneNumber,
        });

        setLoading(true);
        checkIsUserDetailsAvailable();
      } catch (error) {
        console.log(error);
        return {
          status: 'error',
          error,
        };
      }
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Loading loading={loading} color={COLORS.primary} size={40} />
      </View>
    );

  if (!isUserDetailsAvailable)
    return <UserDetailForm onSubmit={saveUserDetails} />;

  return (
    <SafeAreaView style={styles.container}>
      <Loading loading={false} color={COLORS.primary} size={40}>
        <Text>Authenticated</Text>
        <Button
          title="Sign Out"
          onPress={() => {
            auth().signOut();
          }}></Button>
      </Loading>
    </SafeAreaView>
  );
};

export default Authenticated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
