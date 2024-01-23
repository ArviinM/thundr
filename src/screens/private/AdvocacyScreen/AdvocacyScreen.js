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
        <View style={{flexDirection: 'row', gap: scale(5)}}>
          {/* <TouchableOpacity
            onPress={() =>
              navigation.navigate('AdvocacyInformationScreen', {
                fromGoldenGays: true,
              })
            }>
            <Image
              source={ADVOCACY_ASSET_URI.GOLDEN_GAYS}
              height={150}
              width={150}
            />
          </TouchableOpacity>
          <Separator space={15} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AdvocacyInformationScreen', {
                fromGoldenGays: false,
              })
            }>
            <Image
              source={ADVOCACY_ASSET_URI.GALANG}
              height={150}
              width={150}
            />
          </TouchableOpacity> */}
          {/* <LinearGradient
            colors={['#ed2a85', '#fe406b', '#ff5d51', '#ff7c39', '#f89924']}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
            style={{width: scale(300), alignItems: 'center', borderRadius: 30}}> */}
          <Image source={ADVOCACY_ASSET_URI.TEST} height={200} width={240} />
          {/* </LinearGradient> */}
        </View>
        <Separator space={20} />
        <Text
          fontFamily="ClimateCrisis-Regular"
          color="#fff"
          size={22}
          customStyle={{textAlign: 'center'}}>
          Donation to date
        </Text>
        <View
          style={{
            top: verticalScale(10),
            backgroundColor: '#F5D1D0',
            height: verticalScale(140),
            width: scale(250),
            borderRadius: 30,
            flexDirection: 'row',
            padding: scale(20),
          }}>
          <Image
            source={ADVOCACY_ASSET_URI.THUNDR_GAS_FULL}
            height={100}
            width={100}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('AdvocacyTransaction')}>
            <Image
              source={ADVOCACY_ASSET_URI.GIVE_DONATION}
              height={100}
              width={100}
            />
          </TouchableOpacity>
        </View>
        <Text
          size={10}
          customStyle={{
            textAlign: 'center',
            top: verticalScale(15),
            paddingHorizontal: scale(40),
          }}>
          Free users can donate a minimum of 100Php and get a 7-day trial
          subscription for your support. Only valid once per month.
        </Text>
      </View>
    </LinearGradient>
  );
};

export default AdvocacyScreen;
