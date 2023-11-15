// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';
import Separator from '../../../components/Separator/Separator';
import PhotoCarousel from '../../../composition/PhotoCarousel/PhotoCarousel';
import MatchInformationSection from '../../../composition/MatchInformationSection/MatchInformationSection';

// Utils
import {DASHBOARD_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [isMare, setMare] = useState(false);
  const [isJowa, setJowa] = useState(false);
  const [swipeValue, setSwipeValue] = useState('');

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Image
        source={DASHBOARD_ASSET_URI.ORANGE_CONTAINER}
        height={isIosDevice() ? 430 : 445}
        width={380}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          left: '25%',
          right: '25%',
          top: verticalScale(isIosDevice() ? 15 : 5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: scale(225),
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={GLOBAL_ASSET_URI.BACK_ICON} height={20} width={20} />
          </TouchableOpacity>
        </View>
        <Text size={25} color="#fff" weight="700">
          Cholo, 39
        </Text>
        <Text size={15} color="#fff" customStyle={{textAlign: 'center'}}>
          Compatibility Score: 89%
        </Text>
        <View
          style={{
            position: 'absolute',
            top: verticalScale(isIosDevice() ? 50 : 80),
          }}>
          <PhotoCarousel />
        </View>
        <Separator space={90} />
        <MatchInformationSection />
        {!isIosDevice() && <Separator space={20} />}
        <JowaMareSection
          isMare={isMare}
          isJowa={isJowa}
          setMare={setMare}
          setJowa={setJowa}
          setSwipeValue={setSwipeValue}
          swipeValue={swipeValue}
        />
      </View>
    </View>
  );
};

export default Profile;
