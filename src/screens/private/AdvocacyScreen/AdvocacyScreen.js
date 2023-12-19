// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';

// Components
import Text from '../../../components/Text/Text';

// Utils
import {scale, verticalScale} from '../../../utils/commons';
import {ADVOCACY_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';

const AdvocacyScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#ed2a85', '#fe406b', '#ff5d51', '#ff7c39', '#f89924']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('DashboardTab')}
        style={{left: scale(18), top: verticalScale(10)}}>
        <Image
          source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
          height={30}
          width={30}
        />
      </TouchableOpacity>
      <View style={{top: verticalScale(10), alignItems: 'center'}}>
        <Text
          fontFamily="ClimateCrisis-Regular"
          color="#fff"
          size={22}
          customStyle={{textAlign: 'center'}}>
          ADVOCACY
        </Text>
        <Separator space={5} />
        <Text
          customStyle={{textAlign: 'center', paddingHorizontal: scale(30)}}
          color="#fff"
          fontFamily="Montserrat-Regular">
          Thundr gives back to the community with the help of your subscription.
          Sharing is caring, da va?!
        </Text>
        <Separator space={20} />
        <View>
          <TouchableOpacity>
            <Image
              source={ADVOCACY_ASSET_URI.GOLDEN_GAYS}
              height={150}
              width={150}
            />
          </TouchableOpacity>
          <Separator space={15} />
          <TouchableOpacity>
            <Image
              source={ADVOCACY_ASSET_URI.GALANG}
              height={150}
              width={150}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AdvocacyScreen;
