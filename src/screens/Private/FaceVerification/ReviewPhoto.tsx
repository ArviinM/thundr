import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {Image} from 'expo-image';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from '../../../utils/utils.ts';
import {COLORS, SIZES} from '../../../constants/commons.ts';
import Button from '../../../components/shared/Button.tsx';
import {ChevronRightSmall} from '../../../assets/images/ChevronRightSmall.tsx';

type ReviewPhotoScreenRouteProp = RouteProp<
  RootNavigationParams,
  'ReviewPhoto'
>;

type ReviewPhotoProps = {
  route?: ReviewPhotoScreenRouteProp;
};

const ReviewPhoto = ({route}: ReviewPhotoProps) => {
  const {photoPath} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  if (!photoPath) {
    return (
      <View>
        <Text>There should be a photo passed here.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white}}
      edges={['right', 'left']}>
      {/* Add image here*/}
      <ScrollView style={{paddingHorizontal: scale(24)}}>
        <View
          style={{
            marginTop: scale(20),
            alignItems: 'center',
            flexDirection: 'row',
            gap: scale(8),
            justifyContent: 'center',
          }}>
          <Image
            source={
              'https://thundr-assets-dev.s3.ap-southeast-1.amazonaws.com/images/FaceVerificationReference.jpg'
            }
            style={styles.mainImage}
          />
          <Image
            source={
              Platform.OS === 'ios' ? photoPath : {uri: 'file://' + photoPath}
            }
            style={styles.mainImage}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            gap: scale(10),
            marginTop: scale(20),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              fontSize: scale(17),
              color: COLORS.black3,
              textAlign: 'center',
            }}>
            Review your photo!
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(12),
              color: COLORS.black2,
              textAlign: 'left',
            }}>
            We will compare your photo with your current profile pictures. Rest
            assured your data is safe, protected, and secure.
            {'\n'}
            {'\n'}
            With a verified profile, you are helping our community become a safe
            place for everyone!
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            gap: scale(10),
            marginVertical: scale(30),
          }}>
          <Button
            onPress={() => console.log('Will add integration next step')}
            text={'AGREE & SUBMIT'}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
          <Button
            onPress={() => navigation.navigate('TakeAPhoto')}
            text={'RETAKE MY PHOTO'}
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: COLORS.white,
                borderWidth: 2,
                borderColor: COLORS.black2,
              },
            ]}
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

export default ReviewPhoto;

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
