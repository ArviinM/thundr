import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../../components/shared/Button.tsx';
import {COLORS, width} from '../../../constants/commons.ts';
import {CaptureButton} from '../../../assets/images/CaptureButton.tsx';
import {scale} from '../../../utils/utils.ts';
import {Image} from 'expo-image';

const TakeAPhoto = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);
  const [disabled, setDisabled] = useState(false);

  if (!hasPermission) {
    requestPermission();

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
        edges={['right', 'left']}>
        <Text style={{textAlign: 'center'}}>
          This app needs to have access with your camera to take a photo for
          verification
        </Text>
        <Button
          text={'Allow Permissions'}
          onPress={() => requestPermission()}
          buttonStyle={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: COLORS.black2,
            borderRadius: 20,
          }}
          textStyle={{color: COLORS.white2}}
        />
      </SafeAreaView>
    );
  }

  if (device == null) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        edges={['right', 'left']}>
        <Text>No Camera found!</Text>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    try {
      if (camera.current) {
        setDisabled(true);
        const photo = await camera.current.takePhoto({
          flash: 'off', // Disable flash
        });
        navigation.navigate('ReviewPhoto', {photoPath: photo.path});
        setDisabled(false);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      setDisabled(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'transparent'}}
      edges={['right', 'left']}>
      {/*Add Camera Native Vision Here*/}
      {hasPermission && device && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          {/* Image to Copy and Smile */}
          <View style={styles.mainImageContainer}>
            <Image
              source={{
                uri: 'https://thundr-assets-dev.s3.ap-southeast-1.amazonaws.com/images/FaceVerificationReference.jpg',
              }}
              style={styles.mainImage}
            />
          </View>

          {/* Centered Capture Button */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              disabled={disabled}
              onPress={async () => {
                /* Handle capture logic here */
                setDisabled(true);
                await handleCapture();
              }}>
              <CaptureButton />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  captureButtonContainer: {
    position: 'absolute',
    bottom: scale(40),

    alignSelf: 'center', // Center horizontally
  },
  mainImageContainer: {
    position: 'absolute',
    bottom: scale(40),
    left: scale(6),
  },
  mainImage: {
    width: scale(107),
    height: scale(134),
    borderRadius: 20,
  },
});

export default TakeAPhoto;
