import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Button} from '..';
import validator from 'validator';

import {COLORS, FONTFAMIY, FONTS} from '../../constants';

const CELL_COUNT = 6;

const VerifyCode = ({onSubmit, cancel}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const verifyCode = async () => {
    if (loading) return;
    setLoading(true);

    const res = await onSubmit(value);
    if (res?.status === 'error') {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.desc}>OTP Sent to Your Mobile</Text>
        <CodeField
          ref={ref}
          {...props}
          caretHidden={false}
          value={value}
          autoFocus={true}
          onChangeText={setValue}
          onEndEditing={() => verifyCode()}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <Button
          label="Verify"
          loading={loading}
          containerStyle={{marginTop: 20}}
          onPress={verifyCode}
          disabled={!validator.isLength(value, {min: 6})}
        />
        <View style={styles.options}>
          <TouchableOpacity onPress={cancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20, backgroundColor: COLORS.white},
  title: {
    ...FONTS.h1,
    color: COLORS.black1,
  },
  desc: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 17,
    color: COLORS.gray,
    marginTop: 2,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 45,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: COLORS.primary,
  },
  options: {
    marginTop: 20,
  },
  cancel: {
    textAlign: 'right',
    fontFamily: FONTFAMIY.TTCommonsMedium,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
