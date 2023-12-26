// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';

// Utils
import {ADVOCACY_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import {useNavigation} from '@react-navigation/native';

const AdvocacyResult = () => {
  const navigation = useNavigation();
  const approved = true;
  const failed = false;

  const renderImage = () => {
    if (approved) {
      return ADVOCACY_ASSET_URI.APPROVED_ICON;
    } else if (failed) {
      return ADVOCACY_ASSET_URI.FAILED_ICON;
    } else {
      return ADVOCACY_ASSET_URI.CANCELLED_ICON;
    }
  };

  const renderMessage = () => {
    if (approved) {
      return 'Thank you for your donation. BonGga ka talaga, beh!';
    } else if (failed) {
      return 'Transaction failed. Try again, mars!';
    } else {
      return 'Transaction cancelled. You can still donate anytime, sis!';
    }
  };

  return (
    <LinearGradient
      colors={['#ed2a85', '#fe406b', '#ff5d51', '#ff7c39', '#f89924']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'DashboardTab'}],
          })
        }
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: scale(20),
          top: verticalScale(40),
        }}>
        <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} height={35} width={35} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', top: verticalScale(90)}}>
        <Image source={renderImage()} width={200} height={200} />
        <Text
          fontFamily="ClimateCrisis-Regular"
          size={20}
          weight={700}
          color="#fff"
          customStyle={{textAlign: 'center'}}>
          {renderMessage().toUpperCase()}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AdvocacyResult;
