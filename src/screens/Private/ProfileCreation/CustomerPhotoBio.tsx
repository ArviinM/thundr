import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';

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
import useCustomerDetailsStore from '../../../store/detailsStore.ts';
import useCustomerProfileStore from '../../../store/profileStore.ts';
import {useCreateCustomerDetails} from '../../../hooks/profile/useCreateCustomerDetails.ts';
import {useUploadProfilePhoto} from '../../../hooks/profile/useUploadProfilePhoto.ts';
import {MAX_IMAGE_SIZE_BYTES} from '../../../utils/utils.ts';
import Toast from 'react-native-toast-message';

const CustomerPhotoBio = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);
  const [imageUploaded, isUploadingImage] = useState(false);
  const [imageData, setImageData] = useState<ImageType | null>(null);
  const updateCustomerDetails = useCustomerDetailsStore(
    state => state.updateCustomerDetails,
  );
  const customerDetails = useCustomerDetailsStore(
    state => state.customerDetails,
  );
  const customerProfile = useCustomerProfileStore(
    state => state.customerProfile,
  );
  const {mutateAsync} = useUploadProfilePhoto();

  const createDetails = useCreateCustomerDetails();

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

  const handlePhotoUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (image.size >= MAX_IMAGE_SIZE_BYTES) {
        Toast.show({
          type: 'THNRError',
          props: {title: 'Limit upload up to 8mb per photo'},
          position: 'top',
          topOffset: 80,
        });
        throw new Error(
          'Image exceeds maximum size limit. Please select a smaller image.',
        );
      }

      setImageData(image);
      isUploadingImage(true);

      if (customerDetails) {
        const formData = new FormData();

        formData.append('sub', customerDetails.sub);
        formData.append('isPrimary', 'true');
        formData.append('fileContentB64', image?.data);
        formData.append('filename', image?.path);

        await mutateAsync(formData);
        Toast.show({
          type: 'THNRSuccess',
          props: {title: 'Photo Upload Success! ✅'},
          position: 'top',
          topOffset: 80,
        });
        isUploadingImage(false);
      }
    } catch (e) {
      console.error(e);
      isUploadingImage(false);
      throw e;
    }
  };

  const onSubmit = async (data: {
    bio: string;
    work: string;
    location: string;
  }) => {
    try {
      await schema.validate(data);
      isLoading(true);
      console.log(data);

      updateCustomerDetails({
        bio: data.bio,
        work: data.work,
        location: data.location,
      });

      if (customerDetails) {
        await createDetails.mutateAsync({
          ...customerDetails,
          bio: data.bio,
          work: data.work,
          location: data.location,
        });
        isLoading(false);
        navigation.navigate('Onboarding');
      }
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
      isLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={profileCreationStyles.container}>
      <StepProgressBar currentStep={9} totalSteps={10} />
      <KeyboardAwareScrollView
        bottomOffset={100}
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
              <View style={{alignItems: 'center', gap: 3, marginBottom: 20}}>
                <TouchableOpacity onPress={handlePhotoUpload}>
                  {/*<Image source={IMAGES.addPhoto} />*/}
                  {imageData ? (
                    <View style={{position: 'relative'}}>
                      <Image
                        source={{
                          uri: `data:${imageData.mime};base64,${imageData.data}`,
                        }}
                        style={{width: 148, height: 148, borderRadius: 15}}
                      />
                      {imageUploaded && (
                        <View
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                          }}>
                          <ActivityIndicator size="small" color="white" />
                        </View>
                      )}
                    </View>
                  ) : (
                    <Image source={IMAGES.addPhoto} />
                  )}
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
              <View style={{marginVertical: 6}}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      // ref={textInputRef}
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
                      // verticalAlign={'top'}
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
              <View style={{marginVertical: 6}}>
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
              <View style={{marginVertical: 6}}>
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
              disabled={!isValid || !imageData}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default CustomerPhotoBio;
