import React,{useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Payments, Orders, Profile} from '../screens';
import {COLORS, FONTS, icons} from '../constants';
import {TabIcon} from '../components';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { AirbnbRating } from 'react-native-ratings';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the Active State!', remoteMessage);
      if(remoteMessage.data?.type == 'OrderDelivered'){
      refRBSheet.current.open();
      }
    });
    return unsubscribe;
  }, []);
  

   useEffect(() => {


    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      if(remoteMessage.data?.type == 'OrderDelivered'){
      refRBSheet.current.open();
      }
    });
    
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      if(remoteMessage.data?.type == 'OrderDelivered'){
      refRBSheet.current.open();
      navigation.navigate(remoteMessage.data.type);
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if(remoteMessage.data?.type == 'OrderDelivered'){
          refRBSheet.current.open();
          navigation.navigate(remoteMessage.data.type);
          }
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
          height={600}
          openDuration={250}closeOnDragDown={true}
        closeOnPressMask={false}
          customStyles={{
            container: {
              padding: 14,
              alignItems: "center",
              backgroundColor: COLORS.BGColor,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            draggableIcon: {
              width: 60,
              height: 6,
              backgroundColor: COLORS.gray5
            }
          }}
        >
          <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Your order of Mineral Water(20L) has been delivered successfully!</Text>

          <Text style={styles.reviewTitle}>How much you rate?</Text>

<View>
          <AirbnbRating
  count={5}
  reviews={["Terrible","Bad","OK", "Good", "Amazing"]}
  defaultRating={0}
  size={36}
  ratingTextColor={COLORS.primary}
  selectedColor={COLORS.starYellow}
  reviewColor={COLORS.starYellow}
  reviewSize={22}
/>
</View>

<View style={styles.reviewContainer}>
  <Text style={styles.reviewTitle}>Please share your opinion about our service</Text>

</View>


<TextInput
  style={styles.reviewInput}
  multiline={true}
  underlineColorAndroid='transparent'
  numberOfLines={3}
  textAlignVertical={"top"}
  placeholder="Your review"
  />

<View style={styles.sendReviewButtonContainer}><Text style={styles.sendReviewBtnText}>SEND REVIEW</Text></View>

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
    color: COLORS.black2,
    textAlign: 'center',
    marginBottom: 30
  },
  reviewContainer: {
    marginTop: 30,
    alignSelf:'center'
  },
  reviewTitle: {
    ...FONTS.body6SB,
    color: COLORS.black2,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 230
  },
  reviewInput: {
    borderRadius: 4,
    marginTop: 18,
    width: 343,
    height: 154,
    alignSelf:'center',
    backgroundColor: COLORS.white,
    ...FONTS.body4M,
    color: COLORS.black2,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
   	width: 0,
  	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  sendReviewButtonContainer: {
    width: 343,
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 25
  },
  sendReviewBtnText: {
    ...FONTS.body4M,
    color: COLORS.white
  }
});