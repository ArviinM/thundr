// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import CustomSwitch from 'react-native-custom-switch-new';

// Components
import SettingsHeader from '../../../composition/SettingsHeader/SettingsHeader';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';

// Utils
import {scale, verticalScale} from '../../../utils/commons';

const SwitchComponent = props => {
  const {text, state, setState} = props;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: verticalScale(40),
        width: scale(300),
        borderRadius: 20,
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
        flexDirection: 'row',
        gap: scale(20),
        justifyContent: 'space-around',
      }}>
      <Text size={18} weight={700} color="#808080" fontFamily="Montserrat-Bold">
        {text}
      </Text>
      <View style={{justifyContent: 'center'}}>
        <CustomSwitch
          buttonColor={state ? '#FFBD28' : '#808080'}
          switchBackgroundColor={'#9B9DA0'}
          onSwitchBackgroundColor={'#E43D59'}
          buttonPadding={6}
          onSwitch={() => setState(true)}
          onSwitchReverse={() => setState(false)}
        />
      </View>
    </View>
  );
};

const NotificationSettings = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isEmailEnabled, setEmailEnabled] = useState(false);
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
        <SwitchComponent
          text="In-app notification"
          state={isNotificationEnabled}
          setState={setNotificationEnabled}
        />
        <Separator space={20} />
        <SwitchComponent
          text="Email notification"
          state={isEmailEnabled}
          setState={setEmailEnabled}
        />
      </View>
    </View>
  );
};

export default NotificationSettings;
