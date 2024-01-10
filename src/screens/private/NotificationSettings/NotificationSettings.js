// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries

import {Switch} from 'react-native-switch';

// Components
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';

// Utils
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_CUSTOMER_SETTINGS} from '../../../ducks/Settings/actionTypes';

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const {customerSettings} = useSelector(state => state.settings);
  const [isNotificationEnabled, setNotificationEnabled] = useState(
    customerSettings?.inAppNotificationOn ? true : false,
  );
  const [isEmailEnabled, setEmailEnabled] = useState(
    customerSettings?.emailNotificationOn ? true : false,
  );

  return (
    <View style={{top: verticalScale(30)}}>
      <SettingsHeader />
      <View style={{alignItems: 'center'}}>
        <Text
          size={20}
          weight={700}
          color="#808080"
          fontFamily="Montserrat-Bold"
          customStyle={{textAlign: 'center', paddingHorizontal: scale(30)}}>
          Turning this off might mean you miss alerts
        </Text>
        <Separator space={20} />
        <View
          style={{
            backgroundColor: '#fff',
            height: verticalScale(isIosDevice() ? 40 : 45),
            width: scale(300),
            borderRadius: 20,
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(20),
            flexDirection: 'row',
            gap: scale(20),
            justifyContent: 'space-around',
          }}>
          <Text
            size={18}
            weight={700}
            color="#808080"
            fontFamily="Montserrat-Bold">
            In-app notification
          </Text>
          <View style={{justifyContent: 'center'}}>
            <Switch
              value={isNotificationEnabled}
              onValueChange={() => {
                setNotificationEnabled(!isNotificationEnabled);
                dispatch({
                  type: UPDATE_CUSTOMER_SETTINGS,
                  payload: {
                    inAppNotificationOn: !isNotificationEnabled,
                    emailNotificationOn: isEmailEnabled,
                  },
                });
              }}
              backgroundActive="#E43D59"
              backgroundInactive="#9B9DA0"
              circleActiveColor="#FFBD28"
              circleInActiveColor="#808080"
              activeText=""
              inActiveText=""
            />
          </View>
        </View>
        <Separator space={20} />
        <View
          style={{
            backgroundColor: '#fff',
            height: verticalScale(isIosDevice() ? 40 : 45),
            width: scale(300),
            borderRadius: 20,
            paddingVertical: verticalScale(10),
            paddingHorizontal: scale(20),
            flexDirection: 'row',
            gap: scale(20),
            justifyContent: 'space-around',
          }}>
          <Text
            size={18}
            weight={700}
            color="#808080"
            fontFamily="Montserrat-Bold">
            Email notification
          </Text>
          <View style={{justifyContent: 'center'}}>
            <Switch
              value={isEmailEnabled}
              onValueChange={() => {
                setEmailEnabled(!isEmailEnabled);
                dispatch({
                  type: UPDATE_CUSTOMER_SETTINGS,
                  payload: {
                    emailNotificationOn: !isEmailEnabled,
                    inAppNotificationOn: isNotificationEnabled,
                  },
                });
              }}
              backgroundActive="#E43D59"
              backgroundInactive="#9B9DA0"
              circleActiveColor="#FFBD28"
              circleInActiveColor="#808080"
              activeText=""
              inActiveText=""
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationSettings;
