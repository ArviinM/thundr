import React, {useEffect, useState} from 'react';

import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image as ImageType} from 'react-native-image-crop-picker';

import CircleButton from '../../../components/shared/CircleButton.tsx';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useQueryClient} from '@tanstack/react-query';

import PhotoUpload from '../../../components/shared/PhotoUpload.tsx';
import {profileCreationStyles} from '../ProfileCreation/styles.tsx';
import InterestButtonContainer from '../../../components/CustomerInterest/InterestButtonContainer.tsx';
import CustomDropdown from '../../../components/shared/Dropdown.tsx';
import SelectableButton from '../../../components/CustomerPersonalityType/SelectableButton.tsx';

import {useUploadProfilePhoto} from '../../../hooks/profile/useUploadProfilePhoto.ts';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {COLORS, width} from '../../../constants/commons.ts';
import {personalityData} from '../../../components/CustomerPersonalityType/personalityData.ts';
import {interestOptions} from '../../../components/CustomerInterest/options.ts';
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
import {queryClient} from '../../../utils/queryClient.ts';
import {
  convertAbbreviationToWord,
  convertWordToAbbreviation,
  generateDayData,
  generateMonthData,
  generateYearData,
  moderateScale,
  parseFeetAndInches,
  scale,
  verticalScale,
} from '../../../utils/utils.ts';

import {CustomerDetailsRequest} from '../../../types/generated.ts';
import {useCreateCustomerDetails} from '../../../hooks/profile/useCreateCustomerDetails.ts';
import {useCreateCustomerProfile} from '../../../hooks/profile/useCreateCustomerProfile.ts';
import Toast from 'react-native-toast-message';
import LetterGradientButton from '../../../components/shared/LetterGradientButton.tsx';

type EditProfileScreenRouteProp = RouteProp<
  RootNavigationParams,
  'EditProfile'
>;

type EditProfileProps = {
  route?: EditProfileScreenRouteProp;
};

const EditProfile = ({route}: EditProfileProps) => {
  const inset = useSafeAreaInsets();

  const {
    sub,
    customerPhoto,
    customerDetails,
    name,
    hometown,
    gender,
    birthday,
  } = route?.params || {};

  const {mutateAsync} = useUploadProfilePhoto();
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const query = useQueryClient(queryClient);
  const currentCustomerInterest = customerDetails?.hobbies || '';
  const interestsArray = currentCustomerInterest.split(',');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<{
    index: number;
    text: string;
  }>({index: 0, text: customerDetails?.personalityType || ''});

  const [loading, isLoading] = useState(false);

  const updateDetails = useCreateCustomerDetails();
  const updateProfile = useCreateCustomerProfile();

  useEffect(() => {
    setSelectedInterests(interestsArray);
  }, [currentCustomerInterest]);

  const handleSelectionChange = (newSelectedOptions: string[]) => {
    setSelectedInterests(newSelectedOptions);
  };
  const handleSelectedPersonality = (index: number, text: string) => {
    setSelectedPersonality({index, text});
  };

  const handlePhotoUpload = async (
    image: ImageType,
    isPrimary: boolean,
    oldPhotoId?: number,
  ) => {
    if (sub) {
      const formData = new FormData();

      formData.append('sub', sub);
      formData.append('isPrimary', isPrimary); // Assuming primary photo upload
      formData.append('fileContentB64', image.data);
      formData.append('filename', image.path);

      if (oldPhotoId) {
        formData.append('oldPhotoId', oldPhotoId);
      }

      await mutateAsync(formData);
      await query.refetchQueries({queryKey: ['get-customer-profile']});
    }
  };

  const schema = yup.object().shape({
    name: yup.string().required('Mars, we need your name!'),
    month: yup.string().required('Nako mars, we need your birth month po!'),
    day: yup.string().required('Nako mars, we need your birth day po!'),
    year: yup.string().required('Nako mars, we need your birth year po!'),
    bio: yup.string().required('Mars, we need your bio!'),
    work: yup.string().required('Mars, any work will do!'),
    location: yup.string().required('Nako mars! We need your location po!'),
    selectedLetter: yup
      .string()
      .required('Nako mars, we need your chosen gender po!'),
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

  const {feet, inches} = parseFeetAndInches(customerDetails?.height);
  const [year, month, day] = birthday ? birthday.split('-') : ['', '', ''];
  const monthData = generateMonthData();
  const dayData = generateDayData();
  const yearData = generateYearData();
  const letters = ['L', 'G', 'B', 'T', 'Q', 'I', 'A', '+'];
  const [selectedLetter, setSelectedLetter] = useState(
    convertWordToAbbreviation(gender || ''),
  );

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: name,
      year: year,
      month: month,
      day: day,
      selectedLetter: convertWordToAbbreviation(gender || ''),
      bio: customerDetails?.bio || '',
      work: customerDetails?.work || '',
      location: customerDetails?.location || '',
      feet: feet || '',
      inches: inches || '',
      starSign: customerDetails?.starSign || '',
      education: customerDetails?.education || '',
      drinking: customerDetails?.drinking || '',
      smoking: customerDetails?.smoking || '',
      religion: customerDetails?.religion || '',
      pet: customerDetails?.pet || '',
      politics: customerDetails?.politics || '',
    },
  });

  const onSubmit = async (data: {
    bio: string;
    work: string;
    location: string;
    name: string;
    year: string;
    month: string;
    day: string;
    selectedLetter: string;
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
      isLoading(true);
      const updatedData: Partial<CustomerDetailsRequest> = {};
      // const gender = convertAbbreviationToWord(selectedLetter);

      if (data.feet && data.inches) {
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
      if (selectedInterests) {
        updatedData.hobbies = selectedInterests.toString();
      }
      if (selectedPersonality) {
        updatedData.personalityType = selectedPersonality?.text;
      }

      if (sub) {
        await updateDetails.mutateAsync({
          ...updatedData,
          sub: sub,
          work: data.work,
          location: data.location,
          bio: data.bio,
        });
      }

      if (sub && gender && birthday) {
        await updateProfile.mutateAsync({
          sub: sub,
          name: data.name,
          gender: convertAbbreviationToWord(selectedLetter),
          hometown: 'None',
          birthday: `${data.year}-${data.month}-${data.day}`,
        });
      }

      await query.invalidateQueries({queryKey: ['get-customer-profile']});

      Toast.show({
        type: 'THNRSuccess',
        props: {title: 'Your profile has been successfully updated!'},
        position: 'top',
        topOffset: inset.top + 10,
      });
      navigation.navigate('Profile');

      isLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left']}>
      <ScrollView style={{flex: 1, backgroundColor: COLORS.white}}>
        <View>
          <View style={styles.container}>
            <View>
              {customerPhoto && customerPhoto[0] ? (
                <PhotoUpload
                  photoData={customerPhoto[0]}
                  onPhotoUpload={image =>
                    handlePhotoUpload(image, true, customerPhoto[0]?.id)
                  }
                  imageWidth={scale(140)}
                  imageHeight={scale(200)}
                />
              ) : (
                <PhotoUpload
                  photoData={null}
                  onPhotoUpload={image => handlePhotoUpload(image, true)}
                  imageWidth={scale(140)}
                  imageHeight={verticalScale(170)}
                />
              )}
            </View>
            <View style={styles.subPhotosContainer}>
              {[...Array(4)].map((_, index) => (
                <PhotoUpload
                  key={index}
                  photoData={customerPhoto && customerPhoto[index + 1]}
                  onPhotoUpload={image =>
                    handlePhotoUpload(
                      image,
                      false,
                      customerPhoto?.[index + 1]?.id,
                    )
                  }
                  imageWidth={scale(90)}
                  imageHeight={scale(90)}
                  isSubPhoto
                />
              ))}
            </View>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTextStyle}>Name</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    // ref={textInputRef}
                    style={[profileCreationStyles.textInputBioWork]}
                    keyboardType="default"
                    placeholder="Name"
                    placeholderTextColor={COLORS.gray3}
                    inputMode={'text'}
                    autoComplete={'name'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    selectionColor={COLORS.primary1}
                    maxLength={255}
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

            <View style={{paddingVertical: 10}}>
              <Text style={styles.inputTextStyle}>Birthday</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 6,
                }}>
                <View style={profileCreationStyles.dropdownSection}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                      <CustomDropdown
                        data={monthData}
                        placeholder="MM"
                        value={value}
                        onChange={item => {
                          onChange(item.value);
                        }}
                      />
                    )}
                    name="month"
                  />
                  {errors.month && (
                    <Text style={profileCreationStyles.errorText}>
                      {errors.month.message}
                    </Text>
                  )}
                </View>
                <View style={profileCreationStyles.dropdownSection}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                      <CustomDropdown
                        data={dayData}
                        placeholder="DD"
                        value={value}
                        onChange={item => {
                          onChange(item.value);
                        }}
                      />
                    )}
                    name="day"
                  />
                  {errors.day && (
                    <Text style={profileCreationStyles.errorText}>
                      {errors.day.message}
                    </Text>
                  )}
                </View>
                <View style={profileCreationStyles.dropdownSection}>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                      <CustomDropdown
                        data={yearData}
                        placeholder="YYYY"
                        value={value}
                        onChange={item => {
                          onChange(item.value);
                        }}
                      />
                    )}
                    name="year"
                  />
                  {errors.year && (
                    <Text style={profileCreationStyles.errorText}>
                      {errors.year.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={{paddingVertical: 10}}>
              <Text style={styles.inputTextStyle}>Gender</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                }}>
                {letters.map((letter, index) => (
                  <Controller
                    key={index}
                    control={control}
                    name="selectedLetter" // Use a single name
                    render={({field: {onChange}}) => (
                      <LetterGradientButton
                        letter={letter}
                        selectedLetter={selectedLetter}
                        onChange={(item: string) => {
                          onChange(item);
                          setSelectedLetter(item);
                        }}
                      />
                    )}
                  />
                ))}
                {errors.selectedLetter && (
                  <Text style={profileCreationStyles.errorText}>
                    {errors.selectedLetter.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTextStyle}>About Me</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={[profileCreationStyles.textInputBio]}
                    keyboardType="default"
                    placeholder="Enter more about you"
                    placeholderTextColor={COLORS.gray3}
                    inputMode={'text'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    selectionColor={COLORS.primary1}
                    multiline={true}
                    maxLength={255}
                    textAlignVertical={'top'}
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
            <View style={styles.inputContainer}>
              <Text style={styles.inputTextStyle}>Work</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    // ref={textInputRef}
                    style={[profileCreationStyles.textInputBioWork]}
                    keyboardType="default"
                    placeholder="Add your work"
                    placeholderTextColor={COLORS.gray3}
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
            <View style={styles.inputContainer}>
              <Text style={styles.inputTextStyle}>Location</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    // ref={textInputRef}
                    style={[profileCreationStyles.textInputBioWork]}
                    keyboardType="default"
                    placeholder="Location"
                    placeholderTextColor={COLORS.gray3}
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
            <View>
              <Text style={styles.inputTextStyle}>My Interest</Text>
              <View>
                <InterestButtonContainer
                  options={interestOptions}
                  onSelectionChange={handleSelectionChange}
                  selectedOptions={selectedInterests}
                />
              </View>
            </View>
            <View style={styles.bodyDropdownContainer}>
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
                    <Text style={styles.inputTextStyle}>Height</Text>
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
                  <Text style={styles.inputTextStyle}>Star Sign</Text>
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
                    <Text style={styles.inputTextStyle}>Education</Text>
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
                    <Text style={styles.inputTextStyle}>Drinking</Text>
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
                  <Text style={styles.inputTextStyle}>Smoking</Text>
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
                    <Text style={styles.inputTextStyle}>Religion</Text>
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
                    <Text style={styles.inputTextStyle}>Pet</Text>
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
                  <Text style={styles.inputTextStyle}>Politics</Text>
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
            <View style={{gap: 10, marginBottom: 100}}>
              <Text style={styles.inputTextStyle}>Personality Type</Text>
              <SelectableButton
                buttonData={personalityData}
                onPress={handleSelectedPersonality}
                customerPersonality={customerDetails?.personalityType || ''}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <CircleButton
          onPress={handleSubmit(onSubmit)}
          isCheck
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 16, // Adjust the distance from the bottom as needed
    right: 16, // Adjust the distance from the right as needed
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Add elevation for shadow (Android)
  },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
  },
  primaryImage: {
    width: 157,
    height: 244,
    borderRadius: 20,
  },
  subPhotosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width / 1.77,
    marginHorizontal: 6,
    justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  subImage: {
    width: 117,
    height: 117,
    borderRadius: 20,
    marginBottom: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  mainContainer: {marginHorizontal: 20, gap: 10},
  inputContainer: {},
  inputTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: moderateScale(20),
    color: COLORS.primary1,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  bodyDropdownContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
    gap: 22,
  },
});

export default EditProfile;
