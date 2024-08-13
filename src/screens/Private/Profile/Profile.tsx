import React from 'react';
import {ActivityIndicator, Text, View, TouchableOpacity} from 'react-native';
import {useAuth} from '../../../providers/Auth.tsx';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
import {COLORS} from '../../../constants/commons.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import {scale} from '../../../utils/utils.ts';
import {Image} from 'expo-image';
import {calculateAge} from '../../../components/Home/utils.ts';
import {VerificationBadge} from '../../../assets/images/VerificationBadge.tsx';
import {truncateChatPreview} from '../Chat/chatUtils.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PencilIcon} from '../../../assets/images/PencilIcon.tsx';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationParams} from '../../../constants/navigator.ts';

const Profile = () => {
  const auth = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParams>>();

  const customerProfile = useGetCustomerProfile({
    sub: auth.authData?.sub || '',
  });

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: scale(16),
          paddingVertical: scale(16),
        }}>
        {customerProfile.isPending && customerProfile.isLoading ? (
          <ActivityIndicator animating={true} size={'small'} />
        ) : customerProfile.isRefetching ? (
          <Loading />
        ) : (
          customerProfile.data && (
            <View style={{backgroundColor: COLORS.white}}>
              {/* Customer Information Header */}
              <View style={{flexDirection: 'row', gap: scale(10)}}>
                <Image
                  source={{
                    uri: customerProfile.data.customerPhoto[0].photoUrl,
                  }}
                  style={{
                    height: scale(77),
                    width: scale(77),
                    borderRadius: scale(50),
                  }}
                />
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: scale(19),
                        color: COLORS.black,
                      }}>
                      {customerProfile.data.name},{' '}
                      {calculateAge(customerProfile.data.birthday)}
                    </Text>
                    <View style={{paddingHorizontal: scale(6)}}>
                      {customerProfile.data.faceVerificationState ===
                        'VERIFIED' && <VerificationBadge />}
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: scale(11),
                      color: COLORS.black,
                    }}>
                    {customerProfile.data.customerDetails.work},{' '}
                    {customerProfile.data.customerDetails.pronouns}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      fontSize: scale(13),
                      color: COLORS.black,
                    }}>
                    {truncateChatPreview(
                      customerProfile.data.customerDetails.bio,
                      36,
                    )}
                  </Text>
                  <View style={{paddingVertical: scale(6)}}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.push('EditProfile', customerProfile.data)
                      }
                      style={{
                        backgroundColor: COLORS.primary1,
                        width: scale(100),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: scale(6),
                        paddingHorizontal: scale(10),
                        paddingVertical: scale(2),
                        borderRadius: scale(7),
                      }}>
                      <PencilIcon />
                      <Text
                        style={{
                          color: COLORS.white,
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Edit profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;
