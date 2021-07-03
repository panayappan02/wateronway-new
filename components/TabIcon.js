import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SIZES, icons, COLORS} from '../constants';

const TabIcon = ({focused, icon}) => {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        style={[
          styles.tabIcon,
          {tintColor: focused ? COLORS.primary : COLORS.gray},
        ]}
      />
      {focused && <View style={styles.activeBottomBorderStyle}></View>}
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  tabIcon: {
    height: 30,
    width: 30,
  },
  activeBottomBorderStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: COLORS.primary,
  },
});
