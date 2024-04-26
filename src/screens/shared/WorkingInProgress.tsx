import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, StatusBar, Text, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {useAuth} from '../../providers/Auth.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import LottieView from 'lottie-react-native';
import {Wip} from '../../assets/images/Wip.tsx';

const WorkingInProgress = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Wip />
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.primary1,
            fontSize: 20,
            marginHorizontal: 60,
            marginVertical: 30,
            textAlign: 'center',
          }}>
          Oops! Wait lang, mars. {'\n'} This feature will be available soon
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WorkingInProgress;
