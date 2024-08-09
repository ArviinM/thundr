import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-toast-message';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const saveImage = async (imageUri: string) => {
  const statusBarHeight = initialWindowMetrics?.insets.top || 20;
  try {
    const {status} = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      Toast.show({
        type: 'THNRError',
        props: {
          subtitle:
            'Sorry, we need media library permissions to save the image.',
        },
        position: 'top',
        topOffset: statusBarHeight,
      });
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'temp_image.jpg';
    await FileSystem.downloadAsync(imageUri, fileUri);

    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync('MyApp', asset, false);

    await FileSystem.deleteAsync(fileUri);

    // Toast.show({
    //   type: 'THNRSuccess',
    //   props: {
    //     subtitle: 'Image saved successfully!',
    //   },
    //   position: 'top',
    //   topOffset: statusBarHeight,
    // });
  } catch (error) {
    console.error('Error saving image:', error);
    Toast.show({
      type: 'THNRError',
      props: {
        subtitle: 'Failed to save image. Please try again.',
      },
      position: 'top',
      topOffset: statusBarHeight,
    });
  }
};
