import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {Image as ImageType} from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {MAX_IMAGE_SIZE_BYTES, scale} from '../../utils/utils.ts';
import {IMAGES} from '../../constants/images.ts';
import {CustomerPhoto} from '../../types/generated.ts';
import {Image} from 'expo-image';
import {MinusIcon} from '../../assets/images/profile_icons/MinusIcon.tsx';

interface Props {
  photoData?: CustomerPhoto | null;
  onPhotoUpload: (
    image: ImageType,
    isPrimary?: boolean,
    photoId?: number,
  ) => Promise<any>;
  imageWidth: number;
  imageHeight: number;
  onPhotoRemove?: (id: number) => Promise<void>;
  isSubPhoto?: boolean;
}

const PhotoUpload: React.FC<Props> = ({
  photoData,
  onPhotoUpload,
  imageWidth,
  imageHeight,
  isSubPhoto,
  onPhotoRemove,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageData, setImageData] = useState<ImageType | null>(null);
  const [showAddPhoto, setShowAddPhoto] = useState<boolean>(false);

  const [photoId, setPhotoId] = useState<number | null>(null);
  const handlePhotoUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: true,
        forceJpg: true,
        compressImageQuality: Platform.OS === 'ios' ? 0.7 : 0.8,
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

      const result: CustomerPhoto = await onPhotoUpload(image);

      Toast.show({
        type: 'THNRSuccess',
        props: {title: 'Photo Upload Success! ✅'},
        position: 'top',
        topOffset: 80,
      });

      setPhotoId(result.id);
      setIsUploading(false);
    } catch (e) {
      console.error(e);
      setIsUploading(false);
      throw e;
    }
  };

  const handleRemovePhoto = async (id: number) => {
    try {
      if (onPhotoRemove) {
        setIsUploading(true);

        await onPhotoRemove(id);

        Toast.show({
          type: 'THNRSuccess',
          props: {title: 'Photo Remove Success! ✅'},
          position: 'top',
          topOffset: 80,
        });

        setIsUploading(false);
        setShowAddPhoto(true);
      }
    } catch (e) {
      console.error(e);
      setIsUploading(false);
      throw e;
    }
  };

  return (
    <TouchableOpacity onPress={handlePhotoUpload}>
      {!showAddPhoto ? (
        isUploading ? (
          <View
            style={[
              styles.uploadingImage,
              {width: imageWidth, height: imageHeight},
            ]}>
            <ActivityIndicator size="small" color="black" />
          </View>
        ) : imageData && photoId ? (
          <>
            <Image
              source={{uri: `data:${imageData.mime};base64,${imageData.data}`}}
              style={{
                width: imageWidth,
                height: imageHeight,
                marginBottom: isSubPhoto ? 8 : 0,
                borderRadius: 10,
              }}
              transition={100}
            />
            {onPhotoRemove && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: scale(-10),
                  top: scale(-3),
                }}
                onPress={() => handleRemovePhoto(photoId)}>
                <MinusIcon />
              </TouchableOpacity>
            )}
          </>
        ) : photoData ? (
          <>
            <Image
              source={{uri: photoData.photoUrl}}
              style={{
                width: imageWidth,
                height: imageHeight,
                marginBottom: isSubPhoto ? 8 : 0,
                borderRadius: 10,
              }}
              transition={100}
              placeholder={photoData.blurHash}
            />
            {onPhotoRemove && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: scale(-10),
                  top: scale(-3),
                }}
                onPress={() => handleRemovePhoto(photoData?.id)}>
                <MinusIcon />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Image
            source={IMAGES.addPhoto}
            style={{
              width: imageWidth,
              height: imageHeight,
              marginBottom: isSubPhoto ? 8 : 0,
              borderRadius: 10,
            }}
            transition={100}
          />
        )
      ) : (
        <Image
          source={IMAGES.addPhoto}
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: isSubPhoto ? 8 : 0,
            borderRadius: 10,
          }}
          transition={100}
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
