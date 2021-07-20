import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMIY, FONTS} from '../../constants';
const AddressCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>John Doe</Text>
        <View style={styles.address}>
          <Text style={styles.addressLine1} numberOfLines={1}>
            3 NewBridge Court
          </Text>
          <Text style={styles.addressLine2} numberOfLines={1}>
            Chino Hills , CA91709, United States
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity activeOpacity={0.3}>
          <Text style={styles.rightOption}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    height: 108,
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
    paddingHorizontal: 20
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
});
