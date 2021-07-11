import React,{useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Payments, Orders, Profile} from '../screens';
import {COLORS, FONTS, icons} from '../constants';
import {TabIcon} from '../components';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { AirbnbRating } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    refRBSheet.current.open();
    });
    return unsubscribe;
  }, []);
  

   useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);

    
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state 1:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          navigation.navigate(remoteMessage.data.type);
        }
      });

  },[])

 const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }

  return (
    <>
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          height: 70,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.payments} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.orders} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tab.Navigator>

    <RBSheet
          ref={refRBSheet}
          height={640}
          openDuration={250}closeOnDragDown={true}
        closeOnPressMask={false}
          customStyles={{
            container: {
              padding: 14,
              alignItems: "center",
              backgroundColor: COLORS.BGColor,
              borderRadius: 40
            },
            draggableIcon: {
              width: 60,
              height: 6,
              backgroundColor: COLORS.gray5
            }
          }}
        >
          <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>How much you rate?</Text>

          <AirbnbRating
  count={5}
  reviews={["Terrible","Bad","OK", "Good", "Amazing"]}
  defaultRating={0}
  size={34}
  ratingTextColor={COLORS.primary}
  style= {{
   margin: 24
  }}
/>

          </View>
        </RBSheet>

    </>
  );
};
export default Tabs;

const styles = StyleSheet.create({ 
  modalContainer: {
    padding: 16,
  },
  modalTitle: {
    ...FONTS.body6SB,
    color: COLORS.black2
  }
});