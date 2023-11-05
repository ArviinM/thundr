/**
 *
 * @format
 */

// React modules
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';

// Third party libraries
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../components/Image/Image';

// Utils
import {scale} from '../../utils/commons';
import MobileValidationScreen from '../../screens/public/MobileValidationScreen/MobileValidationScreen';
import MobileVerificationScreen from '../../screens/public/MobileVerificationScreen/MobileVerificationScreen';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import EmailValidationScreen from '../../screens/public/EmailValidationScreen/EmailValidationScreen';
import CreatePasswordScreen from '../../screens/public/CreatePasswordScreen/CreatePasswordScreen';
import EmailVerificationScreen from '../../screens/public/EmailVerificationScreen/EmailVerificationScreen';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const MobileAndEmailVerificationStack = () => {
  const {mobileEmailData} = useSelector(state => state.mobileEmail);
  const navigation = useNavigation();
  const renderBackIcon = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={GLOBAL_ASSET_URI.BACK_ICON}
          height={25}
          width={25}
          customStyle={{left: scale(20), justifyContent: 'center'}}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (mobileEmailData.message === 'SMS OTP Required.') {
    }
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="MobileValidationScreen"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: '#0D5176',
          shadowOpacity: 0,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: 19,
        },
        headerLeft: () => renderBackIcon(),
      }}>
      <Stack.Screen
        name="MobileValidationScreen"
        component={MobileValidationScreen}
      />
      <Stack.Screen
        name="MobileVerificationScreen"
        component={MobileVerificationScreen}
      />
      <Stack.Screen
        name="EmailValidationScreen"
        component={EmailValidationScreen}
      />
      <Stack.Screen
        name="EmailVerificationScreen"
        component={EmailVerificationScreen}
      />
      <Stack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default MobileAndEmailVerificationStack;
