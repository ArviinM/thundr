import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {COLORS} from '../../constants/commons.ts';
import {MockDataItem} from '../../screens/Private/Home/mock.ts';
import {moderateScale} from '../../utils/utils.ts';
import {calculateAge} from './utils.ts';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
export const cardWidth = screenWidth * 0.97;
export const cardHeight = screenHeight * 0.97;

type Card = {
  user: MockDataItem;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (a: boolean, b: MockDataItem) => void;
  mareTranslation: SharedValue<number[]>;
  jowaTranslation: SharedValue<number[]>;
};

const Card = ({
  user,
  numOfCards,
  index,
  activeIndex,
  mareTranslation,
  jowaTranslation,
}: Card) => {
  const firstName = user.customerData.name.split(' ')[0] || '✨';

  // TODO: For Investigation
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
        translateX:
          mareTranslation.value[index] || jowaTranslation.value[index],
      },
    ],
  }));

  return (
    <Animated.ScrollView
      style={[
        styles.card,
        animatedCard,
        {
          zIndex: numOfCards - index,
        },
      ]}>
      <ImageBackground
        style={[styles.image]}
        source={{uri: user.customerData.customerPhoto[0].photoUrl}}>
        <LinearGradient
          colors={['transparent', 'rgba(17,17,17,0.36)']}
          start={{x: 0.5, y: 0}} // Start from the center top
          end={{x: 0.5, y: 1}} // End at the center bottom
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        <View style={styles.overlay}>
          <Text style={styles.name}>
            {firstName}, {calculateAge(user.customerData.birthday)}
          </Text>
          <Text style={styles.work}>
            {user.customerData.customerDetails.work}
          </Text>
          <Text style={styles.compatibilityScore}>
            Compatibility Score {user.percent}
          </Text>
        </View>
      </ImageBackground>

      {/*<View style={styles.footer}>*/}
      {/*  <Text style={styles.name}>{user.name}</Text>*/}
      {/*</View>*/}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight / 1.67,
    aspectRatio: 1 / 1.32,
    borderRadius: 15,
    margin: 2,
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 3,
  },
  image: {
    borderRadius: 30,
    height: cardHeight / 1.67,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  name: {
    fontSize: moderateScale(24),
    color: COLORS.white,
    fontFamily: 'Montserrat-ExtraBold',
  },
  work: {
    fontSize: moderateScale(16),
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
  compatibilityScore: {
    fontSize: moderateScale(13),
    color: COLORS.white,
    fontFamily: 'Montserrat-Regular',
  },
});

export default Card;
