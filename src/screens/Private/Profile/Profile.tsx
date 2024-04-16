import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useAuth} from '../../../providers/Auth.tsx';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useEffect} from 'react';
import ProfileCard from '../../../components/Home/ProfileCard.tsx';

const Profile = () => {
  const auth = useAuth();
  const sub = auth.authData?.sub;

  const customerProfile = useGetCustomerProfile({sub: sub || ''});

  useEffect(() => {
    if (customerProfile.isPending && customerProfile.isLoading) {
      console.log(customerProfile.isPending);
      console.log(customerProfile.isLoading);
    } else {
      console.log(customerProfile.data);
    }
  }, [
    customerProfile.data,
    customerProfile.isLoading,
    customerProfile.isPending,
  ]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left']}>
      <View style={{flex: 1, margin: 6}}>
        {customerProfile.isPending && customerProfile.isLoading ? (
          <ActivityIndicator animating={true} size={'small'} />
        ) : (
          customerProfile.data && (
            <ProfileCard
              user={{sub: '', percent: '', customerData: customerProfile.data}}
              isUser={true}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
