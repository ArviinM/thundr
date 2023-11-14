import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import {DASHBOARD_ASSET_URI} from '../../../utils/images';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';
import {scale, verticalScale} from '../../../utils/commons';
import Separator from '../../../components/Separator/Separator';
import PhotoCarousel from '../../../composition/PhotoCarousel/PhotoCarousel';

const Profile = () => {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Image
        source={DASHBOARD_ASSET_URI.ORANGE_CONTAINER}
        height={430}
        width={380}
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          left: '25%',
          right: '25%',
          top: verticalScale(15),
        }}>
        <Text size={25} color="#fff" weight="700">
          Cholo, 39
        </Text>
        <Text size={15} color="#fff">
          Compatibility Score: 89%
        </Text>
        <View style={{position: 'absolute', top: verticalScale(50)}}>
          <PhotoCarousel />
        </View>
        <Separator space={80} />
        <View
          style={{
            backgroundColor: '#E33C59',
            height: verticalScale(250),
            width: verticalScale(280),
            borderRadius: 30,
            padding: scale(20),
          }}>
          <ScrollView>
            <Text color="#fff" weight="700">
              BIO
            </Text>
            <Text color="#fff">
              Lorem ipsum dolor sit amet adadad asdasfjf sjfsjfs jfsfj sfjfj
            </Text>
            <Separator space={20} />
            <Text color="#fff" weight="700">
              WORK
            </Text>
            <Text color="#fff">Lorem ipsum dolor sit amet</Text>
            <Separator space={20} />
            <Text color="#fff" weight="700">
              LOCATION
            </Text>
            <Text color="#fff">Lorem ipsum dolor sit amet</Text>
            <Separator space={20} />
            <Text color="#fff" weight="700">
              HOBBIES
            </Text>
            <Text color="#fff">Lorem ipsum dolor sit amet</Text>
            <Separator space={20} />
            <Text color="#fff" weight="700">
              Bio
            </Text>
            <Text color="#fff">Lorem ipsum dolor sit amet</Text>
            <Separator space={20} />
          </ScrollView>
        </View>
      </View>
      <JowaMareSection />
    </View>
  );
};

export default Profile;
