// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

// Components
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';

// Ducks
import {START_LOGOUT} from '../../../ducks/Login/actionTypes';

// Utils
import {SETTINGS_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const SettingsMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const GradientButtons = props => {
    const {src, onPress} = props;

    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={onPress}>
          <Image source={src} height={60} width={260} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{top: verticalScale(20)}}>
      <SettingsHeader />
      <GradientButtons src={SETTINGS_URI.NOTIFICATIONS_BUTTON} />
      <GradientButtons
        src={SETTINGS_URI.PRIVACY_BUTTON}
        onPress={() => navigation.navigate('SecurityAndPrivacy')}
      />
      <GradientButtons
        src={SETTINGS_URI.CONTACT_US_BUTTON}
        onPress={() => navigation.navigate('ContactUs')}
      />
      <Separator space={50} />
      <View>
        <Button
          title="Log out"
          style={{width: scale(150)}}
          onPress={() => dispatch({type: START_LOGOUT})}
        />
        <Separator space={10} />
        <Button
          disabled
          title="Delete Account"
          style={{width: scale(150), backgroundColor: '#B1B3B5'}}
        />
        <Separator space={10} />
        <Button title="Subscribe" style={{width: scale(150)}} />
        <Separator space={10} />
        <Button
          disabled
          title="Unsubscribe"
          style={{width: scale(150), backgroundColor: '#B1B3B5'}}
        />
      </View>
    </View>
  );
};

export default SettingsMainScreen;
