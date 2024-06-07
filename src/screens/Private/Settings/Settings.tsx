import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
import {scale} from '../../../utils/utils.ts';

import CustomSwitch from '../../../components/shared/CustomSwitch.tsx';
import {ForwardIcon} from '../../../assets/images/ForwardIcon.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import DeviceInfo from 'react-native-device-info';
import DeactivateModal from '../../../components/shared/DeactivateModal.tsx';
import {useDeactivateAccount} from '../../../hooks/deactivate/useDeactivateAccount.ts';

const Settings = () => {
  const auth = useAuth();
  const userProfile = useGetCustomerProfile({sub: auth.authData?.sub || ''});
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [inAppNotification, setInAppNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);

  if (userProfile.isLoading && auth.loading) {
    return <Loading />;
  }

  const handleTermsPress = (isTerms: boolean) => {
    if (isTerms) {
      navigation.navigate('Terms', {
        uri: 'https://thundr.ph/terms-and-condition/',
        isAuthenticated: true,
      });
    } else {
      navigation.navigate('Terms', {
        uri: 'https://thundr.ph/privacy-policy/',
        isAuthenticated: true,
      });
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.subtitle}>
              Manage your account with the options below
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.rowStyle, {marginTop: 20}]}
            onPress={() =>
              navigation.navigate('PasswordNewValidation', {
                isAuthenticated: true,
              })
            }>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Change Password
            </Text>
            <ForwardIcon />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rowStyle]}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Manage Subscriptions
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowStyle]}
            onPress={() => navigation.navigate('CustomerDeactivate')}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Deactivate Account
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>
              Turning this off might mean you miss alerts
            </Text>
          </View>
          <View style={[styles.rowStyle, {marginTop: 20}]}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              In-app notification
            </Text>
            <CustomSwitch
              value={inAppNotification}
              onValueChange={setInAppNotification}
            />
          </View>
          <View style={styles.rowStyle}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Email notification
            </Text>
            <CustomSwitch
              value={emailNotification}
              onValueChange={setEmailNotification}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Other</Text>
          </View>
          <TouchableOpacity
            style={[styles.rowStyle, {marginTop: 20}]}
            onPress={() => handleTermsPress(true)}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Terms & Conditions
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowStyle]}
            onPress={() => handleTermsPress(false)}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Privacy Policy
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowStyle]}
            onPress={() =>
              navigation.navigate('Terms', {
                uri: 'https://thundr.ph/#support',
                isAuthenticated: true,
              })
            }>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
              }}>
              Contact Us
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
              textAlign: 'center',
            }}>
            Thundr PH v.{DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()}
            )
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    flex: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    // backgroundColor: '#fff',
  },
  profileImage: {
    height: scale(70),
    width: scale(70),
    borderRadius: 10,
    paddingBottom: 10,
  },
  profileName: {
    // paddingVertical: 6,
    paddingTop: 10,
    fontFamily: 'Montserrat-Black',
    fontSize: scale(16),
    color: COLORS.primary1,
  },
  profileEmail: {
    // paddingVertical: 2,
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(13),
    color: COLORS.gray4,
  },
  title: {
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(16),
  },
  subtitle: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(12),
  },
  rowStyle: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: scale(10),
  },
  container: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingVertical: scale(20),
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.gray2,
  },
});
