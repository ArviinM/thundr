import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, StatusBar, Text, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {useAuth} from '../../providers/Auth.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import LottieView from 'lottie-react-native';

const WorkingInProgress = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signOut = async () => {
    isLoading(true);
    auth.signOut();
  };

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
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
          <LottieView
            source={require('../../assets/animations/rawr_shark.json')}
            style={{
              width: 400,
              height: 400,
            }}
            autoPlay
            loop
          />
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.black,
            fontSize: 20,
            marginHorizontal: 50,
            textAlign: 'center',
          }}>
          Working in Progress{'\n'}Tanders, Inc.⚡️
        </Text>
        <View style={{margin: 20}}>
          {loading ? (
            <ActivityIndicator color={'#000'} animating={true} size="small" />
          ) : (
            <Button title="Sign Out" onPress={signOut} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkingInProgress;
