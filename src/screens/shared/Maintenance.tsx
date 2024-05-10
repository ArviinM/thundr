import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Text, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

const Maintenance = () => {
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
        <Text
          style={{
            fontFamily: 'ClimateCrisis-Regular',
            color: COLORS.primary1,
            fontSize: scale(30),
            marginHorizontal: scale(20),

            textAlign: 'center',
          }}>
          Thundr Maintenance
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.black,
            fontSize: scale(20),
            marginHorizontal: scale(60),
            marginVertical: 10,
            textAlign: 'center',
          }}>
          We'll be right back! ⛈️
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Maintenance;
