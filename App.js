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
  AddressList,
  PaymentSuccess,
  OrderDetails,
} from './screens';
import Tabs from './navigation/tabs';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setUserId} from './redux/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {userHelper} from './utils';
import {AddNewAddress, Loading} from './components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from './constants';
import messaging from '@react-native-firebase/messaging';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import axios from 'axios';
import {createCustomer} from './helper/api';

// Collection
const usersCollection = firestore().collection('users');

const Stack = createStackNavigator();

const inAppUpdates = new SpInAppUpdates(
  false, // isDebug
);

const App = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showViewOnboarding, setShowViewOnboarding] = useState(true);
  const [showLocationScreen, setShowLocationScreen] = useState(false);

  // const inAppUpdates = new SpInAppUpdates(
  //   false // isDebug
  // );

  useEffect(() => {
    SplashScreen.hide();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    checkOnboarding();
  }, []);

  // useEffect(async () => {
  //   await messaging()
  //     .getToken()
  //     .then(token => {
  //       createCustomer();
  //     });

  //   const res = await createCustomer();

  //   if (res?.status === 'success') {
  //     console.log(res?.response);
  //   }
  // }, [user]);

  useEffect(() => {
    try {
      inAppUpdates.checkNeedsUpdate().then(result => {
        if (result.shouldUpdate) {
          let updateOptions = {};
          if (Platform.OS === 'android') {
            updateOptions = {
              updateType: IAUUpdateKind.FLEXIBLE,
            };
          }
          inAppUpdates.startUpdate(updateOptions);
        }
      });
    } catch (err) {}
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

  // const getUserInfo = async () => {
  //   auth().onAuthStateChanged(async user => {
  //     if (user) {
  //       userHelper.getUserId().then(userIdResponse => {
  //         if (userIdResponse !== null) {
  //           dispatch(setUserId(userIdResponse));
  //         }
  //       });
  //       dispatch(
  //         setUser({
  //           uid: user.uid,
  //           phoneNumber: user.phoneNumber,
  //         }),
  //       );
  //       // TOKEN GENERATION AND USER ID
  //       await messaging()
  //         .getToken()
  //         .then(token => {
  //           createCustomer(user?.phoneNumber, token).then(async res => {
  //             if (res?.status === 'success') {
  // console.log(
  //   'CREATE CUSTOMER ',
  //   res?.response?.data?.CreateCustomer,
  // );

  // if (res?.response?.data?.CreateCustomer?.name === null) {
  //                 console.log(res?.response?.data?.CreateCustomer?.id);
  //                 usersCollection
  //                   .doc(res?.response?.data?.CreateCustomer?.id.toString())
  //                   .set({})
  //                   .then(() => console.log('USER ADDED'))
  //                   .catch(err => console.log('USER ADDING ERROR ', err));
  //                 // await usersCollection
  //                 //   .doc(res?.response?.data?.CreateCustomer?.id)
  //                 //   .set({
  //                 //     phoneNumber: user?.phoneNumber,
  //                 //   });
  //               }
  //             }
  //           });
  //         });

  //       // });
  //     } else {
  //       dispatch(setUser(null));
  //     }
  //   });
  // };

  const onAuthStateChanged = async user => {
    try {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          }),
        );
        const userIdResponse = await userHelper.getUserId();
        if (userIdResponse !== null) {
          dispatch(setUserId(userIdResponse));
        } else {
          const token = await messaging().getToken();
          const res = await createCustomer(user.phoneNumber, token);
          if (res?.status === 'success') {
            console.log(
              'CREATE CUSTOMER ',
              res?.response?.data?.CreateCustomer,
            );

            if (res?.response?.data?.CreateCustomer?.name === null) {
              dispatch(
                setUserId(res?.response?.data?.CreateCustomer?.id.toString()),
              );
              await userHelper.saveUserId(
                res?.response?.data?.CreateCustomer?.id.toString(),
              );

              // CREATING AN USER DOCUMENT WITH INCOMING ID
              usersCollection
                .doc(res?.response?.data?.CreateCustomer?.id.toString())
                .set({})
                .then(() =>
                  console.log(
                    'USER DOCUMENT CREATED IN ONAUTHSTATECHANGED APP JS',
                  ),
                );
            }
          }
        }
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log('ERROR IN GETUSERINFO APP.JS ', error);
    }
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
          <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
          <Stack.Screen name="AddressList" component={AddressList} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Loading>
  );
};

export default App;

const styles = StyleSheet.create({});
