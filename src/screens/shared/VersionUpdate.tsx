import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Text, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';
import {MaintenanceImage} from '../../assets/images/MaintenanceImage.tsx';
import {VersionUpdateImage} from '../../assets/images/VersionUpdateImage.tsx';

const VersionUpdate = () => {
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
        <View>
          <VersionUpdateImage />
        </View>
        <Text
          style={{
            fontFamily: 'ClimateCrisis-Regular',
            color: COLORS.primary1,
            fontSize: scale(20),
            marginHorizontal: scale(20),

            textAlign: 'center',
          }}>
          Time to Update!
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.black,
            fontSize: scale(12),
            marginHorizontal: scale(30),
            marginVertical: 10,
            textAlign: 'center',
          }}>
          A new version is released, we added new features and fix some bugs to
          make your experience as smooth as possible
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default VersionUpdate;
