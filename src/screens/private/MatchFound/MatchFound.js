// React modules
import React from 'react';
import {ImageBackground, View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import {DASHBOARD_ASSET_URI, SAMPLE_IMAGE} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import Button from '../../../components/Button/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Separator from '../../../components/Separator/Separator';
import {useSelector} from 'react-redux';

const jowaGradientColors = [
  '#ed2a85',
  '#fe406b',
  '#ff5d51',
  '#ff7c39',
  '#f89924',
];
const mareGradientColors = [
  '#f2653c',
  '#fa7d35',
  '#fe9630',
  '#ffae2f',
  '#ffc634',
];

/* 
   <ImageBackground
          source={
            isMare
              ? DASHBOARD_ASSET_URI.MATCH_FOUND_MARE
              : DASHBOARD_ASSET_URI.MATCH_FOUND_JOWA
          }
          style={{
            height: verticalScale(425),
            width: scale(315),
            top: verticalScale(20),
            padding: 80,
          }}
          // height={450}
          // width={250}
        >
          {/* <View>
            <Image height={200} width={200} resizeMode="contain" />
          </View> */
// </ImageBackground>

const MatchFound = () => {
  const {customerMatchData, matchPhoto} = useSelector(state => state.dashboard);
  const {customerPhoto} = useSelector(state => state.persistedState);
  const isMare = customerMatchData?.data?.tag === 'Mare';

  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={isMare ? mareGradientColors : jowaGradientColors}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View style={{left: scale(isMare ? 20 : 50)}}>
        <ImageBackground
          source={
            isMare
              ? DASHBOARD_ASSET_URI.MARE_UPPER_BG
              : DASHBOARD_ASSET_URI.JOWA_UPPER_BG
          }
          style={{
            height: verticalScale(200),
            width: scale(160),
            top: verticalScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: scale(30),
          }}>
          <Image
            source={{uri: customerPhoto || ''}}
            width={500}
            customStyle={{flex: 1, resizeMode: 'contain', left: scale(20)}}
          />
        </ImageBackground>
        <ImageBackground
          source={
            isMare
              ? DASHBOARD_ASSET_URI.MARE_LOWER_BG
              : DASHBOARD_ASSET_URI.JOWA_LOWER_BG
          }
          style={{
            height: verticalScale(200),
            width: scale(160),
            left: scale(isMare ? 160 : 90),
            top: verticalScale(isMare ? 0 : -40),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: scale(30),
          }}>
          <Image
            source={{uri: matchPhoto || ''}}
            width={500}
            customStyle={{
              flex: 1,
              resizeMode: 'contain',
              right: scale(20),
            }}
          />
        </ImageBackground>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Separator space={70} />
        <View style={{alignItems: 'center', bottom: verticalScale(40)}}>
          <Text color="#fff" size={25}>
            {`You got ${isMare ? 'MARE!' : 'JOWA!'}`}
          </Text>
          <Text color="#fff" size={15}>
            {isMare
              ? 'Friendship alert! Say hi to your new mare bilis!'
              : 'The wait is over, mars! Landiin mo na, dali'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: scale(30),
            bottom: verticalScale(20),
          }}>
          <Button
            onPress={() => navigation.navigate('DashboardTab')}
            title="Chat now!"
            style={{width: scale(125), backgroundColor: '#FFBC28'}}
          />
          <Button
            onPress={() => navigation.navigate('DashboardTab')}
            title="Keep sighting"
            style={{width: scale(125)}}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default MatchFound;
