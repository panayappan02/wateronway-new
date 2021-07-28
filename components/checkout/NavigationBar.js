import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {VectorIcon} from '..';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTFAMIY, FONTS} from '../../constants';

const NavigationBar = ({label}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <VectorIcon.Ionicons
          name="chevron-back"
          size={25}
          color={COLORS.black2}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{label}</Text>
      <View></View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  header: {
    height: 88 - StatusBar.currentHeight,
    backgroundColor: COLORS.headerBackground,
    justifyContent: 'center',
    elevation: 3,
  },
  backIcon: {
    marginLeft: '2%',
  },
  headerTitle: {
    position: 'absolute',
    alignSelf: 'center',
    ...FONTS.body6SB,
    color: COLORS.black2,
  },
});
