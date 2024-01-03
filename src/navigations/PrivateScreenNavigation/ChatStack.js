/**
 *
 * @format
 */

// React modules
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Third party libraries
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../components/Image/Image';
import ChatScreen from '../../screens/private/ChatScreen/ChatScreen';
import ChatmateProfile from '../../screens/private/ChatmateProfile/ChatmateProfile';
import Messages from '../../screens/private/Messages/Messages';

// Utils
import {scale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import {useDispatch} from 'react-redux';
import {START_LOGOUT} from '../../ducks/Login/actionTypes';

const Stack = createStackNavigator();

const ChatStack = () => {
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
      initialRouteName="Messages"
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
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatmateProfile" component={ChatmateProfile} />
    </Stack.Navigator>
  );
};

export default ChatStack;
