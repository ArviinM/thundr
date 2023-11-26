// React modules
import React from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';

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
  const matchPhotoUrl = matchPhoto?.customerPhoto[0]?.photoUrl;

  const styles = StyleSheet.create({
    triangleContainer: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 200, // Adjust this value for the width of the triangle
      borderBottomWidth: 200, // Adjust this value for the height of the triangle
      borderLeftColor: 'transparent',
      borderBottomColor: 'red', // Adjust this color as needed
      borderTopLeftRadius: 10, // Adjust this value for the curved edges
    },
    triangle: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 50, // Adjust this value to match the borderLeftWidth above
      borderBottomWidth: 50, // Adjust this value to match the borderBottomWidth above
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopLeftRadius: 10, // Adjust this value to match the borderTopLeftRadius above
    },
  });

  const RightTriangle = () => {
    return (
      <View style={styles.triangleContainer}>
        <View style={styles.triangle}>
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
              // borderWidth: 2,
            }}>
            <Image
              source={{uri: customerPhoto || ''}}
              width={200}
              height={200}
              customStyle={{resizeMode: 'cover', left: scale(0), zIndex: 1}}
            />
          </ImageBackground>
        </View>
      </View>
    );
  };

  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={isMare ? mareGradientColors : jowaGradientColors}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View style={{left: scale(isMare ? 20 : 50)}}>
        {/* <RightTriangle /> */}
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
            borderColor: 'red',
            // borderWidth: 2,
          }}>
          <Image
            source={{uri: customerPhoto || ''}}
            width={200}
            height={200}
            customStyle={{resizeMode: 'cover', left: scale(0), zIndex: -1}}
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
            source={{uri: matchPhotoUrl || ''}}
            width={200}
            height={200}
            customStyle={{
              resizeMode: 'cover',
              right: scale(20),
              zIndex: -1,
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
