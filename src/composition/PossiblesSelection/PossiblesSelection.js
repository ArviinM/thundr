// React Modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third Party Libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';

// Utils
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../utils/commons';

const PossiblesSelection = props => {
  const {isJowableTabActive, setJowableTabActive} = props;

  return (
    <LinearGradient
      colors={['#febc29', '#ef9c3d', '#e43d59']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={{
        flexDirection: 'row',
        width: '100%',
        gap: scale(10),
        justifyContent: 'center',
        height: verticalScale(90),
        padding: scale(isIosDevice() ? 15 : 15),
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          setJowableTabActive(true);
        }}>
        <View
          style={{
            backgroundColor: '#E43C59',
            height: verticalScale(60),
            width: scale(150),
            borderRadius: 20,
            alignItems: 'center',
            padding: scale(5),
          }}>
          <Text
            fontFamily="ClimateCrisis-Regular"
            weight={700}
            color="#fff"
            size={18}>
            JOWABLES
          </Text>
          <Text
            size={isIosDevice() ? 13 : 10}
            fontFamily="Montserrat-Regular"
            color="#fff"
            customStyle={{textAlign: 'center'}}>
            The right 1 may be 1 of them. DM mo na dali!
          </Text>
        </View>
        {isJowableTabActive && (
          <View
            style={{
              position: 'absolute',
              top: verticalScale(isIosDevice() ? 50 : 53),
              left: scale(65),
            }}>
            <Image
              source={GLOBAL_ASSET_URI.ACTIVE_INDICATOR}
              height={20}
              width={20}
            />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setJowableTabActive(false);
        }}>
        <View
          style={{
            backgroundColor: '#FFBD28',
            height: verticalScale(60),
            width: scale(150),
            borderRadius: 20,
            alignItems: 'center',
            padding: scale(5),
          }}>
          <Text
            fontFamily="ClimateCrisis-Regular"
            weight={700}
            color="#fff"
            size={18}>
            MAREBLES
          </Text>
          <Text
            size={isIosDevice() ? 13 : 10}
            fontFamily="Montserrat-Regular"
            color="#fff"
            customStyle={{textAlign: 'center'}}>
            Best Mares Forever? Chikahin mo na siya!
          </Text>
        </View>
        {!isJowableTabActive && (
          <View
            style={{
              position: 'absolute',
              top: verticalScale(isIosDevice() ? 50 : 53),
              left: scale(65),
            }}>
            <Image
              source={GLOBAL_ASSET_URI.ACTIVE_INDICATOR}
              height={20}
              width={20}
            />
          </View>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PossiblesSelection;
