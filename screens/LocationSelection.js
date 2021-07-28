import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LocationView from 'react-native-location-view';
import {Loading, NavigationBar} from '../components';
import {COLORS, constants, FONTFAMIY} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {StackActions} from '@react-navigation/native';

const LocationSelection = ({route}) => {
  const navigation = useNavigation();
  const lat = route?.params?.lat;
  const lng = route?.params?.lng;
  const to = route?.params?.to;
  const addressToEditId = route?.params?.addressToEditId;
  const navigationBar = route?.params?.navigationBar;
  const navigationLabel = route?.params?.navigationLabel;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gpsError, setGpsError] = useState(false);

  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    try {
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });

      if (lat && lng) {
        setLatitude(lat);
        setLongitude(lng);
      } else {
        setLatitude(11.0168);
        setLongitude(76.9558);
      }
    } catch (error) {
      console.log('ERROR CHECKLOCATION IN LOCATIONSELECTION.JS ', error);
      setGpsError(true);
    }

    setLoading(false);
  };

  const onSubmit = async location => {
    const selectedLocation = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };

    if (to) {
      navigation.navigate(to, {
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
        address: selectedLocation.address,
        addressToEditId,
      });
    } else {
      try {
        await AsyncStorage.setItem(
          'location',
          JSON.stringify(selectedLocation),
        );

        navigation.dispatch(StackActions.replace('Tabs'));
      } catch (error) {
        console.log('ERROR ONSUBMIT IN LOCATIONSELECTION ', error);
      }
    }
  };

  if (gpsError) {
    return (
      <View>
        <Text>Please turn on Location</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {navigationBar && (
        <NavigationBar label={navigationLabel || 'Add Shipping Address'} />
      )}
      <Loading loading={loading} color={COLORS.primary} size={40}>
        <LocationView
          apiKey={constants.googleMapApiKey}
          initialLocation={{
            latitude,
            longitude,
          }}
          enableHighAccuracy={false}
          timeout={5000}
          maximumAge={10000}
          markerColor={COLORS.primary}
          actionButtonStyle={{
            backgroundColor: COLORS.primary,
            height: 45,
          }}
          actionText={'Continue'}
          actionTextStyle={{
            fontFamily: FONTFAMIY.TTCommonsRegular,
          }}
          onLocationSelect={location => onSubmit(location)}
        />
      </Loading>
    </View>
  );
};

export default LocationSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
