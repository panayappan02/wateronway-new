import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMIY} from '../../constants';
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
  },
  left: {
    flex: 0.7,
    paddingLeft: '5%',
  },
  name: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 18,
    color: COLORS.black2,
  },
  address: {
    marginTop: '5%',
  },
  addressLine1: {
    fontFamily: FONTFAMIY.TTCommonsRegular,
    fontSize: 16,
    lineHeight: 21,
    color: COLORS.gray,
  },
  addressLine2: {
    fontFamily: FONTFAMIY.TTCommonsRegular,
    fontSize: 16,
    lineHeight: 21,
    color: COLORS.gray,
  },
  right: {
    flex: 0.3,
    alignItems: 'center',
  },
  rightOption: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 16,
    color: COLORS.primary,
  },
});
