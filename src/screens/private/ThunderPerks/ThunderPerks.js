// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Text from '../../../components/Text/Text';

// Utils
import {GLOBAL_ASSET_URI, SUBSCRIPTION_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const PerksLeftIcon = props => {
  const {text, src} = props;
  return (
    <View
      style={{
        borderColor: '#E43C59',
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: scale(20),
        height: verticalScale(100),
        width: scale(300),
        alignItems: 'center',
        gap: scale(0),
        borderRadius: 30,
        marginBottom: verticalScale(10),
      }}>
      <Image source={src} height={50} width={60} />
      <View style={{width: scale(220)}}>
        <Text
          fontFamily="Montserrat-Black"
          weight={700}
          color="#fff"
          size={20}
          customStyle={{paddingHorizontal: scale(20)}}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const PerksRightIcon = props => {
  const {text, src, isHighlighted} = props;
  return (
    <View
      style={{
        borderColor: isHighlighted ? '#FDBA29' : '#E43C59',
        borderWidth: isHighlighted ? 5 : 1,
        flexDirection: 'row',
        paddingHorizontal: scale(5),
        height: verticalScale(100),
        width: scale(300),
        alignItems: 'center',
        gap: scale(0),
        borderRadius: 30,
        marginBottom: verticalScale(10),
      }}>
      <View style={{width: scale(220)}}>
        <Text
          fontFamily="Montserrat-Black"
          weight={700}
          color="#fff"
          size={20}
          customStyle={{
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Image source={src} height={50} width={60} />
      </View>
    </View>
  );
};

const ThunderPerks = () => {
  const navigation = useNavigation();
  const flag = false;
  return (
    <LinearGradient
      colors={['#FEBC29', '#EF9C3D', '#E43C59']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingBottom: verticalScale(30),
        }}>
        <Image
          source={SUBSCRIPTION_ASSET_URI.THUNDERBOLT_ARC}
          height={230}
          width={400}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('DashboardTab')}
          style={{
            position: 'absolute',
            right: scale(20),
            top: verticalScale(20),
          }}>
          <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} height={40} width={40} />
        </TouchableOpacity>
        <Separator space={10} />
        <View>
          <Text
            fontFamily="ClimateCrisis-Regular"
            color="#fff"
            weight={700}
            size={18}
            customStyle={{textAlign: 'center'}}>
            BONGGA! ENJOY THESE PERKS, GO!
          </Text>
        </View>
        <Separator space={10} />
        <View>
          {flag && (
            <PerksRightIcon
              text="May savings na, tuloy-tuloy pa ang perks. No need to renew monthly. Boogsh!"
              src={SUBSCRIPTION_ASSET_URI.SAVINGS_ICON}
              isHighlighted={true}
            />
          )}
          <PerksLeftIcon
            text="Upload photos or videos para bongga ang chika."
            src={SUBSCRIPTION_ASSET_URI.GALLERY_ICON}
          />
          <PerksRightIcon
            text="Swipe to sawa na your matches 24/7."
            src={SUBSCRIPTION_ASSET_URI.SWIPE_ICON}
          />
          <PerksLeftIcon
            text="Goodbye ads, tuloy-tuloy ang awra!"
            src={SUBSCRIPTION_ASSET_URI.ADS_ICON}
          />
          <PerksRightIcon
            text="Looking for someone specific? Customize with Advanced Filters."
            src={SUBSCRIPTION_ASSET_URI.SPECIFIC_MATCH_ICON}
          />
          <PerksLeftIcon
            text="Collect and select with full The Possibles access. Kita mo na sila.Pak!"
            src={SUBSCRIPTION_ASSET_URI.POSSIBLES_ICON}
          />
          <PerksRightIcon
            text="You now support our LGBTQIA+ organization with your subscription. Winner!"
            src={SUBSCRIPTION_ASSET_URI.SUBSCRIPTION_WINNER_ICON}
          />
        </View>
        <Text
          fontFamily="ClimateCrisis-Regular"
          weight={700}
          color="#fff"
          size={20}>
          TARAY!
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default ThunderPerks;
