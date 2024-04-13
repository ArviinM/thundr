import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {IMAGES} from '../../constants/images.ts';
import {width} from '../../constants/commons.ts';
import {MockDataItem} from '../../screens/Private/Home/mock.ts';
import useSwipingStore from '../../store/swipingStore.ts';

type User = {
  image: string;
  name: string;
};

type Swiping = {
  activeIndex: SharedValue<number>;
  mareTranslation: SharedValue<any[]>;
  jowaTranslation: SharedValue<any[]>;
  index: number;
  onResponse: (a: boolean, b: MockDataItem) => void;
  user: MockDataItem[];
};

const Swiping = ({
  activeIndex,
  mareTranslation,
  jowaTranslation,
  index,
  onResponse,
  user,
}: Swiping) => {
  const translationXMare = useSharedValue(0);
  const translationXJowa = useSharedValue(0);
  const setSwiping = useSwipingStore(state => state.setSwiping);
  const [currentImage, setCurrentImage] = useState('thundrHome');

  const animateSwipeMare = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationXMare.value}],
    };
  });

  const animateSwipeJowa = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationXJowa.value}],
    };
  });

  const [mareTapped, setMareTapped] = useState(false);
  const [jowaTapped, setJowaTapped] = useState(false);

  const mareGesture = Gesture.Pan()
    .onChange(event => {
      translationXMare.value = Math.max(
        -width / 2,
        Math.min(width / 3, event.translationX),
      );
      mareTranslation.value[index] = Math.max(
        -width / 2,
        Math.min(width / 3, translationXMare.value),
      );
      activeIndex.value = interpolate(
        Math.abs(mareTranslation.value[index]),
        [0, 500],
        [index, index + 0.8],
      );

      if (event.translationX) {
        runOnJS(setMareTapped)(true);
        runOnJS(setCurrentImage)('thundrMareGlow');
        runOnJS(setSwiping)({isMare: true, activeIndex: index});
      }
    })
    .onEnd(event => {
      const distanceFromCenter = Math.abs(event.translationX);
      const threshold = width / 4;

      if (distanceFromCenter < threshold) {
        mareTranslation.value[index] = withSpring(0);
        mareTranslation.modify(value => {
          'worklet';
          value[index] = withSpring(0);
          return value;
        });
        console.log(false);
      } else {
        mareTranslation.value[index] = withSpring(
          Math.sign(event.velocityX) * 600,
          {
            velocity: event.velocityX,
          },
        );

        jowaTranslation.value[index] = withSpring(
          Math.sign(event.velocityX) * 600,
          {
            velocity: event.velocityX,
          },
        );

        activeIndex.value = withSpring(index + 1);
        runOnJS(onResponse)(event.velocityX > 0, user[index]);
        console.log(true);
      }

      translationXMare.value = withSpring(0);

      runOnJS(setMareTapped)(false);
      runOnJS(setCurrentImage)('thundrHome');
    });

  const jowaGesture = Gesture.Pan()
    .onChange(event => {
      translationXJowa.value = Math.max(
        -width / 3,
        Math.min(width / 2, event.translationX),
      );
      jowaTranslation.value[index] = Math.max(
        -width / 2,
        Math.min(width / 3, translationXJowa.value),
      );
      activeIndex.value = interpolate(
        Math.abs(jowaTranslation.value[index]),
        [0, 500],
        [index, index + 0.8],
      );

      if (event.translationX) {
        runOnJS(setJowaTapped)(true);
        runOnJS(setCurrentImage)('thundrJowaGlow');
        runOnJS(setSwiping)({isMare: false, activeIndex: index});
      }
    })
    .onEnd(event => {
      const distanceFromCenter = Math.abs(event.translationX);
      const threshold = width / 4;

      if (distanceFromCenter < threshold) {
        jowaTranslation.value[index] = withSpring(0);
        jowaTranslation.modify(value => {
          'worklet';
          value[index] = withSpring(0);
          return value;
        });

        console.log(false);
      } else {
        jowaTranslation.value[index] = withSpring(
          Math.sign(event.velocityX) * 600,
          {
            velocity: event.velocityX,
          },
        );
        mareTranslation.value[index] = withSpring(
          Math.sign(event.velocityX) * 600,
          {
            velocity: event.velocityX,
          },
        );

        activeIndex.value = withSpring(index + 1);
        runOnJS(onResponse)(event.velocityX > 0, user[index]);
        console.log(true);
      }
      translationXJowa.value = withSpring(0);
      runOnJS(setJowaTapped)(false);
      runOnJS(setCurrentImage)('thundrHome');
    });

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GestureDetector gesture={mareGesture}>
        <Animated.View
          style={[animateSwipeMare, {position: 'absolute', left: -95}]}>
          {mareTapped ? ( // Conditionally render 'mareTapped' image
            <Image
              source={IMAGES.mareTapped} // Use 'mareTapped' image source
              style={styles.swipeImageOn}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={IMAGES.mareHome}
              style={styles.swipeImageOff}
              resizeMode={'contain'}
            />
          )}
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={jowaGesture}>
        <Animated.View
          style={[animateSwipeJowa, {position: 'absolute', right: -95}]}>
          {jowaTapped ? ( // Conditionally render 'mareTapped' image
            <Image
              source={IMAGES.jowaTapped} // Use 'mareTapped' image source
              style={styles.swipeImageOn}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={IMAGES.jowaHome}
              style={styles.swipeImageOff}
              resizeMode={'contain'}
            />
          )}
        </Animated.View>
      </GestureDetector>
      {/*  Investigate this if there are any other ways to simplify it and make it not flicker*/}

      <View>
        {currentImage === 'thundrHome' && (
          <Image
            source={IMAGES.thundrHome}
            style={styles.thundrImage}
            resizeMode={'contain'}
          />
        )}
        {currentImage === 'thundrJowaGlow' && (
          <Image
            source={IMAGES.thundrJowaGlow}
            style={styles.glowImage}
            resizeMode={'contain'}
          />
        )}
        {currentImage === 'thundrMareGlow' && (
          <Image
            source={IMAGES.thundrMareGlow}
            style={styles.glowImage}
            resizeMode={'contain'}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glowImage: {
    width: 118,
    height: 118,
  },
  thundrImage: {
    width: 80,
    height: 80,
  },
  swipeImageOff: {width: 170, height: 170},
  swipeImageOn: {width: 193, height: 193},
});

export default Swiping;
