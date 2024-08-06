import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, Platform, Modal} from 'react-native';

import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import {ImageSource} from '../../types/generated.ts';
import {COLORS} from '../../constants/commons.ts';
import PostImageItemIOS from './PostImageItem/PostImageItemIOS.tsx';
import PostImageItemAndroid from './PostImageItem/PostImageItemAndroid.tsx';

type Props = {
  images: ImageSource[];
  initialImageIndex: number;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  backgroundColor?: string;
};

const DEFAULT_BG_COLOR = '#000';

function ImageViewing({
  images,
  initialImageIndex,
  setVisible,
  isVisible,
  backgroundColor = DEFAULT_BG_COLOR,
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

  const edges = useMemo(() => {
    if (Platform.OS === 'android') {
      return ['top', 'bottom', 'left', 'right'] satisfies Edge[];
    }
    return ['left', 'right'] satisfies Edge[]; // iOS, so no top/bottom safe area
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType={'slide'}
      hardwareAccelerated
      transparent>
      <SafeAreaView style={{flex: 1}} edges={edges}>
        <View style={[styles.container, {backgroundColor}]}>
          <Animated.View style={[styles.header, animatedHeaderStyle]}>
            {/*{typeof HeaderComponent !== 'undefined' ? (*/}
            {/*  React.createElement(HeaderComponent, {*/}
            {/*    imageIndex,*/}
            {/*  })*/}
            {/*) : (*/}
            {/*  <ImageDefaultHeader onRequestClose={onRequestClose} />*/}
            {/*)}*/}
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
            overdrag={true}
            style={styles.pager}
            useNext={false}>
            {images.map(imageSrc => (
              <View key={imageSrc.uri}>
                {Platform.OS === 'ios' ? (
                  <PostImageItemIOS
                    onTap={onTap}
                    onZoom={onZoom}
                    imageSrc={imageSrc}
                    onRequestClose={() => setVisible(false)}
                    isScrollViewBeingDragged={isDragging}
                    showControls={showControls}
                  />
                ) : (
                  <PostImageItemAndroid
                    onTap={onTap}
                    onZoom={onZoom}
                    imageSrc={imageSrc}
                    onRequestClose={() => setVisible(false)}
                    isScrollViewBeingDragged={isDragging}
                    showControls={showControls}
                  />
                )}
              </View>
            ))}
          </PagerView>
          {/*{typeof FooterComponent !== 'undefined' && (*/}
          {/*  <Animated.View style={[styles.footer, animatedFooterStyle]}>*/}
          {/*    {React.createElement(FooterComponent, {*/}
          {/*      imageIndex,*/}
          {/*    })}*/}
          {/*  </Animated.View>*/}
          {/*)}*/}
        </View>
      </SafeAreaView>
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
    flex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
    pointerEvents: 'box-none',
    backgroundColor: COLORS.white,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: 0,
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
