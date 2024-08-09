import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {PostAttachment} from '../../types/generated.ts';
import {COLORS, height, width} from '../../constants/commons.ts';
import PostImageItemIOS from './PostImageItem/PostImageItemIOS.tsx';
import PostImageItemAndroid from './PostImageItem/PostImageItemAndroid.tsx';
import VideoPlayer from 'react-native-media-console';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {scale} from '../../utils/utils.ts';
import {Image} from 'expo-image';
import {formatDistanceToNow} from 'date-fns/formatDistanceToNow';
import {CloseIconWhite} from '../../assets/images/CloseIconWhite.tsx';
import {saveImage} from '../../utils/saveImage.ts';

type Props = {
  attachments: PostAttachment[];
  initialImageIndex: number;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  backgroundColor?: string;
  customerProfile: {
    customerName: string;
    customerPhoto: string;
    createdAt: string;
    customerPhotoBlurHash?: string;
  };
};

const DEFAULT_BG_COLOR = '#000';

function ImageViewing({
  attachments,
  initialImageIndex,
  setVisible,
  isVisible,
  backgroundColor = DEFAULT_BG_COLOR,
  customerProfile,
}: Props) {
  const [isScaled, setIsScaled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const [showControls, setShowControls] = useState(true);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    pointerEvents: showControls ? 'auto' : 'none',
    opacity: withClampedSpring(showControls ? 1 : 0),
    transform: [
      {
        translateY: withClampedSpring(showControls ? 0 : -30),
      },
    ],
  }));
  const animatedFooterStyle = useAnimatedStyle(() => ({
    pointerEvents: showControls ? 'auto' : 'none',
    opacity: withClampedSpring(showControls ? 1 : 0),
    transform: [
      {
        translateY: withClampedSpring(showControls ? 0 : 30),
      },
    ],
  }));

  const onTap = useCallback(() => {
    setShowControls(show => !show);
  }, []);

  const onZoom = useCallback((nextIsScaled: boolean) => {
    setIsScaled(nextIsScaled);
    if (nextIsScaled) {
      setShowControls(false);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleSave = async () => {
    const currentAttachment = attachments[imageIndex];
    if (currentAttachment.attachmentType === 'PHOTO') {
      await saveImage(currentAttachment.attachmentImage);
      Alert.alert('Image saved!');
    } else {
      Alert.alert('Cannot save', 'Saving videos is not supported yet.');
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      statusBarTranslucent
      transparent
      hardwareAccelerated>
      <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
          <View style={[styles.container, {backgroundColor}]}>
            <Animated.View style={[styles.header, animatedHeaderStyle]}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  paddingHorizontal: scale(26),
                  paddingTop: scale(46),
                }}
                hitSlop={20}
                onPress={() => setVisible(false)}>
                <CloseIconWhite />
              </TouchableOpacity>
            </Animated.View>
            <PagerView
              scrollEnabled={!isScaled}
              initialPage={initialImageIndex}
              onPageSelected={e => {
                setImageIndex(e.nativeEvent.position);
                setIsScaled(false);
              }}
              onPageScrollStateChanged={e => {
                setIsDragging(e.nativeEvent.pageScrollState !== 'idle');
              }}
              pageMargin={0}
              overdrag={true}
              style={styles.pager}>
              {attachments.map(attachment => (
                <View key={`${attachment.attachmentType}-${attachment.id}`}>
                  {attachment.attachmentType === 'PHOTO' &&
                    Platform.OS === 'ios' && (
                      <PostImageItemIOS
                        onTap={onTap}
                        onZoom={onZoom}
                        imageSrc={{uri: attachment.attachmentImage}}
                        onRequestClose={() => setVisible(false)}
                        isScrollViewBeingDragged={isDragging}
                        showControls={showControls}
                      />
                    )}

                  {attachment.attachmentType === 'PHOTO' &&
                    Platform.OS === 'android' && (
                      <PostImageItemAndroid
                        onTap={onTap}
                        onZoom={onZoom}
                        imageSrc={{uri: attachment.attachmentImage}}
                        onRequestClose={() => setVisible(false)}
                        isScrollViewBeingDragged={isDragging}
                        showControls={showControls}
                      />
                    )}

                  {attachment.attachmentType === 'VIDEO' && (
                    <View style={{width, height}}>
                      <VideoPlayer
                        source={{uri: attachment.attachmentImage}}
                        disableFullscreen
                        disableBack
                        disableOverlay
                        paused
                      />
                    </View>
                  )}
                </View>
              ))}
            </PagerView>
            <Animated.View style={[styles.footer, animatedFooterStyle]}>
              <View
                style={{
                  paddingHorizontal: scale(20),
                  paddingBottom: scale(36),
                  paddingTop: scale(10),
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: scale(2),
                  }}>
                  <View>
                    <Image
                      source={{uri: customerProfile.customerPhoto}}
                      style={{
                        height: scale(40),
                        width: scale(40),
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: COLORS.white3,
                        fontSize: scale(13),
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {customerProfile.customerName}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white3,
                        fontSize: scale(9),
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {formatDistanceToNow(
                        new Date(customerProfile.createdAt),
                        {
                          addSuffix: true,
                        },
                      )}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: scale(6)}}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.white3,
                      paddingHorizontal: scale(10),
                      paddingVertical: scale(8),
                      borderRadius: scale(20),
                    }}
                    hitSlop={20}
                    onPress={handleSave}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.white3,
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.white3,
                      paddingHorizontal: scale(10),
                      paddingVertical: scale(8),
                      borderRadius: scale(20),
                    }}
                    hitSlop={20}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.white3,
                      }}>
                      Share
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  pager: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
    pointerEvents: 'box-none',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: 0,
    backgroundColor: 'rgba(42,41,41,0.32)',
  },
});

const EnhancedImageViewing = (props: Props) => (
  <ImageViewing key={props.initialImageIndex} {...props} />
);

function withClampedSpring(value: any) {
  'worklet';
  return withSpring(value, {overshootClamping: true, stiffness: 300});
}

export default EnhancedImageViewing;
