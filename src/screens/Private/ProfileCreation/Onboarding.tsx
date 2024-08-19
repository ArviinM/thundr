import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

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
import {COLORS, SIZES} from '../../../constants/commons.ts';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';
import {profileCreationStyles} from './styles.tsx';
import {IMAGES} from '../../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import CircleButton from '../../../components/shared/CircleButton.tsx';
import {useAuth} from '../../../providers/Auth.tsx';

const onboardingSteps = [
  {
    titleImage: IMAGES.welcomeThundr,
    onboardingImage: IMAGES.onboarding1,
    // title: 'Welcome #DEVember',
    // description: 'Daily React Native tutorials during December',
  },
  {
    newTitle: 'Jojowain o Mamarehin?',
    subTitle: 'Anong landas ang pipiliin mo?',
    onboardingImage: IMAGES.onboarding2,
  },
  {
    newTitle1: 'Swipe Left',
    subTitle1: 'mo na kung bet mo!',
    newTitle2: 'Swipe Right',
    subTitle2: 'kung frenny, beh!',
    onboardingImage: IMAGES.onboarding3,
  },
  {
    header: 'Spread the love 🫶',
    newTitle: 'KAYA SWIPE NA FOR A CAUSE!',
    subTitle: 'Ang landi o bonding mo \nwith a cause na!',
    onboardingImage: IMAGES.onboarding4,
    description:
      'On top of the perks you enjoy as a \npremium subscriber, you also get to help \nour Thundr community in supporting \nLGBTQIA+ organizations that fight for our \nrights and welfare.',
  },
  {
    newTitle: 'Perfect!',
    subTitle: 'Gora na and start swiping, mars. Enjoy!',
    onboardingImage: IMAGES.onboarding5,
  },
];

const Onboarding = () => {
  const [screenIndex, setScreenIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const auth = useAuth();
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

  const endOnboarding = async () => {
    await auth.loadStorageData();
    navigation.navigate('HomeTab');
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  return (
    <SafeAreaView style={styles.page}>
      {/*<StatusBar style="light" />*/}
      <StepProgressBar currentStep={11} totalSteps={11} />
      <View style={profileCreationStyles.container}>
        <View style={profileCreationStyles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={profileCreationStyles.backButton}>
            <Image
              source={IMAGES.back}
              style={profileCreationStyles.backImage}
            />
          </TouchableOpacity>
        </View>

        <GestureDetector gesture={swipes}>
          <View style={styles.pageContent} key={screenIndex}>
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={profileCreationStyles.onboardingTitleContainer}>
              {data.header && (
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.secondary1,
                    letterSpacing: -0.4,
                  }}>
                  {data.header}
                </Text>
              )}
              {data.titleImage && (
                <Animated.Image
                  entering={SlideInRight}
                  exiting={SlideOutLeft}
                  source={data.titleImage}
                  style={{zIndex: 100}}
                />
              )}
              {data.newTitle && (
                <View>
                  <Animated.Text
                    entering={SlideInRight}
                    exiting={SlideOutLeft}
                    style={profileCreationStyles.textTitle}>
                    {data.newTitle}
                  </Animated.Text>
                  <Animated.Text
                    entering={SlideInRight.delay(50)}
                    exiting={SlideOutLeft}
                    style={profileCreationStyles.textSubtitle}>
                    {data.subTitle}
                  </Animated.Text>
                  {data.description && (
                    <View>
                      <Animated.Text
                        entering={SlideInRight.delay(50)}
                        exiting={SlideOutLeft}
                        style={[
                          profileCreationStyles.textSubtitle,
                          {marginVertical: 20},
                        ]}>
                        {data.description}
                      </Animated.Text>
                    </View>
                  )}
                </View>
              )}
              {data.newTitle1 && (
                <View>
                  <Animated.Text
                    entering={SlideInRight}
                    exiting={SlideOutLeft}
                    style={[
                      profileCreationStyles.textTitle,
                      {textAlign: 'center'},
                    ]}>
                    {data.newTitle1}
                  </Animated.Text>
                  <Animated.Text
                    entering={SlideInRight.delay(50)}
                    exiting={SlideOutLeft}
                    style={[
                      profileCreationStyles.textSubtitle,
                      {fontSize: SIZES.h4, textAlign: 'center'},
                    ]}>
                    {data.subTitle1}
                  </Animated.Text>
                </View>
              )}
            </Animated.View>

            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              style={[
                profileCreationStyles.onboardingImage,
                {
                  transform: [{scale: 1}],
                  zIndex: -10,
                },
              ]}>
              <Image source={data.onboardingImage} />
            </Animated.View>

            {data.newTitle2 && (
              <View>
                <Animated.Text
                  entering={SlideInRight.delay(150)}
                  exiting={SlideOutLeft}
                  style={[
                    profileCreationStyles.textTitle,
                    {textAlign: 'center'},
                  ]}>
                  {data.newTitle2}
                </Animated.Text>
                <Animated.Text
                  entering={SlideInRight.delay(250)}
                  exiting={SlideOutLeft}
                  style={[
                    profileCreationStyles.textSubtitle,
                    {fontSize: SIZES.h4, textAlign: 'center'},
                  ]}>
                  {data.subTitle2}
                </Animated.Text>
              </View>
            )}

            <View style={styles.footer}>
              <View style={styles.buttonsRow}>
                <CircleButton
                  onPress={onContinue}
                  // disabled={isSelectedPersonality}
                />
              </View>
            </View>
          </View>
        </GestureDetector>
      </View>
      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              {
                backgroundColor:
                  index === screenIndex ? COLORS.secondary1 : 'grey',
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
  },
  pageContent: {
    // padding: 20,
    // borderWidth: 1,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70,
  },
  title: {
    color: '#363434',
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  footer: {
    marginTop: 'auto',
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 20,
    justifyContent: 'flex-end',
    marginHorizontal: 35,
  },
  button: {
    backgroundColor: '#302E38',
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,

    padding: 15,
    paddingHorizontal: 25,
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

export default Onboarding;
