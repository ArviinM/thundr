import React, {useState} from 'react';
import {
  initialWindowMetrics,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';
import {useGetCustomerProfile} from '../../../hooks/profile/useGetCustomerProfile.ts';
import {scale} from '../../../utils/utils.ts';

import CustomSwitch from '../../../components/shared/CustomSwitch.tsx';
import {ForwardIcon} from '../../../assets/images/ForwardIcon.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import GenericModal from '../../../components/shared/GenericModal.tsx';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {API_PAYMENT_URL} from '@env';
import Button from '../../../components/shared/Button.tsx';
import {useHandoffSession} from '../../../hooks/auth/useHandoffSession.ts';
import useSubscribeCheck from '../../../store/subscribeStore.ts';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const Settings = () => {
  const auth = useAuth();
  const userProfile = useGetCustomerProfile({sub: auth.authData?.sub || ''});
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [inAppNotification, setInAppNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(false);
  const [visible, isVisible] = useState<boolean>(false);
  const [loading, isLoading] = useState(false);

  const {authData, signOut} = useAuth();
  const handoffKey = useHandoffSession();

  const isSubscribe = useSubscribeCheck(state => state.isCustomerSubscribed);

  const statusBarHeight = initialWindowMetrics?.insets.top || 20;
  const tabBarHeight = useBottomTabBarHeight();

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
      <GenericModal
        isVisible={visible}
        content={
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                fontFamily: 'ClimateCrisis-Regular',
                fontSize: scale(20),
                textAlign: 'center',
                color: COLORS.primary1,
              }}>
              Hi, Mars!
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(12),
                textAlign: 'center',
                color: COLORS.black,
              }}>
              You're about to leave the app to manage your subscriptions to our
              website.
            </Text>
            <View>
              <GradientButton
                onPress={async () => {
                  if (API_PAYMENT_URL && authData) {
                    const result = await handoffKey.mutateAsync({
                      sub: authData?.sub,
                      session: authData.accessToken,
                    });

                    await Linking.openURL(
                      `${API_PAYMENT_URL}/auth/handoff?key=${result.key}`,
                    );
                    isVisible(false);
                  }
                }}
                text="Proceed"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                loading={handoffKey.isPending}
              />
              <Button
                onPress={() => {
                  isVisible(false);
                }}
                text="Cancel"
                buttonStyle={styles.buttonStyle2}
                textStyle={styles.buttonTextStyle2}
              />
            </View>
          </View>
        }
      />
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
                color: COLORS.black,
              }}>
              Change Password
            </Text>
            <ForwardIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rowStyle]}
            onPress={() => {
              if (!isSubscribe) {
                return Toast.show({
                  type: 'THNRInfo',
                  props: {
                    title: 'Hi mars!',
                    subtitle:
                      'You can only manage your subscriptions if you are subscribed! 🫶',
                  },
                  position: 'top',
                  topOffset: statusBarHeight,
                });
              } else {
                isVisible(true);
              }
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: scale(14),
                color: COLORS.black,
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
                color: COLORS.black,
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
                color: COLORS.black,
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
                color: COLORS.black,
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
                color: COLORS.black,
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
                color: COLORS.black,
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
                color: COLORS.black,
              }}>
              Contact Us
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scale(10),
          }}>
          <Button
            onPress={() => {
              isLoading(true);
              signOut();
            }}
            text="Log out"
            buttonStyle={{
              backgroundColor: '#ebebeb',
              paddingVertical: scale(12),
              paddingHorizontal: scale(120),
              borderRadius: 40,
            }}
            textStyle={{fontFamily: 'Montserrat-Medium', fontSize: scale(14)}}
            loading={loading}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: scale(10),
            paddingBottom: tabBarHeight + 20,
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
  buttonStyle: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
  },
  buttonTextStyle: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  buttonStyle2: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
    backgroundColor: COLORS.gray2,
  },
  buttonTextStyle2: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.gray4,
    fontSize: SIZES.h5,
  },
});
