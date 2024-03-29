import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {useState} from 'react';
import {useAuth} from '../../../providers/Auth.tsx';

const Home = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const signOut = async () => {
    isLoading(true);
    auth.signOut();
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'yellow'}}
      edges={['right', 'bottom', 'left']}>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <Text>Sign Out Screen</Text>
        {loading ? (
          <ActivityIndicator color={'#000'} animating={true} size="small" />
        ) : (
          <Button title="Sign Out" onPress={signOut} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
