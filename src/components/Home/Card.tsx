import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {COLORS} from '../../constants/commons.ts';

const screenWidth = Dimensions.get('screen').width;
export const cardWidth = screenWidth * 0.97;

type Card = {
  user: {
    image: string;
    name: string;
  };
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (
    a: boolean,
    b: {
      image: string;
      name: string;
    },
  ) => void;
  mareTranslation: SharedValue<number[]>;
};

const Card = ({
  user,
  numOfCards,
  index,
  activeIndex,
  mareTranslation,
}: Card) => {
  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      [index - 1, index, index + 1],
      [1 - 1 / 5, 1, 1],
    ),
    // opacity: 0.2,
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          [index - 1, index, index + 1],
          [0.95, 1, 1],
        ),
      },
      {
        translateX: mareTranslation.value[index],
      },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        animatedCard,
        {
          zIndex: numOfCards - index,
        },
      ]}>
      <Image
        style={[StyleSheet.absoluteFillObject, styles.image]}
        source={{uri: user.image}}
      />

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.29)']}
        style={[StyleSheet.absoluteFillObject, styles.overlay]}
      />

      <View style={styles.footer}>
        <Text style={styles.name}>{user.name}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    aspectRatio: 1 / 1.32,
    borderRadius: 15,
    justifyContent: 'flex-end',
    margin: 2,

    position: 'absolute',

    elevation: 3,
  },
  image: {
    borderRadius: 30,
  },
  overlay: {
    top: '50%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Bold',
  },
});

export default Card;
