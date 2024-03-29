import React, {useEffect, useRef} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';

const MobileValidation = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  // TODO: Move to stylesheet
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{backgroundColor: COLORS.white, flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={{flex: 0.1, marginTop: 32, marginLeft: 14}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{width: 30, alignItems: 'flex-start'}}>
                <Image source={IMAGES.back} style={{alignSelf: 'flex-start'}} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.9, marginHorizontal: 30}}>
              <Text
                style={{
                  fontSize: SIZES.h1,
                  fontFamily: 'Montserrat-Bold',
                  letterSpacing: -0.6,
                  color: COLORS.black,
                }}>
                Hello Sis!
              </Text>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.gray,
                  letterSpacing: -0.6,
                }}>
                Can we get your number?
              </Text>
              <View
                style={{
                  marginTop: 100,
                  marginBottom: 50,
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '23%',
                  }}>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontSize: SIZES.h2,
                      fontFamily: 'Montserrat-Medium',
                      marginTop: -10,
                    }}>
                    +63{' '}
                  </Text>
                  <Text style={{color: COLORS.black}}>_________</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: -10,
                    marginLeft: 16,
                  }}>
                  <TextInput
                    ref={textInputRef}
                    style={{
                      backgroundColor: 'white',
                      fontSize: SIZES.h2,
                      fontFamily: 'Montserrat-Medium',
                    }}
                    maxLength={10}
                    placeholder="XXX XXXX XXX"
                    inputMode={'numeric'}
                  />
                  <Text style={{color: COLORS.black}}>
                    ____________________________
                  </Text>
                </View>
              </View>
              <View style={{marginRight: 30}}>
                <Text
                  style={{
                    fontSize: SIZES.h4,
                    fontFamily: 'Montserrat-SemiBold',
                    color: COLORS.gray,
                    letterSpacing: -0.6,
                  }}>
                  Mag-text kami sa’yo sis to verify that you’re really you.
                  Paalala na huwag i-share ang iyong OTP.
                </Text>
              </View>
            </View>
            <View style={{marginHorizontal: 30, alignItems: 'center'}}>
              <GradientButton
                onPress={() => console.log('test')}
                text="NEXT"
                buttonStyle={{
                  alignItems: 'center',
                  maxWidth: width,
                  width: width - 64,
                  height: 50,
                  justifyContent: 'center',
                  borderRadius: 30,
                  marginBottom: 12,
                }}
                textStyle={{
                  letterSpacing: -0.4,
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.white,
                  fontSize: SIZES.h3,
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default MobileValidation;
