/**
 *
 * @format
 */

// React modules
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Third party libraries
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';

// Components
import Image from '../../components/Image/Image';

// Utils
import {scale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {useDispatch, useSelector} from 'react-redux';
import {START_LOGOUT} from '../../ducks/Login/actionTypes';
import AdvocacyScreen from '../../screens/private/AdvocacyScreen/AdvocacyScreen';
import AdvocacyInformationScreen from '../../screens/private/AdvocacyInformationScreen/AdvocacyInformationScreen';
import AdvocacyTransaction from '../../screens/private/AdvocacyTransaction/AdvocacyTransaction';
import AdvocacyResult from '../../screens/private/AdvocacyResult/AdvocacyResult';

const Stack = createStackNavigator();

const AdvocacyStack = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const renderBackIcon = shouldLogout => {
    return (
      <TouchableOpacity
        onPress={() =>
          shouldLogout ? dispatch({type: START_LOGOUT}) : navigation.goBack()
        }>
        <Image
          source={GLOBAL_ASSET_URI.BACK_ICON}
          height={25}
          width={25}
          customStyle={{left: scale(20), justifyContent: 'center'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="AdvocacyScreen"
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
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
      <Stack.Screen name="AdvocacyScreen" component={AdvocacyScreen} />
      <Stack.Screen
        name="AdvocacyInformationScreen"
        component={AdvocacyInformationScreen}
      />
      <Stack.Screen
        name="AdvocacyTransaction"
        component={AdvocacyTransaction}
      />
      <Stack.Screen name="AdvocacyResult" component={AdvocacyResult} />
    </Stack.Navigator>
  );
};

export default AdvocacyStack;
