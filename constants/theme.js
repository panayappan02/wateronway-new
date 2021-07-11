import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#0073e6',
  white: '#fff',
  white1: 'rgba(255,255,255,0.7)',
  black: '#020202',
  black1: '#3B3D40',
  black2: '#222222',
  BGColor: '#F9F9F9',

  gray: '#777777',
  gray2: '#F8F8F8',
  gray3: 'gray',
  gray4: '#E6E7E8',
  gray5: '#9B9B9B',
  gold: '#C18e60',
  lightGray: '#F5F6FB',
  lightGray2: '#757575',
  lightGray3: 'lightgray',
  lightGray4: '#E5E5E5',
  headerBackground: '#F9F9F9',
  headerBackIcon: '#222222',

  transparentBlack1: 'rgba(2, 2, 2, 0.1)',
  transparentBlack3: 'rgba(2, 2, 2, 0.3)',
  transparentBlack5: 'rgba(2, 2, 2, 0.5)',
  transparentBlack7: 'rgba(2, 2, 2, 0.7)',
  transparentBlack9: 'rgba(2, 2, 2, 0.9)',
  transparentGray: 'rgba(77,77,77, 0.8)',
  transparentDarkGray: 'rgba(20,20,20, 0.9)',
  transparent: 'transparent',

  success: '#2AA952',
  warning:'#F01F0E',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 34,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  body6: 18,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {fontFamily: 'TT Commons DemiBold', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'TT Commons DemiBold', fontSize: SIZES.h1},
  h2: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h2},
  h3: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h3, lineHeight: 16},
  h4: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h4, lineHeight: 20},
  body1: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body1},
  body2: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body2},
  body3: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body3},
  body4: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body4},
  body5: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body5},

  h1M: {fontFamily: 'Metropolis-Bold', fontSize: SIZES.h1, lineHeight: 34},
  h3M: {fontFamily: 'Metropolis-SemiBold', fontSize: SIZES.h3, lineHeight: 16},
  h4M: {fontFamily: 'Metropolis-Medium',fontSize: SIZES.h4, lineHeight: 20 },
  h4MSB: {fontFamily: 'Metropolis-SemiBold',fontSize: SIZES.h4, lineHeight: 20 },
  body4M: {fontFamily: 'Metropolis-Regular', fontSize: SIZES.body4},
  body6SB: {fontFamily: 'Metropolis-SemiBold', fontSize: SIZES.body6, lineHeight: 22},

};

export const FONTFAMIY = {
  TTCommonsMedium: 'TT Commons Medium',
  TTCommonsDemiBold: 'TT Commons DemiBold',
  TTCommonsExtraBold: 'TT Commons ExtraBold',
  TTCommonsRegular: 'TT Commons Regular',
  TTCommonsBold: 'TT Commons Bold',
};

const appTheme = {COLORS, SIZES, FONTS, FONTFAMIY};

export default appTheme;
