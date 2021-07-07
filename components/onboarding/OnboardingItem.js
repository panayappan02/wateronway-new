import React from 'react';
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import {COLORS, FONTFAMIY} from '../../constants';

const OnboardingItem = ({item}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: 300,
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    fontFamily: FONTFAMIY.TTCommonsMedium,
    color: COLORS.gold,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    fontFamily: FONTFAMIY.TTCommonsRegular,
    fontSize: 18,
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
