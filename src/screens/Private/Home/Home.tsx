import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, StatusBar, Text, View} from 'react-native';
import {useState} from 'react';
import {useAuth} from '../../../providers/Auth.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {useGetMatchList} from '../../../hooks/useGetMatchList.ts';
import {Loading} from '../../../components/shared/Loading.tsx';

const Home = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  // TODO: For investigation
  console.log(auth.loading);
  if (auth.loading) {
    console.log('auth is loading');
  }
  console.log(auth.loading);

  console.log(auth.authData);
  const match = useGetMatchList(auth.authData?.sub);

  const signOut = async () => {
    isLoading(true);
    auth.signOut();
  };

  if (match.isLoading) {
    console.log('match is loading');
  }

  console.log(match.data);

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
        {/*<Text>Sign Out Screen</Text>*/}
        {/*{loading ? (*/}
        {/*  <ActivityIndicator color={'#000'} animating={true} size="small" />*/}
        {/*) : (*/}
        {/*  <Button title="Sign Out" onPress={signOut} />*/}
        {/*)}*/}
      </View>
    </SafeAreaView>
  );
};

export default Home;
