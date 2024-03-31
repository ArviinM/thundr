import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, StatusBar, Text, View} from 'react-native';
import {useAuth} from '../../../providers/Auth.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {useGetMatchList} from '../../../hooks/useGetMatchList.ts';

const Home = () => {
  const auth = useAuth();
  if (auth.loading) {
    console.log('auth is loading');
  }

  const match = useGetMatchList(auth.authData?.sub);

  if (match.isLoading) {
    console.log('match is loading');
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'yellow'}}
      edges={['right', 'left']}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Text>My username: {auth.authData?.username}</Text>
        <Text>My sub: {auth.authData?.sub}</Text>
        <Text>
          Match Data{' '}
          {match.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text>
              test {match.data && match.data[0].percent}{' '}
              {match.data && match.data[0].sub}
            </Text>
          )}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
