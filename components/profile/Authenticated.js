import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Loading, ProfileInfo, UserDetailForm} from '..';
import {COLORS} from '../../constants';
import {nanoid} from 'nanoid';

// redux
import {useSelector, useDispatch} from 'react-redux';
import {setUserId} from '../../redux/userSlice';
import {userHelper} from '../../utils';

// Collection
const usersCollection = firestore().collection('users');

const Authenticated = ({fromOtherComponent}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);
  const [isUserDetailsAvailable, setIsUserDetailsAvailable] = useState(null);

  useEffect(() => {
    checkIsUserDetailsAvailable();
  }, []);

  const checkIsUserDetailsAvailable = async () => {
    try {
      const userSnapshot = await usersCollection
        .where('phoneNumber', '==', user.phoneNumber)
        .get();

      if (userSnapshot.docs.length) {
        // TODO:
        await userHelper.saveUserId(userSnapshot.docs[0].id);
        dispatch(setUserId(userSnapshot.docs[0].id));
        if (!fromOtherComponent) {
          setIsUserDetailsAvailable(true);
        }
      } else {
        setIsUserDetailsAvailable(false);
      }
    } catch (error) {
      console.log(
        'ERROR IN CHECKUSERDETAILSAVAILABLE IN AUTHENTICATED JS ',
        error,
      );
    } finally {
      if (!fromOtherComponent) {
        setLoading(false);
      }
    }
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

        await userHelper.saveUserId(userId);
        dispatch(setUserId(userId));

        if (!fromOtherComponent) {
          setLoading(true);
          checkIsUserDetailsAvailable();
        }
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

  return <ProfileInfo />;
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
