import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';

import CircleButton from '../../../components/shared/CircleButton.tsx';
import {COLORS} from '../../../constants/commons.ts';

const CustomerPhotoBio = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);

  const schema = yup.object().shape({
    bio: yup.string().required('Mars, we need your bio!'),
    work: yup.string().required('Mars, any work will do!'),
    location: yup.string().required('Nako mars! We need your location po!'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    bio: string;
    work: string;
    location: string;
  }) => {
    try {
      await schema.validate(data);
      isLoading(true);
      console.log(data);
      // const result = await emailValidation.mutateAsync({
      //   phoneNumber: username,
      //   email: data.email,
      //   session: session,
      //   challengeName: challengeName,
      // } as EmailValidationRequest);

      isLoading(false);
      // navigation.navigate('EmailVerification', result);
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <StepProgressBar currentStep={3} totalSteps={6} />
      <KeyboardAwareScrollView
        bottomOffset={220}
        style={profileCreationStyles.flex}>
        <View style={profileCreationStyles.container}>
          <View style={profileCreationStyles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={profileCreationStyles.backButton}>
              <Image
                source={IMAGES.back}
                style={profileCreationStyles.backImage}
              />
            </TouchableOpacity>
          </View>
          <View style={profileCreationStyles.titleContainer}>
            <Text style={profileCreationStyles.textTitle}>Anything else?</Text>
            <Text style={profileCreationStyles.textSubtitle}>
              Last na promise! More chika pa.
            </Text>

            <View style={profileCreationStyles.bodyPhotoContainer}>
              {/* Photo Adding Container */}
              <View style={{alignItems: 'center', gap: 3}}>
                <TouchableOpacity>
                  <Image source={IMAGES.addPhoto} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.gray3,
                  }}>
                  Upload Photo - 8mb
                </Text>
              </View>

              {/* text input container for bio */}
              <View style={{marginVertical: 16}}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      // ref={textInputRef}
                      style={[
                        profileCreationStyles.textInput,
                        {minHeight: 120, maxHeight: 120},
                      ]}
                      keyboardType="default"
                      placeholder="Enter more about you!"
                      inputMode={'text'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      selectionColor={COLORS.primary1}
                      multiline={true}
                      maxLength={255}
                    />
                  )}
                  name="bio"
                />
                {errors.bio && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.bio.message}
                  </Text>
                )}
              </View>
              <View style={{marginVertical: 20}}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      // ref={textInputRef}
                      style={[profileCreationStyles.textInput]}
                      keyboardType="default"
                      placeholder="Add your work"
                      inputMode={'text'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      selectionColor={COLORS.primary1}
                      maxLength={255}
                    />
                  )}
                  name="work"
                />
                {errors.work && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.work.message}
                  </Text>
                )}
              </View>
              <View style={{marginVertical: 20}}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      // ref={textInputRef}
                      style={[profileCreationStyles.textInput]}
                      keyboardType="default"
                      placeholder="Location"
                      inputMode={'text'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      selectionColor={COLORS.primary1}
                      maxLength={255}
                    />
                  )}
                  name="location"
                />
                {errors.location && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.location.message}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View
          style={[
            profileCreationStyles.footerContainer,
            {justifyContent: 'flex-end'},
          ]}>
          <View>
            <CircleButton
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerPhotoBio;
