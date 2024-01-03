// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import Carousel from 'react-native-snap-carousel';

// Components
import Image from '../../components/Image/Image';
import PhotoModal from '../PhotoModal/PhotoModal';

// Utils
import {isIosDevice, verticalScale} from '../../utils/commons';

// Styles
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';

const PhotoCarousel = props => {
  const {setOpenPhotoModal, customerPhotoUrl, openPhotoModal} = props;
  const [photoModalValue, setPhotoModalValue] = useState('');

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
              source={{uri: item.photoUrl}}
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
    <View style={{alignItems: 'center'}}>
      <Carousel
        removeClippedSubviews={false}
        layout={'default'}
        data={customerPhotoUrl}
        renderItem={renderItem}
        sliderWidth={500}
        itemWidth={100}
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
