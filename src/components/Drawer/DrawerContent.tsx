import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import DrawerItem from './DrawerItem.tsx';
import {IMAGES} from '../../constants/images.ts';
import {scale} from '../../utils/utils.ts';
import useDrawerStore from '../../store/drawerStore.ts';

const DrawerContent = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const insets = useSafeAreaInsets();
  const isSelected = useDrawerStore(state => state.isSelected);
  const setIsSelected = useDrawerStore(state => state.setIsSelected);

  const handleDrawerItemClick = (label: string) => {
    setIsSelected(label === isSelected ? false : label);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingHorizontal: scale(20),
        backgroundColor: '#EDEDED',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#EDEDED',
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer)}>
          <Image
            source={IMAGES.menu}
            style={{height: scale(24), width: scale(24)}}
          />
        </TouchableOpacity>
        <Image
          source={IMAGES.thundrHorizontal}
          style={{height: scale(24), width: scale(100), marginLeft: scale(20)}}
          resizeMode={'contain'}
        />
      </View>
      <View style={{flexDirection: 'column', gap: 14}}>
        <View style={{marginTop: scale(30)}}>
          <DrawerItem
            label="Home"
            onPress={() => {
              handleDrawerItemClick('Home');
              navigation.navigate('HomeTab');
            }}
            icon={'thundrHomeDrawer'}
            isSelected={isSelected === 'Home'}
          />
        </View>
        <DrawerItem
          label="Thundr Bolt"
          onPress={() => {
            handleDrawerItemClick('Thundr Bolt');
            navigation.navigate('ThundrBolt');
          }}
          icon={'thundrBoltDrawer'}
          isSelected={isSelected === 'Thundr Bolt'}
        />
        <DrawerItem
          label="Thundr Machi"
          onPress={() => {
            handleDrawerItemClick('Thundr Machi');
            navigation.navigate('ThundrMachi');
          }}
          icon={'thundrMachiDrawer'}
          isSelected={isSelected === 'Thundr Machi'}
        />
        <DrawerItem
          label="Settings"
          onPress={() => {
            handleDrawerItemClick('Settings');
            navigation.navigate('Settings');
          }}
          icon={'settings'}
          isSelected={isSelected === 'Settings'}
        />
      </View>
    </View>
  );
};

export default DrawerContent;
