import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CircleButton from '../../../components/shared/CircleButton.tsx';
import {IMAGES} from '../../../constants/images.ts';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import {MAX_IMAGE_SIZE_BYTES} from '../../../utils/utils.ts';
import Toast from 'react-native-toast-message';
import {useUploadProfilePhoto} from '../../../hooks/profile/useUploadProfilePhoto.ts';
import {RouteProp} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {width} from '../../../constants/commons.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import PhotoUpload from '../../../components/shared/PhotoUpload.tsx';

type EditProfileScreenRouteProp = RouteProp<
  RootNavigationParams,
  'EditProfile'
>;

type EditProfileProps = {
  route?: EditProfileScreenRouteProp;
};

const EditProfile = ({route}: EditProfileProps) => {
  const {sub, customerPhoto, customerDetails} = route?.params || {};
  const [imageUploaded, isUploadingImage] = useState(false);
  const [imageData, setImageData] = useState<ImageType | null>(null);
  const {mutateAsync} = useUploadProfilePhoto();

  const query = useQueryClient(queryClient);

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

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left']}>
      <ScrollView style={{flex: 1}}>
        <View>
          <View style={styles.container}>
            <View>
              {customerPhoto && customerPhoto[0] ? (
                <PhotoUpload
                  photoData={customerPhoto[0]}
                  onPhotoUpload={image =>
                    handlePhotoUpload(image, true, customerPhoto[0]?.id)
                  }
                  imageWidth={157}
                  imageHeight={244}
                />
              ) : (
                <PhotoUpload
                  photoData={null}
                  onPhotoUpload={image => handlePhotoUpload(image, true)}
                  imageWidth={157}
                  imageHeight={244}
                />
              )}
            </View>
            <View style={styles.subPhotosContainer}>
              {[...Array(4)].map((_, index) => (
                <PhotoUpload
                  key={index}
                  photoData={customerPhoto && customerPhoto[index + 1]}
                  onPhotoUpload={image =>
                    handlePhotoUpload(image, true, customerPhoto?.[index]?.id)
                  }
                  imageWidth={117}
                  imageHeight={117}
                  isSubPhoto
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.fabContainer}>
        <CircleButton onPress={() => console.log('Pressed')} isCheck />
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
    justifyContent: 'space-between',
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
});

export default EditProfile;
