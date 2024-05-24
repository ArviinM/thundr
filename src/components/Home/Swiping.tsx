import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {IMAGES} from '../../constants/images.ts';
import {COLORS, width} from '../../constants/commons.ts';
import {CustomerMatchResponse} from '../../types/generated.ts';
import {MareSwiping} from '../../assets/images/swiping/MareSwiping.tsx';
import {JowaSwiping} from '../../assets/images/swiping/JowaSwiping.tsx';
import useSubscribeCheck from '../../store/subscribeStore.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from '../../utils/utils.ts';

type Swiping = {
  activeIndex: SharedValue<number>;
  mareTranslation: SharedValue<any[]>;
  jowaTranslation: SharedValue<any[]>;
  skipTranslation?: SharedValue<number[]>;
  index: number;
  onResponse: (a: 'Mare' | 'Jowa', b: CustomerMatchResponse) => void;
  onSkip?: (a: boolean, b: CustomerMatchResponse) => void;
  user: CustomerMatchResponse[];
  isMare: SharedValue<boolean>;
  skip?: boolean;
  color?: boolean;
};

const Swiping = ({
  activeIndex,
  mareTranslation,
  jowaTranslation,
  skipTranslation,
  index,
  onResponse,
  user,
  isMare,
  skip = false,
  onSkip,
  color,
}: Swiping) => {
  const translationXMare = useSharedValue(0);
  const translationXJowa = useSharedValue(0);
  const pressed = useSharedValue(false);
  const [isGestureActive, setIsGestureActive] = useState(false);

  const [currentImage, setCurrentImage] = useState('thundrHome');
  const [mareTapped, setMareTapped] = useState(false);
  const [jowaTapped, setJowaTapped] = useState(false);

  const isSubbed = useSubscribeCheck(state => state.isCustomerSubscribed);

  const insets = useSafeAreaInsets();

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
    .onBegin(() => {
      if (!pressed.value && !isGestureActive) {
        pressed.value = true;
        runOnJS(setIsGestureActive)(true);
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
          isMare.value = true;
        }
      }
    })
    .onEnd(event => {
      if (pressed.value) {
        const distanceFromCenter = Math.abs(event.translationX);
        const threshold = width / 3;

        if (distanceFromCenter < threshold) {
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
          runOnJS(onResponse)('Mare', user[index]);
        }

        translationXMare.value = withSpring(0);

        runOnJS(setMareTapped)(false);
        runOnJS(setCurrentImage)('thundrHome');
      }
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(setIsGestureActive)(false);
    });

  const jowaGesture = Gesture.Pan()
    .onBegin(() => {
      if (!pressed.value && !isGestureActive) {
        pressed.value = true;
        runOnJS(setIsGestureActive)(true);
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
          isMare.value = false;
        }
      }
    })
    .onEnd(event => {
      console.log(event.translationX);
      if (pressed.value) {
        const distanceFromCenter = Math.abs(event.translationX);
        const threshold = width / 3;

        if (distanceFromCenter < threshold) {
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
          runOnJS(onResponse)('Jowa', user[index]);
        }

        translationXJowa.value = withSpring(0);
        runOnJS(setJowaTapped)(false);
        runOnJS(setCurrentImage)('thundrHome');
      }
    })
    .onFinalize(() => {
      pressed.value = false;
      runOnJS(setIsGestureActive)(false);
    });
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isSubbed && skip && onSkip && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            zIndex: 100,
            backgroundColor: color ? COLORS.secondary2 : COLORS.primary1,
            paddingHorizontal: scale(26),
            paddingVertical: scale(2),
            borderRadius: 20,
          }}
          onPress={() => {
            if (skipTranslation) {
              skipTranslation.modify(value => {
                'worklet';
                value[index] = withSpring(-600);
                return value; // Return the modified value
              });

              activeIndex.value = withSpring(index + 1);
              console.log({isMare});
              runOnJS(onSkip)(isMare.value, user[index]);
            }
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(13),
              color: COLORS.white,
            }}>
            Next muna, sis!
          </Text>
        </TouchableOpacity>
      )}

      <GestureDetector gesture={mareGesture}>
        <Animated.View
          style={[
            animateSwipeMare,
            {
              position: 'absolute',
              left: -105,
              width: width / 2,
              height: mareTapped ? 178 : 160,
            },
          ]}>
          <MareSwiping isSwiping={mareTapped} />
        </Animated.View>
      </GestureDetector>
      <GestureDetector gesture={jowaGesture}>
        <Animated.View
          style={[
            animateSwipeJowa,
            {
              position: 'absolute',
              right: -105,
              width: width / 2,
              height: jowaTapped ? 178 : 160,
            },
          ]}>
          <JowaSwiping isSwiping={jowaTapped} />
        </Animated.View>
      </GestureDetector>

      <View>
        {currentImage === 'thundrHome' && (
          <Image
            source={IMAGES.thundrHome}
            style={[
              styles.thundrImage,
              {
                paddingVertical:
                  Platform.OS === 'ios' ? insets.bottom * 2.8 : 34 * 2.8,
              },
            ]}
            resizeMode={'contain'}
          />
        )}
        {currentImage === 'thundrJowaGlow' && (
          <Image
            source={IMAGES.thundrJowaGlow}
            style={[
              styles.glowImage,
              {
                paddingVertical:
                  Platform.OS === 'ios' ? insets.bottom * 2.8 : 34 * 2.8,
              },
            ]}
            resizeMode={'contain'}
          />
        )}
        {currentImage === 'thundrMareGlow' && (
          <Image
            source={IMAGES.thundrMareGlow}
            style={[
              styles.glowImage,
              {
                paddingVertical:
                  Platform.OS === 'ios' ? insets.bottom * 2.8 : 34 * 2.8,
              },
            ]}
            resizeMode={'contain'}
          />
        )}
      </View>
    </Animated.View>
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
