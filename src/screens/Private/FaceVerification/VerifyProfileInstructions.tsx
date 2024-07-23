import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import Button from '../../../components/shared/Button.tsx';
import {scale} from '../../../utils/utils.ts';
import {ChevronLeftSmall} from '../../../assets/images/ChevronLeftSmall.tsx';
import {ChevronRightSmall} from '../../../assets/images/ChevronRightSmall.tsx';
import {Image} from 'expo-image';

const VerifyProfileInstructions = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      <ScrollView style={{paddingHorizontal: scale(36)}}>
        <View style={{marginTop: scale(20), alignItems: 'center'}}>
          <Image
            source={
              'https://thundr-assets-dev.s3.ap-southeast-1.amazonaws.com/images/FaceVerificationReference.jpg'
            }
            style={styles.mainImage}
          />
        </View>
        <View style={{flexDirection: 'column', gap: 4, marginTop: scale(10)}}>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              fontSize: scale(17),
              color: COLORS.black3,
              textAlign: 'center',
            }}>
            Say cheese!
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(12),
              color: COLORS.black2,
              textAlign: 'center',
            }}>
            This photo is for verification only{'\n'}
            and will not be uploaded in your profile.
          </Text>
        </View>
        <View style={{marginVertical: scale(26), gap: scale(2)}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            To verify:
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Make sure that your entire face is visible. Take your photo in a
            well-lit area.
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Remove any eyewear (sunglasses or eyeglasses).
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(12),
              color: COLORS.black3,
            }}>
            • Your face must be visible in at least the first three photos in
            your profile.
          </Text>
        </View>
        <View style={{alignItems: 'center', gap: scale(10)}}>
          <Button
            onPress={() => navigation.navigate('TakeAPhoto')}
            text={'TAKE MY PHOTO'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
          <Button
            onPress={() => navigation.navigate('ProfileStack')}
            text={'CHANGE MY PROFILE PICTURES'}
            buttonStyle={[styles.buttonStyle, {backgroundColor: COLORS.white2}]}
            textStyle={[styles.buttonTextStyle, {color: COLORS.black2}]}
          />
        </View>
        <View
          style={{
            marginVertical: scale(20),
            marginHorizontal: scale(10),
            gap: scale(6),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(9),
              color: COLORS.black3,
              textAlign: 'center',
            }}>
            Learn more about how we use, and protect your personal data.
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.black3,
            }}
            onPress={() =>
              navigation.navigate('Terms', {
                uri: 'https://thundr.ph/privacy-policy/',
                isAuthenticated: true,
              })
            }>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(11),
                color: COLORS.black3,
              }}>
              Privacy Policy
            </Text>
            <ChevronRightSmall />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.black3,
            }}
            onPress={() =>
              navigation.navigate('Terms', {
                uri: 'https://thundr.ph/#support',
                isAuthenticated: true,
              })
            }>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(11),
                color: COLORS.black3,
              }}>
              Contact Customer Support
            </Text>
            <ChevronRightSmall />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyProfileInstructions;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.primary1,
  },
  buttonTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  mainImage: {
    width: scale(157),
    height: scale(194),
    borderRadius: 20,
  },
});
