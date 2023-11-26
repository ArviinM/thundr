// React modules
import React, {useRef} from 'react';
import {ImageBackground, View, Animated} from 'react-native';

// Third party libraries
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import Separator from '../../../components/Separator/Separator';
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';

// Utils
import {DASHBOARD_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';

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
  const navigation = useNavigation();
  const {customerMatchData, matchPhoto} = useSelector(state => state.dashboard);
  const {customerPhoto} = useSelector(state => state.persistedState);
  const matchPhotoUrl = matchPhoto?.customerPhoto?.[0]?.photoUrl;
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const isMare = customerMatchData?.data?.tag === 'Mare';

  useFocusEffect(
    React.useCallback(() => {
      if (customerPhoto && matchPhotoUrl) {
        animatedValue1.setValue(0);
        animatedValue2.setValue(0);
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
    }, [customerPhoto, matchPhotoUrl]),
  );

  const translateX1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0],
  });

  const translateX2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  return (
    <LinearGradient
      colors={isMare ? mareGradientColors : jowaGradientColors}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View
        style={{
          left: scale(isMare ? 20 : 50),
          top: verticalScale(isMare ? 10 : 20),
        }}>
        <ImageBackground
          style={{
            height: verticalScale(200),
            width: scale(160),
            top: verticalScale(20),
            left: scale(isMare ? 5 : 0),
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
        {!isMare && (
          <View
            style={{
              position: 'absolute',
              top: verticalScale(144.5),
              left: scale(80),
              zIndex: 2,
            }}>
            <Image
              source={DASHBOARD_ASSET_URI.JOWA_MATCH_INDICATOR}
              width={80}
              height={isIosDevice() ? 80 : 76}
            />
          </View>
        )}
        <ImageBackground
          style={{
            height: verticalScale(200),
            width: scale(160),
            left: scale(isMare ? 145 : 90),
            top: verticalScale(isMare ? 5 : -40),
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
        <Separator space={isMare ? 70 : 40} />
        <View style={{alignItems: 'center', bottom: verticalScale(40)}}>
          <Text color="#fff" size={23} fontFamily="ClimateCrisis-Regular">
            {`You got ${isMare ? 'MARE!' : 'JOWA!'}`}
          </Text>
          <Text
            color="#fff"
            size={14}
            fontFamily="Montserrat-Medium"
            customStyle={{paddingHorizontal: scale(10), textAlign: 'center'}}>
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
            onPress={() => navigation.navigate('Messages')}
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
