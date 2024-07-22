import React, {useEffect, useRef} from 'react';
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
        const photo = await camera.current.takePhoto({
          flash: 'off', // Disable flash
        });
        console.log(photo);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
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
                uri: 'https://thundr-assets-dev.s3.ap-southeast-1.amazonaws.com/images/FaceVerificationReference.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAJHoEi9R%2B8Va9FTyqM6H%2F6QtHxcjLuY%2BAyvO146kOISkAiEA%2Fn5UYbXMtLOTsfStKgHXRBK%2FJOF2yo7QYFivHoxrdSkq%2FwIIcxAAGgwzMTIzMzc0NzE5NjYiDBHJCE7XqyW5YtZEGSrcArzduND49wxVz7PidkKJxu%2FgeVEFdC%2FuGcm9owWaUzeIlOX2KDs0Yrv8D%2F0BZDA1nxiwFCPOUy8BbFMHqqTeuEiqlGHV8thT7%2FQnIbewsD%2Fos2FNqrhwRxe%2BQFFGTnDY77Wm6RPJvtsqtco%2FvHTdf%2FP9dDI%2BYeE%2BTxQ%2BJj5%2FSbsFQshV%2FrBcNcTMaPa6dnKP4WJlswRrZXeidAvlty3iI4eNuhVuAk4he992ovA64%2F02uYovM%2BE5T%2Fns3wl96OdrCZTkFON69K%2Bshj2pEp%2FL2D5ECL6QcVgEgpZXM29jwc%2BivrhygmjpiFsCp8D2wIKyyt%2BaWvoJtJOTCQ5VWUFKy86xqjeYPkA0ctyU3INis3m0TbS1OAfD14925alWm39YBo9wOSPKp6cIqlUEXRmVXn4Q9tabapg%2FAoHGmIlGhwGvSxS5D%2B063q9u9zhmYKdeFaSKI9QVWJpSwBbESTDx1va0BjqyApnh3l1EYzTho%2BKhoIGIsbY%2FpoNi8cqKwjc149KrjBzTOBpxGDBplqwcJlGK1uAPXMQcKwE%2BwpUuC%2FWGIZyBm9I7yu%2FQNpdU2NAnrlVrF5ZS0h412aOHgkdhDUhSR3g%2FMAteIujJpp%2Fgm6aoooIcBfD%2FzeLjkjnthtXLTrKZSV9YQ%2FlWOMNPUtEdpYbIdjjvo8NlK9Infigq8NjPujXCOOAuIrQcVGBCJN8LEf27U6LoWsmk%2Bk3Nxt8dYKtB5%2FpT%2BtwYMNSOAF368bnYTLS0hoz8g7%2BrRQIplySVVB2YMFq8H8hajPN3QvaJvBBZmZ%2FagNmgN9faz23HV%2BIMwSEDeac6LeVYYwIuhyiJCTGBR%2FAnpg5zhHkUlf93igvL7R5j11g3f3taoXt2T3ObzInwpY0KLA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240722T101604Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAUROGDTHPFJTZJFOO%2F20240722%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=c4ea9b6c917ffdb3c5048c3cf8bc5f88585b1cf01293a0f24d0a5d4169b6a8cc',
              }}
              style={styles.mainImage}
            />
          </View>

          {/* Centered Capture Button */}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={async () => {
                /* Handle capture logic here */
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
