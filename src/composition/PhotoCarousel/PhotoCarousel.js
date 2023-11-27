import React, {useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import {isIosDevice, verticalScale} from '../../utils/commons';
import {TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';
import PhotoModal from '../PhotoModal/PhotoModal';

const PhotoCarousel = props => {
  const {setOpenPhotoModal, customerPhotoUrl, openPhotoModal} = props;
  const [photoModalValue, setPhotoModalValue] = useState('');
  const data = customerPhotoUrl;

  const renderItem = ({item, index}) => {
    return (
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setOpenPhotoModal(true);
            setPhotoModalValue(item?.photoUrl);
          }}
          key={index}>
          <View
            style={{
              height: verticalScale(75),
              backgroundColor: '#D8DCDD',
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item?.photoUrl}}
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
      <PhotoModal
        setOpenPhotoModal={setOpenPhotoModal}
        openPhotoModal={openPhotoModal}
        customerPhotoUrl={photoModalValue}
      />
    </View>
  );
};

export default PhotoCarousel;
