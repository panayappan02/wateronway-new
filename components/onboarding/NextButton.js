import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {VectorIcon} from '../../components';
import {COLORS} from '../../constants';

const NextButton = ({percentage, scrollTo}) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={128}
        width={3}
        rotation={0}
        fill={percentage}
        tintColor={COLORS.primary}
        backgroundColor={COLORS.gray4}>
        {fill => (
          <TouchableOpacity
            onPress={scrollTo}
            style={styles.button}
            activeOpacity={0.6}>
            <VectorIcon.Ionicons
              name="arrow-forward"
              size={32}
              color={COLORS.white}
            />
          </TouchableOpacity>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    padding: 20,
  },
});
