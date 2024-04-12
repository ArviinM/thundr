import React, {useState} from 'react';
import {Image, View} from 'react-native';
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

        activeIndex.value = withSpring(index + 1);
        runOnJS(onResponse)(event.velocityX > 0, user[index]);
        console.log(true);
      }

      translationXMare.value = withSpring(0);
      if (translationXMare.value >= 0) {
        runOnJS(setMareTapped)(false);
      }
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

        activeIndex.value = withSpring(index + 1);
        runOnJS(onResponse)(event.velocityX > 0, user[index]);
        console.log(true);
      }
      translationXJowa.value = withSpring(0);
      if (translationXJowa.value <= 0) {
        runOnJS(setJowaTapped)(false);
      }
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
          style={[animateSwipeMare, {position: 'absolute', left: -80}]}>
          {mareTapped ? ( // Conditionally render 'mareTapped' image
            <Image
              source={IMAGES.mareTapped} // Use 'mareTapped' image source
              style={{width: 163, height: 163}}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={IMAGES.mareHome}
              style={{width: 150, height: 150}}
              resizeMode={'contain'}
            />
          )}
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={jowaGesture}>
        <Animated.View
          style={[animateSwipeJowa, {position: 'absolute', right: -80}]}>
          {jowaTapped ? ( // Conditionally render 'mareTapped' image
            <Image
              source={IMAGES.jowaTapped} // Use 'mareTapped' image source
              style={{width: 163, height: 163}}
              resizeMode={'contain'}
            />
          ) : (
            <Image
              source={IMAGES.jowaHome}
              style={{width: 150, height: 150}}
              resizeMode={'contain'}
            />
          )}
        </Animated.View>
      </GestureDetector>
      <View>
        <Image
          source={IMAGES.thundrHome}
          style={{width: 80, height: 80}}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
};

export default Swiping;
