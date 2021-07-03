import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#0073e6',
  white: '#fff',
  black: '#020202',
  black1: '#3B3D40',

  gray: '#777777',
  gray2: '#F8F8F8',
  gray3: 'gray',
  gold: '#C18e60',
  lightGray: '#F5F6FB',
  lightGray2: '#757575',
  lightGray3: 'lightgray',

  transparentBlack1: 'rgba(2, 2, 2, 0.1)',
  transparentBlack3: 'rgba(2, 2, 2, 0.3)',
  transparentBlack5: 'rgba(2, 2, 2, 0.5)',
  transparentBlack7: 'rgba(2, 2, 2, 0.7)',
  transparentBlack9: 'rgba(2, 2, 2, 0.9)',
  transparentGray: 'rgba(77,77,77, 0.8)',
  transparentDarkGray: 'rgba(20,20,20, 0.9)',
  transparent: 'transparent',
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {fontFamily: 'TT Commons DemiBold', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'TT Commons DemiBold', fontSize: SIZES.h1},
  h2: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h2},
  h3: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h3},
  h4: {fontFamily: 'TT Commons Medium', fontSize: SIZES.h4},
  body1: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body1},
  body2: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body2},
  body3: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body3},
  body4: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body4},
  body5: {fontFamily: 'TT Commons Regular', fontSize: SIZES.body5},
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
