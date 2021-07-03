import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Payments, Orders, Profile} from './screens';
import Tabs from './navigation/tabs';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from './redux/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userHelper} from './utils';

// Collection
const usersCollection = firestore().collection('users');

const Stack = createStackNavigator();

const App = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        getUserIdFromDb(user);
        dispatch(
          setUser({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          }),
        );
      } else {
        dispatch(setUser(null));
      }
    });
  };

  const getUserIdFromDb = async user => {
    const userId = await userHelper.getUserId();

    if (userId === null) {
      const res = await usersCollection
        .where('phoneNumber', '==', user.phoneNumber)
        .get();
      userHelper.saveUserId(res.docs[0].id);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
