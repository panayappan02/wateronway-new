import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Home,
  Payments,
  Orders,
  Profile,
  Onboarding,
  LocationSelection,
  Checkout,
} from './screens';
import Tabs from './navigation/tabs';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setUserId} from './redux/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userHelper} from './utils';
import {Loading} from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from './constants';

// Collection
const usersCollection = firestore().collection('users');

const Stack = createStackNavigator();

const App = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showViewOnboarding, setShowViewOnboarding] = useState(true);
  const [showLocationScreen, setShowLocationScreen] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    getUserInfo();
  }, []);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const [onBoardingValue, locationValue] = await Promise.all([
        await AsyncStorage.getItem('viewOnboarding'),
        await AsyncStorage.getItem('location'),
      ]);

      if (onBoardingValue != null) {
        setShowViewOnboarding(false);
      }

      if (locationValue != null) {
        setShowLocationScreen(false);
      } else {
        setShowLocationScreen(true);
      }
    } catch (error) {
      console.log('ERROR CHECKONBOARDING ', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        userHelper.getUserId().then(userIdResponse => {
          if (userIdResponse !== null) {
            dispatch(setUserId(userIdResponse));
          }
        });
        dispatch(
          setUser({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          }),
        );
        // });
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
    <Loading loading={loading} color={COLORS.primary} size={40}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            showViewOnboarding
              ? 'Onboarding'
              : showLocationScreen
              ? 'LocationSelection'
              : 'Tabs'
          }
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen
            name="LocationSelection"
            component={LocationSelection}
          />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Loading>
  );
};

export default App;

const styles = StyleSheet.create({});
