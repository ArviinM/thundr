import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, StatusBar, Text, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {useAuth} from '../../providers/Auth.tsx';

const WorkingInProgress = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signOut = async () => {
    isLoading(true);
    auth.signOut();
  };
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
        <Text style={{fontFamily: 'Montserrat-Bold', color: COLORS.black}}>
          Working in Progress by Tanders Team
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
