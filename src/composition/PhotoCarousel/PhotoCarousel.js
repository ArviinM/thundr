import React, {version} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';

const PhotoCarousel = props => {
  const {setOpenPhotoModal, customerPhotoUrl} = props;
  const data = [customerPhotoUrl];

  const renderItem = ({item, index}) => {
    return (
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <TouchableOpacity onPress={() => setOpenPhotoModal(true)}>
          <View
            style={{
              height: verticalScale(75),
              backgroundColor: '#D8DCDD',
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: customerPhotoUrl}}
              height={75}
              width={isIosDevice() ? 100 : 93}
              resizeMode="cover"
              customStyle={{borderRadius: 15}}
            />
          </View>
        </TouchableOpacity>
      </BorderLinearGradient>
    );
  };

  return (
    <View>
      <Carousel
        layout={'default'}
        data={data}
        renderItem={renderItem}
        sliderWidth={500}
        itemWidth={100}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default PhotoCarousel;
