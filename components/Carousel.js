import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AnimatedImageSlider from 'rn-animated-image-carousel';
import {SIZES} from '../constants';

const sampleData = [
  'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G',
  'https://www.mindinventory.com/blog/wp-content/uploads/2018/07/reactjs-1200x600.jpg',
  'https://danilowoz.com/images/atomic-design-with-react/cover.jpg',
];

const Carousel = ({banners, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      <AnimatedImageSlider
        data={banners}
        imageBorderRadius={10}
        imageHeight={160}
        imageWidth={SIZES.width * 0.95}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
