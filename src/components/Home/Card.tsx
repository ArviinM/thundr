import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {COLORS} from '../../constants/commons.ts';

import {moderateScale} from '../../utils/utils.ts';

import {CustomerMatchResponse} from '../../types/generated.ts';
import ProfileCard from './ProfileCard.tsx';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
export const cardWidth = screenWidth * 0.97;
export const cardHeight = screenHeight * 0.97;

type Card = {
  user: CustomerMatchResponse;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  mareTranslation: SharedValue<number[]>;
  jowaTranslation: SharedValue<number[]>;
  isMare: SharedValue<boolean>;
};

const Card = ({
  user,
  numOfCards,
  index,
  activeIndex,
  mareTranslation,
  jowaTranslation,
  isMare,
}: Card) => {
  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1],
    ),
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1],
        ),
      },
      {
        translateX: isMare.value
          ? mareTranslation.value[index]
          : jowaTranslation.value[index],
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        cardStyles.card,
        animatedCard,
        {
          zIndex: numOfCards - index,
        },
      ]}>
      <ProfileCard user={user} />
    </Animated.View>
  );
};

export const cardStyles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight / 1.67,
    aspectRatio: 1 / 1.32,
    borderRadius: 15,
    margin: 2,
    position: 'absolute',
    elevation: 3,
    backgroundColor: COLORS.gray2,
  },
  imageContainer: {
    borderRadius: 20, // Apply border radius here
    overflow: 'hidden', // Ensure the image is clipped to the border radius
    height: cardHeight / 1.67,
  },
  image: {
    borderRadius: 30,
    height: cardHeight / 1.67,
    backgroundColor: COLORS.gray2,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: moderateScale(24),
    color: COLORS.white,
    fontFamily: 'Montserrat-ExtraBold',
    letterSpacing: -0.6,
  },
  work: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: -0.6,
  },
  compatibilityScore: {
    fontSize: moderateScale(13),
    color: COLORS.white,
    fontFamily: 'Montserrat-Regular',
    letterSpacing: -0.6,
  },
  belowSection: {
    padding: 6,
    alignItems: 'stretch',
    gap: 4,
    flex: 1,
    backgroundColor: '#DADADA',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 10,
    flex: 1,
    backgroundColor: COLORS.white2,
  },
  title: {
    fontSize: moderateScale(18),
    color: COLORS.primary1,
    letterSpacing: -0.8,
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: COLORS.primary1,
    letterSpacing: -0.8,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 6,
  },
  body: {
    fontSize: moderateScale(14),
    color: COLORS.gray4,
    letterSpacing: -0.8,
    fontFamily: 'Montserrat-Regular',
  },
  personalityTypeContainer: {
    marginVertical: 6,
  },
  reportContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    position: 'absolute',
    zIndex: 10,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 10,
  },
  editIconContainer: {
    position: 'absolute',
    top: 22,
    right: 10,
  },
});

export default Card;
