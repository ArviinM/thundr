// React modules
import React, {useCallback, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

// Components
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import Separator from '../../../components/Separator/Separator';
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';
import SettingsModal from '../../../composition/SettingsModal/SettingsModal';
import Spinner from '../../../components/Spinner/Spinner';

// Ducks
import {START_LOGOUT} from '../../../ducks/Login/actionTypes';
import {
  GET_CUSTOMER_SETTINGS,
  GET_CUSTOMER_SURVEY,
} from '../../../ducks/Settings/actionTypes';

// Utils
import {SETTINGS_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';

const SettingsMainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading} = useSelector(state => state.settings);
  const {subscriptionDetails} = useSelector(state => state.subscription);
  const withSubscription = subscriptionDetails?.withSubscription;
  const [displayModal, setDisplayModal] = useState('');

  useFocusEffect(
    useCallback(() => {
      dispatch({type: GET_CUSTOMER_SETTINGS});
      dispatch({type: GET_CUSTOMER_SURVEY});
    }, [dispatch]),
  );

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

  if (loading) {
    return <Spinner />;
  }

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
          onPress={() => setDisplayModal('delete')}
          title="Deactivate"
          style={{width: scale(150)}}
        />
        <Separator space={10} />
        <Button
          disabled={withSubscription}
          title="Subscribe"
          style={{
            width: scale(150),
            backgroundColor: !withSubscription ? '#E33051' : '#B1B3B5',
          }}
          onPress={() => navigation.navigate('ThunderBolt')}
        />
        <Separator space={10} />
        <Button
          disabled={!withSubscription}
          onPress={() => setDisplayModal('unsubscribe')}
          title="Unsubscribe"
          style={{
            width: scale(150),
            backgroundColor: !withSubscription ? '#B1B3B5' : '#E33051',
          }}
        />
      </View>
    </View>
  );
};

export default SettingsMainScreen;
