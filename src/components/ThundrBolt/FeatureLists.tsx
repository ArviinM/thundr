import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

import Animated, {
  FadeIn,
  FadeOut,
  SlideOutLeft,
  SlideInRight,
} from 'react-native-reanimated';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {COLORS} from '../../constants/commons.ts';
import {BoltPhoto} from '../../assets/images/thundrbolt_icons/BoltPhoto.tsx';
import {BoltSwipes} from '../../assets/images/thundrbolt_icons/BoltSwipes.tsx';
import {scale} from '../../utils/utils.ts';
import {BoltNoAds} from '../../assets/images/thundrbolt_icons/BoltNoAds.tsx';
import {BoltAdvancedFilters} from '../../assets/images/thundrbolt_icons/BoltAdvancedFilters.tsx';
import {BoltPossibles} from '../../assets/images/thundrbolt_icons/BoltPossibles.tsx';
import {BoltAdvocacy} from '../../assets/images/thundrbolt_icons/BoltAdvocacy.tsx';

const onboardingSteps = [
  {
    image: <BoltPhoto />,
    title: 'Photo/video upload',
    subtitle: 'Upload photos or videos para bongga\nang chika.',
  },
  {
    image: <BoltSwipes />,
    title: 'Swipes',
    subtitle: 'Swipe to sawa na your matches 24/7.',
  },
  {
    image: <BoltNoAds />,
    title: 'Ads',
    subtitle: 'Goodbye ads, tuloy-tuloy ang awra!',
  },
  {
    image: <BoltAdvancedFilters />,
    title: 'Advanced Filters',
    subtitle: 'Looking for someone specific?\nCustomize with Advanced Filters.',
  },
  {
    image: <BoltPossibles />,
    title: 'Possibles Access',
    subtitle:
      'Collect and select with full The\nPossibles access. Kita mo na sila. Pak!',
  },
  {
    image: <BoltAdvocacy />,
    title: 'Advocacy',
    subtitle:
      'You now support our LGBTQIA+\norganization with your subscription.\nWinner!',
  },
];

const FeatureLists = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    navigation.navigate('HomeDrawer');
    // router.back();
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  return (
    <View style={styles.page}>
      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{alignItems: 'center'}}>
            {data.image && (
              <Animated.View entering={FadeIn} exiting={FadeOut}>
                {data.image}
              </Animated.View>
            )}

            <View style={{paddingVertical: 14}}>
              {data.title && (
                <Animated.Text
                  entering={SlideInRight.delay(150)}
                  exiting={SlideOutLeft}
                  style={{
                    color: COLORS.primary1,
                    fontSize: scale(16),
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Black',
                  }}>
                  {data.title}
                </Animated.Text>
              )}
              {data.subtitle && (
                <Animated.Text
                  entering={SlideInRight.delay(250)}
                  exiting={SlideOutLeft}
                  style={{
                    color: COLORS.black,
                    fontSize: scale(12),
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {data.subtitle}
                </Animated.Text>
              )}
            </View>
          </Animated.View>
        </View>
      </GestureDetector>
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor:
                  index === screenIndex ? COLORS.secondary1 : COLORS.gray2,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    // flex: 1,
    flexDirection: 'column',
    gap: 50,
  },
  pageContent: {height: scale(230)},
  title: {
    color: '#363434',
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    width: 10, // Set width to create a circle
    height: 10, // Set height to create a circle
    backgroundColor: 'grey', // Default color for inactive steps
    borderRadius: 5, // Half of the width/height to make it a circle
  },
});

export default FeatureLists;
