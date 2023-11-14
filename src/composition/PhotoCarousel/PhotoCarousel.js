import React, {version} from 'react';
import Carousel from 'react-native-snap-carousel';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import {scale, verticalScale} from '../../utils/commons';
import {View} from 'react-native';

const PhotoCarousel = () => {
  const data = ['1', '2', '3', '4', '5'];

  const renderItem = ({item, index}) => {
    return (
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <View
          style={{
            height: verticalScale(50),
            width: scale(250),
            backgroundColor: '#fff',
            borderRadius: 15,
            padding: scale(22),
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
            }}></View>
        </View>
      </BorderLinearGradient>
    );
  };

  return (
    <View>
      <Carousel
        firstItem={2}
        data={data}
        renderItem={renderItem}
        sliderWidth={500}
        itemWidth={100}
      />
    </View>
  );
};

export default PhotoCarousel;
