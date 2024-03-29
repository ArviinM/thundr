import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef} from '@react-navigation/native';
export const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

export type RootNavigationParams = {
  Home: undefined;
  Login: undefined;
  MobileValidation: undefined;
};
