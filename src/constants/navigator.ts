import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNavigationContainerRef} from '@react-navigation/native';
export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();
export const navigationRef = createNavigationContainerRef();

export type RootNavigationParams = {
  Home: undefined;
  Login: undefined;
  LoginValidation: undefined;
  MobileValidation: undefined;
  Terms: {uri: string};
};
