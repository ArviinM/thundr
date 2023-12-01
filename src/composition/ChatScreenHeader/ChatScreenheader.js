import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from '../../utils/commons';
import {TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';
import {GLOBAL_ASSET_URI, SAMPLE_IMAGE} from '../../utils/images';
import Text from '../../components/Text/Text';
import {useNavigation} from '@react-navigation/native';

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
        <View>
          <Image source={SAMPLE_IMAGE.SAMPLE_1} height={70} width={70} />
        </View>
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
