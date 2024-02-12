// React modules
import React from 'react';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// Components
import Image from '../../../components/Image/Image';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';

// Ducks
import {UPDATE_PERSISTED_STATE} from '../../../ducks/PersistedState/actionTypes';

// Utils
import {SETTINGS_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import TermsAndConditions from './utils/TermsAndConditions';
import PrivacyPolicyContent from './utils/PrivacyPolicy';

const SecurityAndPrivacy = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const OpenURLButton = ({url}) => {
    const handlePress = async () => {
      await Linking.openURL(url);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text color="#48B5C0" customStyle={{textAlign: 'center'}}>
          https://thundr.ph/
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      scrollEventThrottle={16}
      style={{top: verticalScale(20), marginBottom: verticalScale(25)}}>
      {!route?.params?.fromLogin && <SettingsHeader />}
      <View style={{alignItems: 'center', paddingHorizontal: scale(20)}}>
        <Image source={SETTINGS_URI.PRIVACY_POLICY} height={100} width={100} />
        <Separator space={10} />
        <Text
          fontFamily="Montserrat-Bold"
          weight={700}
          size={20}
          color="#808080"
          customStyle={{textAlign: 'center'}}>
          Terms & Conditions
        </Text>
        <Separator space={10} />
        <TermsAndConditions />
        <Separator space={50} />
      </View>
      <View style={{alignItems: 'center', paddingHorizontal: scale(20)}}>
        <Image source={SETTINGS_URI.PRIVACY_POLICY} height={100} width={100} />
        <Separator space={10} />
        <Text
          fontFamily="Montserrat-Bold"
          weight={700}
          size={20}
          color="#808080"
          customStyle={{textAlign: 'center'}}>
          Privacy Policy
        </Text>
        <Separator space={10} />
        <PrivacyPolicyContent />
        <Separator space={50} />
      </View>
      {route?.params?.fromLogin && (
        <View
          style={{
            paddingBottom: verticalScale(50),
            height: verticalScale(100),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              dispatch({
                type: UPDATE_PERSISTED_STATE,
                newState: {
                  privacyPolicyChecked: true,
                },
              });
              navigation.goBack();
            }}
            style={{
              backgroundColor: '#E33051',
              height: verticalScale(60),
              width: scale(250),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text
              weight={700}
              fontFamily="Montserrat-Regular"
              color="#fff"
              customStyle={{textAlign: 'center'}}>
              I agree to the Terms & Conditions and Privacy Policy.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default SecurityAndPrivacy;
