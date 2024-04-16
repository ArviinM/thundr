import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

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
import CustomDropdown from '../../../components/shared/Dropdown.tsx';

import {
  drinkingAndSmokingOptions,
  educationOptions,
  feetOptions,
  inchesOptions,
  petsOptions,
  politicsOptions,
  religionOptions,
  starSignOptions,
} from '../../../utils/dropdownOptions.ts';
import CircleButton from '../../../components/shared/CircleButton.tsx';
import useCustomerDetailsStore from '../../../store/detailsStore.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {CustomerDetailsRequest} from '../../../types/generated.ts';

const CustomerAdditionalInfos = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const auth = useAuth();
  const [loading, isLoading] = useState(false);
  const updateCustomerDetails = useCustomerDetailsStore(
    state => state.updateCustomerDetails,
  );

  const schema = yup.object().shape({
    feet: yup.string(),
    inches: yup.string(),
    starSign: yup.string(),
    education: yup.string(),
    drinking: yup.string(),
    smoking: yup.string(),
    religion: yup.string(),
    pet: yup.string(),
    politics: yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    feet?: string;
    inches?: string;
    starSign?: string;
    education?: string;
    drinking?: string;
    smoking?: string;
    religion?: string;
    pet?: string;
    politics?: string;
  }) => {
    try {
      await schema.validate(data);
      isLoading(true);

      const updatedData: Partial<CustomerDetailsRequest> = {};

      if (data.feet) {
        updatedData.height = `${data.feet} ${data.inches}`;
      }
      if (data.starSign) {
        updatedData.starSign = data.starSign;
      }
      if (data.education) {
        updatedData.education = data.education;
      }
      if (data.drinking) {
        updatedData.drinking = data.drinking;
      }
      if (data.smoking) {
        updatedData.smoking = data.smoking;
      }
      if (data.religion) {
        updatedData.religion = data.religion;
      }
      if (data.pet) {
        updatedData.pet = data.pet;
      }
      if (data.politics) {
        updatedData.politics = data.politics;
      }

      updateCustomerDetails(updatedData);

      isLoading(false);
      navigation.navigate('CustomerPersonalityType');
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
      <StepProgressBar currentStep={7} totalSteps={10} />
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
            <Text style={profileCreationStyles.textTitle}>More!</Text>
            <Text style={profileCreationStyles.textSubtitle}>
              Show off who you really are!
            </Text>

            <View style={profileCreationStyles.bodyDropdownContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flex: 1,
                  gap: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={[
                      profileCreationStyles.flex,
                      {flexDirection: 'column', gap: 3},
                    ]}>
                    <Text style={profileCreationStyles.dropdownTitle}>
                      Height
                    </Text>
                    <View style={profileCreationStyles.dropdownContainer2}>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={feetOptions}
                              placeholder="5'"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="feet"
                        />
                      </View>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={inchesOptions}
                              placeholder="11'"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="inches"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    profileCreationStyles.flex,
                    {flexDirection: 'column', gap: 3},
                  ]}>
                  <Text style={profileCreationStyles.dropdownTitle}>
                    Star Sign
                  </Text>
                  <View style={profileCreationStyles.dropdownContainer2}>
                    <View style={profileCreationStyles.dropdownSection}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({field: {onChange, value}}) => (
                          <CustomDropdown
                            data={starSignOptions}
                            placeholder="Sagitarrius"
                            value={value}
                            onChange={item => {
                              onChange(item.value);
                            }}
                          />
                        )}
                        name="starSign"
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flex: 1,
                  gap: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={[
                      profileCreationStyles.flex,
                      {flexDirection: 'column', gap: 3},
                    ]}>
                    <Text style={profileCreationStyles.dropdownTitle}>
                      Education
                    </Text>
                    <View style={profileCreationStyles.dropdownContainer2}>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={educationOptions}
                              placeholder="Doctorate"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="education"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flex: 1,
                  gap: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={[
                      profileCreationStyles.flex,
                      {flexDirection: 'column', gap: 3},
                    ]}>
                    <Text style={profileCreationStyles.dropdownTitle}>
                      Drinking
                    </Text>
                    <View style={profileCreationStyles.dropdownContainer2}>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={drinkingAndSmokingOptions}
                              placeholder="Ocassional"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="drinking"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    profileCreationStyles.flex,
                    {flexDirection: 'column', gap: 3},
                  ]}>
                  <Text style={profileCreationStyles.dropdownTitle}>
                    Smoking
                  </Text>
                  <View style={profileCreationStyles.dropdownContainer2}>
                    <View style={profileCreationStyles.dropdownSection}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({field: {onChange, value}}) => (
                          <CustomDropdown
                            data={drinkingAndSmokingOptions}
                            placeholder="Ocassional"
                            value={value}
                            onChange={item => {
                              onChange(item.value);
                            }}
                          />
                        )}
                        name="smoking"
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flex: 1,
                  gap: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={[
                      profileCreationStyles.flex,
                      {flexDirection: 'column', gap: 3},
                    ]}>
                    <Text style={profileCreationStyles.dropdownTitle}>
                      Religion
                    </Text>
                    <View style={profileCreationStyles.dropdownContainer2}>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={religionOptions}
                              placeholder="Christian"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="religion"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  flex: 1,
                  gap: 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View
                    style={[
                      profileCreationStyles.flex,
                      {flexDirection: 'column', gap: 3},
                    ]}>
                    <Text style={profileCreationStyles.dropdownTitle}>Pet</Text>
                    <View style={profileCreationStyles.dropdownContainer2}>
                      <View style={profileCreationStyles.dropdownSection}>
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({field: {onChange, value}}) => (
                            <CustomDropdown
                              data={petsOptions}
                              placeholder="Dog"
                              value={value}
                              onChange={item => {
                                onChange(item.value);
                              }}
                            />
                          )}
                          name="pet"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    profileCreationStyles.flex,
                    {flexDirection: 'column', gap: 3},
                  ]}>
                  <Text style={profileCreationStyles.dropdownTitle}>
                    Politics
                  </Text>
                  <View style={profileCreationStyles.dropdownContainer2}>
                    <View style={profileCreationStyles.dropdownSection}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({field: {onChange, value}}) => (
                          <CustomDropdown
                            data={politicsOptions}
                            placeholder="Conservative"
                            value={value}
                            onChange={item => {
                              onChange(item.value);
                            }}
                          />
                        )}
                        name="politics"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView offset={{closed: -20, opened: 0}}>
        <View style={profileCreationStyles.footerContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CustomerPersonalityType');
                updateCustomerDetails({
                  sub: auth.authData?.sub,
                });
              }}>
              <Text style={profileCreationStyles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View>
            <CircleButton
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerAdditionalInfos;
