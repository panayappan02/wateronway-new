import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Loading} from '.';
import {COLORS, FONTFAMIY} from '../constants';

const Button = ({
  onPress,
  label,
  loading,
  containerStyle,
  labelStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.btn, ...containerStyle, opacity: disabled ? 0.5 : 1}}
      onPress={onPress}
      disabled={disabled}>
      <Loading loading={loading}>
        <Text style={{...styles.btnText, ...labelStyle}}>{label}</Text>
      </Loading>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    marginTop: 15,
    backgroundColor: COLORS.primary,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 20,
  },
});
