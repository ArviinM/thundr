// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';

// Utils
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {GLOBAL_ASSET_URI, SUBSCRIPTION_ASSET_URI} from '../../../utils/images';
import FeatureNotAvailableModal from '../../../composition/FeatureNotAvailableModal/FeatureNotAvailableModal';

const ThunderBolt = () => {
  const navigation = useNavigation();
  const {subscriptionDetails} = useSelector(state => state.subscription);
  const withSubscription = subscriptionDetails?.withSubscription;
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#EDE8E5'}}>
      {displayModal && (
        <FeatureNotAvailableModal
          normalBehaviorModal={true}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          gap: scale(240),
          top: verticalScale(20),
          left: scale(20),
          zIndex: 1,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardTab')}>
          <Image source={GLOBAL_ASSET_URI.BACK_ICON} width={25} height={25} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          top: verticalScale(0),
          paddingHorizontal: scale(25),
        }}>
        <Text color="#E43C59" fontFamily="ClimateCrisis-Regular" size={25}>
          Thundr Bolt
        </Text>
        <Text
          customStyle={{textAlign: 'center'}}
          weight={500}
          color="#808080"
          fontFamily="Montserrat-Regular">
          Paid subscription para sa mga kabog. Unlock exclusive access to all
          features.
        </Text>
      </View>
      {withSubscription && (
        <LinearGradient
          colors={['#febc29', '#ef9c3d', '#e43d59']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            top: verticalScale(30),
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
            height: verticalScale(isIosDevice() ? 140 : 150),
            width: scale(300),
            left: 'auto',
            right: 'auto',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              customStyle={{textAlign: 'center'}}
              fontFamily="Montserrat-Black"
              size={15}
              weight={700}
              color="#fff">
              Upgrade now and save P600. May savings na, tuloy-tuloy pa ang
              perks, mars!
            </Text>
            <View style={{flexDirection: 'row', gap: scale(15)}}>
              <TouchableOpacity disabled>
                <Image
                  source={SUBSCRIPTION_ASSET_URI.DISABLED_MONTHLY_BUTTON}
                  height={100}
                  width={100}
                />
              </TouchableOpacity>
              <Image
                source={SUBSCRIPTION_ASSET_URI.SUBSCRIPTION_ARROW}
                height={100}
                width={30}
              />
              <TouchableOpacity
                // onPress={() => navigation.navigate('ThunderPerks')} // temporary
                onPress={() => setDisplayModal(true)}>
                <Image
                  source={SUBSCRIPTION_ASSET_URI.ANNUAL_BUTTON}
                  height={100}
                  width={100}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
      <Separator space={!withSubscription ? 35 : 45} />
      <View style={{paddingHorizontal: scale(50)}}>
        <Text
          customStyle={{textAlign: 'center'}}
          color="#E43C59"
          weight={isIosDevice() ? 700 : 400}
          fontFamily="Montserrat-Bold"
          size={15}>
          WHAT’S IN IT FOR YOU? LET ME TELL YOU, MARS!
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image
          source={SUBSCRIPTION_ASSET_URI.SUBSCRIPTION_TABLE}
          height={320}
          width={320}
        />
      </View>
      {!withSubscription && (
        <View style={{alignItems: 'center', top: verticalScale(-15)}}>
          <Text
            color="#E43C59"
            fontFamily="Montserrat-Bold"
            weight={isIosDevice() ? 700 : 400}
            size={20}>
            Subscribe Now!
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: scale(20),
              top: verticalScale(-15),
            }}>
            <TouchableOpacity onPress={() => setDisplayModal(true)}>
              <Image
                source={SUBSCRIPTION_ASSET_URI.MONTHLY_BUTTON}
                width={100}
                height={100}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDisplayModal(true)}>
              <Image
                source={SUBSCRIPTION_ASSET_URI.ANNUAL_BUTTON}
                width={100}
                height={100}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ThunderBolt;
