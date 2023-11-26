// React modules
import React, {useEffect, useRef} from 'react';
import {ImageBackground, View, Animated} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import {DASHBOARD_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
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

const MatchFound = () => {
  const {customerMatchData, matchPhoto} = useSelector(state => state.dashboard);
  const {customerPhoto} = useSelector(state => state.persistedState);
  const isMare = customerMatchData?.data?.tag === 'Mare';
  const matchPhotoUrl = matchPhoto?.customerPhoto?.[0]?.photoUrl;
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (matchPhotoUrl && customerPhoto) {
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();
    }
  }, [matchPhotoUrl, customerPhoto]);

  const translateX1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0],
  });

  const translateX2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={isMare ? mareGradientColors : jowaGradientColors}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View style={{left: scale(isMare ? 20 : 50), top: verticalScale(20)}}>
        <ImageBackground
          style={{
            height: verticalScale(200),
            width: scale(160),
            top: verticalScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: scale(30),
            borderColor: 'red',
            borderRadius: 35,
          }}>
          <Animated.View style={{transform: [{translateX: translateX1}]}}>
            <Image
              source={{uri: customerPhoto || ''}}
              width={340}
              height={200}
              customStyle={{
                resizeMode: 'cover',
                zIndex: 1,
              }}
            />
          </Animated.View>
        </ImageBackground>
        <View
          style={{
            position: 'absolute',
            top: verticalScale(145),
            left: scale(80),
            zIndex: 2,
          }}>
          <Image
            source={DASHBOARD_ASSET_URI.JOWA_MATCH_INDICATOR}
            width={80}
            height={80}
          />
        </View>
        <ImageBackground
          style={{
            height: verticalScale(200),
            width: scale(160),
            left: scale(isMare ? 160 : 90),
            top: verticalScale(isMare ? 0 : -40),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: scale(30),
            borderRadius: 35,
          }}>
          <Animated.View style={{transform: [{translateX: translateX2}]}}>
            <Image
              source={{uri: matchPhotoUrl || ''}}
              width={300}
              height={200}
              customStyle={{
                resizeMode: 'cover',
                right: scale(20),
                zIndex: 1,
              }}
            />
          </Animated.View>
        </ImageBackground>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Separator space={40} />
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
