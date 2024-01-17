// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Overlay} from 'react-native-elements';

// Components
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';

// Utils
import {GLOBAL_ASSET_URI, LIGHTNING_ROUND_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const LightningRound = () => {
  const navigation = useNavigation();
  const displayModal = true;

  const renderModal = () => {
    return (
      <Overlay
        onBackdropPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'DashboardTabs'}],
          })
        }
        overlayStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E43C59',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            {translateX: -scale(125)},
            {translateY: -verticalScale(20)},
          ],
          height: 'auto',
          width: scale(250),
          borderRadius: 20,
          borderWidth: 3,
          borderColor: '#FEBC29',
        }}
        isVisible={true}>
        <Text
          size={18}
          color="#fff"
          fontFamily="Montserrat-Bold"
          weight={700}
          customStyle={{textAlign: 'center'}}>
          Oops! Wait lang, mars. This feature will be available soon.
        </Text>
      </Overlay>
    );
  };

  return (
    <LinearGradient
      colors={['#ed2a85', '#fe406b', '#ff5d51', '#ff7c39', '#f89924']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      {displayModal && renderModal()}
      <TouchableOpacity
        style={{left: scale(20), top: verticalScale(20)}}
        onPress={() => navigation.navigate('DashboardTab')}>
        <Image
          source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
          height={25}
          width={25}
        />
      </TouchableOpacity>
      <Separator space={40} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={LIGHTNING_ROUND_URI.LIGHTNING_ROUND}
          height={120}
          width={200}
        />
        <Separator space={20} />
        <Text
          fontFamily="ClimateCrisis-Regular"
          size={19}
          color="#fff"
          customStyle={{textAlign: 'center', paddingHorizontal: scale(40)}}>
          May bagyo dito every Saturday at 7 to 8pm!
        </Text>
      </View>
      <Separator space={20} />
      <View style={{paddingHorizontal: scale(50), alignItems: 'center'}}>
        <Text
          color="#fff"
          fontFamily="Montserrat-Regular"
          size={16}
          customStyle={{textAlign: 'center'}}>
          Chat with beshies up to 2 mins! No photos or profiles, usap lang!
        </Text>
        <Separator space={10} />
        <Text
          color="#fff"
          fontFamily="Montserrat-Regular"
          size={16}
          customStyle={{textAlign: 'center'}}>
          If bet mo siya mhie, Jowa or Mare mo na!
        </Text>
        <Separator space={10} />
        <Text
          color="#fff"
          fontFamily="Montserrat-Regular"
          size={16}
          customStyle={{textAlign: 'center'}}>
          You’ll see at the end if match kayo. After that, you can chat them na
          whenever you like!
        </Text>
        <Separator space={10} />
        <Text color="#fff" fontFamily="Montserrat-Regular" size={14}>
          Available for Thunder Bolt users only.
        </Text>
        <Separator space={10} />
        <Button
          onPress={() => {
            navigation.navigate('ThunderBolt');
          }}
          title="Subscribe Now!"
          style={{
            width: scale(180),
            backgroundColor: '#E42042',
          }}
        />
        <Separator space={10} />
        <Text color="#fff" fontFamily="Montserrat-Regular" size={14}>
          Thunderbolt Users are paid subscribers
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LightningRound;
