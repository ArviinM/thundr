import React, {useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
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
import {initialWindowMetrics} from 'react-native-safe-area-context';

type Swiping = {
  activeIndex: SharedValue<number>;
  mareTranslation: SharedValue<any[]>;
  jowaTranslation: SharedValue<any[]>;
  index: number;
  onResponse: (a: boolean, b: MockDataItem) => void;
  user: MockDataItem[];
  isMare: SharedValue<boolean>;
};
//TODO: Mare Gesture and Jowa Gesture check later
const Swiping = ({
  activeIndex,
  mareTranslation,
  jowaTranslation,
  index,
  onResponse,
  user,
  isMare,
}: Swiping) => {
  const translationXMare = useSharedValue(0);
  const translationXJowa = useSharedValue(0);
  const pressed = useSharedValue(false);

  const [currentImage, setCurrentImage] = useState('thundrHome');
  const [mareTapped, setMareTapped] = useState(false);
  const [jowaTapped, setJowaTapped] = useState(false);

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

  const mareGesture = Gesture.Pan()
    .onBegin(event => {
      if (!pressed.value) {
        pressed.value = true;
      }
    })
    .onChange(event => {
      if (pressed.value) {
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
          // runOnJS(setSwiping)({isMare: true, activeIndex: index});
          isMare.value = true;
        }
      }
    })
    .onEnd(event => {
      if (pressed.value) {
        const distanceFromCenter = Math.abs(event.translationX);
        const threshold = width / 3;

        if (distanceFromCenter < threshold) {
          mareTranslation.value[index] = withSpring(0);
          mareTranslation.modify(value => {
            'worklet';
            value[index] = withSpring(0);
            return value;
          });
          jowaTranslation.modify(value => {
            'worklet';
            value[index] = withSpring(0);
            return value;
          });
        } else {
          mareTranslation.value[index] = withSpring(
            Math.sign(event.translationX) * 600,
            {
              velocity: event.translationX,
            },
          );

          jowaTranslation.value[index] = withSpring(
            Math.sign(event.translationX) * 600,
            {
              velocity: event.translationX,
            },
          );

          activeIndex.value = withSpring(index + 1);
          runOnJS(onResponse)(event.translationX > 0, user[index]);
          console.log(true);
        }

        translationXMare.value = withSpring(0);

        runOnJS(setMareTapped)(false);
        runOnJS(setCurrentImage)('thundrHome');
      }
    })
    .onFinalize(event => {
      pressed.value = false;
    });

  const jowaGesture = Gesture.Pan()
    .onBegin(event => {
      if (!pressed.value) {
        pressed.value = true;
      }
    })
    .onChange(event => {
      if (pressed.value) {
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
          // runOnJS(setSwiping)({isMare: false, activeIndex: index});
          isMare.value = false;
        }
      }
    })
    .onEnd(event => {
      if (pressed.value) {
        const distanceFromCenter = Math.abs(event.translationX);
        const threshold = width / 3;

        if (distanceFromCenter < threshold) {
          jowaTranslation.value[index] = withSpring(0);
          jowaTranslation.modify(value => {
            'worklet';
            value[index] = withSpring(0);
            return value;
          });
          mareTranslation.modify(value => {
            'worklet';
            value[index] = withSpring(0);
            return value;
          });

          console.log(false);
        } else {
          jowaTranslation.value[index] = withSpring(
            Math.sign(event.translationX) * 600,
            {
              velocity: event.translationX,
            },
          );
          mareTranslation.value[index] = withSpring(
            Math.sign(event.translationX) * 600,
            {
              velocity: event.translationX,
            },
          );

          activeIndex.value = withSpring(index + 1);
          runOnJS(onResponse)(event.translationX > 0, user[index]);
          console.log(true);
        }

        translationXJowa.value = withSpring(0);
        runOnJS(setJowaTapped)(false);
        runOnJS(setCurrentImage)('thundrHome');
      }
    })
    .onFinalize(event => {
      pressed.value = false;
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
          {mareTapped ? (
            <Image
              source={IMAGES.mareTapped}
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
          style={[animateSwipeJowa, {position: 'absolute', right: -90}]}>
          {jowaTapped ? (
            <Image
              source={IMAGES.jowaTapped}
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

const bottomHeight = initialWindowMetrics?.insets.bottom || 20;

const styles = StyleSheet.create({
  glowImage: {
    width: 118,
    height: 118,
    paddingVertical:
      Platform.OS === 'ios' ? bottomHeight * 2.8 : bottomHeight * 3.6,
  },
  thundrImage: {
    width: 80,
    height: 80,
    paddingVertical:
      Platform.OS === 'ios' ? bottomHeight * 2.8 : bottomHeight * 3.6,
  },
  swipeImageOff: {width: 170, height: 170},
  swipeImageOn: {width: 193, height: 193},
});

export default Swiping;
