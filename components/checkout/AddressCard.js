import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMIY, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {setAddressToEdit} from '../../redux/shippingAddressSlice';

const AddressCard = ({
  address,
  readOnly,
  selectedAddress,
  setSelectedAddress,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToAddressList = () => {
    navigation.navigate('AddressList');
  };

  const onPress = () => {
    if (readOnly) {
      navigateToAddressList();
      return;
    } else {
      dispatch(setAddressToEdit(address?.address_id));

      navigation.navigate('LocationSelection', {
        to: 'AddNewAddress',
        lat: address?.Map?.Coordinates?._latitude,
        lng: address?.Map?.Coordinates?._longitude,
        navigationBar: true,
        navigationLabel: 'Edit Shipping Address',
        addressToEditId: address?.address_id,
      });
    }
  };

  const checkBoxHandler = () => {
    setSelectedAddress(address);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{address?.fullName}</Text>
        <View style={styles.address}>
          <Text style={styles.addressLine1} numberOfLines={1}>
            {address?.Dno} {address?.Street},
          </Text>
          <Text style={styles.addressLine2} numberOfLines={1}>
            {address?.Map?.AddressLine}
          </Text>
          {!readOnly && (
            <View style={styles.checkBoxContainer}>
              <Checkbox
                color={COLORS.primary}
                status={
                  address?.address_id === selectedAddress?.address_id
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={checkBoxHandler}
              />
              <Text style={styles.checkBoxLabel}>
                Use as the Shipping Address
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.3}>
          <Text style={styles.rightOption}>{readOnly ? 'Change' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    // height: 115,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
  },
  left: {
    flex: 0.7,
  },
  name: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 18,
    ...FONTS.body4SB,
    color: COLORS.black2,
  },
  address: {
    marginTop: 7,
  },
  addressLine1: {
    // fontFamily: FONTFAMIY.TTCommonsRegular,
    // fontSize: 16,
    ...FONTS.body4M,
    lineHeight: 21,
    color: COLORS.black2,
  },
  addressLine2: {
    ...FONTS.body4M,
    lineHeight: 21,
    color: COLORS.black2,
  },
  right: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  rightOption: {
    // fontFamily: FONTFAMIY.TTCommonsMedium,
    // fontSize: 16,
    ...FONTS.body4SB,
    color: COLORS.warning,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -10,
    marginTop: 5,
  },
  checkBoxLabel: {
    fontFamily: FONTFAMIY.MetropolisRegular,
    color: COLORS.black1,
  },
});
