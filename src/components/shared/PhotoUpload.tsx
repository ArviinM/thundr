import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {MAX_IMAGE_SIZE_BYTES} from '../../utils/utils.ts';
import {IMAGES} from '../../constants/images.ts';
import {CustomerPhoto} from '../../types/generated.ts';

interface Props {
  photoData?: CustomerPhoto | null;
  onPhotoUpload: (
    image: ImageType,
    isPrimary?: boolean,
    photoId?: number,
  ) => Promise<void>;
  imageWidth: number;
  imageHeight: number;
  isSubPhoto?: boolean; // Add a prop to determine if it's a sub photo
}

const PhotoUpload: React.FC<Props> = ({
  photoData,
  onPhotoUpload,
  imageWidth,
  imageHeight,
  isSubPhoto,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageData, setImageData] = useState<ImageType | null>(null);

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
      setIsUploading(true);

      await onPhotoUpload(image);

      Toast.show({
        type: 'THNRSuccess',
        props: {title: 'Photo Upload Success! ✅'},
        position: 'top',
        topOffset: 80,
      });

      setIsUploading(false);
    } catch (e) {
      console.error(e);
      setIsUploading(false);
      throw e;
    }
  };

  return (
    <TouchableOpacity onPress={handlePhotoUpload}>
      {isUploading ? (
        <View
          style={[
            styles.uploadingImage,
            {width: imageWidth, height: imageHeight},
          ]}>
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : imageData ? (
        <Image
          source={{uri: `data:${imageData.mime};base64,${imageData.data}`}}
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: isSubPhoto ? 8 : 0,
            borderRadius: 10,
          }}
        />
      ) : photoData ? (
        <Image
          source={{uri: photoData.photoUrl}}
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: isSubPhoto ? 8 : 0,
            borderRadius: 10,
          }}
        />
      ) : (
        <Image
          source={IMAGES.addPhoto}
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: isSubPhoto ? 8 : 0,
            borderRadius: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadingImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(110,108,108,0.7)',
  },
});

export default PhotoUpload;
