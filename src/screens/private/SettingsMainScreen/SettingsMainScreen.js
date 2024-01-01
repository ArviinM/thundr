// React modules
import React, {useState} from 'react';
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
import SettingsModal from '../../../composition/SettingsModal/SettingsModal';

const SettingsMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayModal, setDisplayModal] = useState('');

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
      <SettingsModal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <GradientButtons
        src={SETTINGS_URI.NOTIFICATIONS_BUTTON}
        onPress={() => navigation.navigate('NotificationSettings')}
      />
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
          // disabled
          onPress={() => setDisplayModal('delete')}
          title="Delete Account"
          style={{width: scale(150)}}
        />
        <Separator space={10} />
        <Button title="Subscribe" style={{width: scale(150)}} />
        <Separator space={10} />
        <Button
          // disabled
          // backgroundColor: '#B1B3B5'
          onPress={() => setDisplayModal('unsubscribe')}
          title="Unsubscribe"
          style={{width: scale(150)}}
        />
      </View>
    </View>
  );
};

export default SettingsMainScreen;
