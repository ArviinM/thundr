import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, View} from 'react-native';
import {useAuth} from '../../../providers/Auth.tsx';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';

import ProfileCard from '../../../components/Home/ProfileCard.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {Loading} from '../../../components/shared/Loading.tsx';

const Profile = () => {
  const auth = useAuth();

  const customerProfile = useGetCustomerProfile({
    sub: auth.authData?.sub || '',
  });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <View style={{flex: 1, margin: 6, backgroundColor: COLORS.white}}>
        {customerProfile.isPending && customerProfile.isLoading ? (
          <ActivityIndicator animating={true} size={'small'} />
        ) : customerProfile.isRefetching ? (
          <Loading />
        ) : (
          customerProfile.data && (
            <View style={{borderRadius: 15, backgroundColor: COLORS.gray2}}>
              <ProfileCard
                user={{
                  sub: '',
                  percent: '',
                  customerData: customerProfile.data,
                }}
                isUser={true}
              />
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
