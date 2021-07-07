import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Alert as RNAlert,
} from 'react-native';
import {Loading, NextButton, OnboardingItem, Paginator} from '../components';
import onboardingData from '../constants/onboardingData';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation, StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../constants';

const Onboarding = () => {
  const navigation = useNavigation();
  const slidesRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  //   for setting current index
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  });

  //   displaying percentage of next screen while changing -here 50%
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      handlePermissions();
    }
  };

  const handlePermissions = async () => {
    try {
      const permissionType =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      let response = await Permissions.check(permissionType);
      console.log(response);

      if (response === 'denied' || response === 'undetermined') {
        RNAlert.alert(
          'Needs Permission',
          'For accessing your current location',
          [
            {
              text: 'Cancel',
              onPress: async () => {
                await AsyncStorage.setItem('viewOnboarding', 'true');
                navigation.dispatch(StackActions.replace('LocationSelection'));
              },
              style: 'cancel',
            },
            {
              text: 'Allow',
              onPress: async () => {
                response = await Permissions.request(permissionType);
                if (response === 'granted') {
                  handleGranted();
                }
              },
            },
          ],
        );
      }

      if (response === 'granted') {
        handleGranted();
      }
    } catch (error) {
      console.log('ERROR HANDLEPERMISSIONS ONBOARDING', error);
    }
  };

  const handleGranted = async () => {
    try {
      await AsyncStorage.setItem('viewOnboarding', 'true');
      getLocation();
    } catch (error) {
      console.log('ERROR HANDLEGRANTED IN ONBOARDING JS ', error);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        navigation.dispatch(
          StackActions.replace('LocationSelection', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
      },
      error => {
        console.log('ERROR GETLOCATION ONBOARDING ', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={onboardingData}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => `${item.id}`}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged.current}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={onboardingData} scrollX={scrollX} />
      {/* TODO: NOTE: Find Percentage of Flatlist */}
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / onboardingData.length)}
      />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
