import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {COLORS} from '../../../constants/commons.ts';
import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {yupResolver} from '@hookform/resolvers/yup';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';
import useCustomerProfileStore from '../../../store/profileStore.ts';
import {useAuth} from '../../../providers/Auth.tsx';

const CustomerName = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);
  const auth = useAuth();
  const updateCustomerProfile = useCustomerProfileStore(
    state => state.updateCustomerProfile,
  );
  const [loading, isLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Nako mars, we need your name po!'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async (data: {name: string}) => {
    try {
      await schema.validate(data);
      isLoading(true);

      updateCustomerProfile({
        sub: auth.authData?.sub,
        name: data.name,
      });

      isLoading(false);
      navigation.navigate('CustomerBirthday');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaProvider>
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
                disabled={true}
                style={profileCreationStyles.backButton}>
                <Image
                  source={IMAGES.back}
                  style={[profileCreationStyles.backImage, {opacity: 0}]}
                />
              </TouchableOpacity>
            </View>
            <View style={profileCreationStyles.titleContainer}>
              <Text style={profileCreationStyles.textTitle}>
                What's your name, mars?
              </Text>

              <View style={profileCreationStyles.textInputContainer}>
                <View style={profileCreationStyles.textInputStyle}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        ref={textInputRef}
                        style={profileCreationStyles.textInput}
                        autoComplete="name"
                        keyboardType="default"
                        placeholder=""
                        inputMode={'text'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        selectionColor={COLORS.primary1}
                      />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text style={profileCreationStyles.errorText}>
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={profileCreationStyles.bodyContainer}>
                <Text style={profileCreationStyles.textBody}>
                  This is what appears on your profile. Let's make it official!
                  ✨
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={profileCreationStyles.buttonContainer}>
            <GradientButton
              onPress={handleSubmit(onSubmit)}
              text="Next"
              loading={loading}
              disabled={!isValid}
              buttonStyle={profileCreationStyles.buttonStyle}
              textStyle={profileCreationStyles.buttonTextStyle}
            />
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CustomerName;
