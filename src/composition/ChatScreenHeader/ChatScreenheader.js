import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from '../../utils/commons';
import {TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';
import {GLOBAL_ASSET_URI, SAMPLE_IMAGE} from '../../utils/images';
import Text from '../../components/Text/Text';
import {useNavigation} from '@react-navigation/native';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';

const ChatScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{
        flexDirection: 'row',
        gap: scale(25),
        paddingLeft: scale(20),
        height: verticalScale(60),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <Image
            source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
            height={25}
            width={25}
          />
        </TouchableOpacity>
        <BorderLinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E72454', '#FFC227']}
          style={{
            marginHorizontal: scale(8),
            height: verticalScale(50),
            width: scale(60),
          }}>
          <View
            style={{
              height: verticalScale(47),
              backgroundColor: '#9B9DA0',
              borderRadius: 15,
              alignItems: 'center',
            }}>
            <Image source={SAMPLE_IMAGE.SAMPLE_1} height={50} width={50} />
          </View>
        </BorderLinearGradient>
        <View>
          <Text
            fontFamily="Montserrat-Medium"
            color="#fff"
            size={20}
            weight="700">
            Cholo, 39
          </Text>
          <Text fontFamily="Montserrat-Medium" color="#fff" size={15}>
            Compatibility Score: 89%
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChatScreenHeader;
