import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  runOnJS,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

import {COLORS} from '../../constants/commons.ts';
import {MockDataItem} from '../../screens/Private/Home/mock.ts';
import {moderateScale} from '../../utils/utils.ts';
import {calculateAge} from './utils.ts';
import {personalityData} from '../CustomerPersonalityType/personalityData.ts';
import SelectableButton from '../CustomerPersonalityType/SelectableButton.tsx';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
export const cardWidth = screenWidth * 0.97;
export const cardHeight = screenHeight * 0.97;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

type Card = {
  user: MockDataItem;
  numOfCards: number;
  index: number;
  activeIndex: SharedValue<number>;
  onResponse: (a: boolean, b: MockDataItem) => void;
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
  const [imageIndex, setImageIndex] = useState(0);
  const firstName = user.customerData.name.split(' ')[0] || '✨';
  const customerImages = user.customerData.customerPhoto[imageIndex];

  // for bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

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

  const selectedPersonality = personalityData.find(
    data => data.title === user.customerData.customerDetails.personalityType,
  );

  const handleTap = (event: any) => {
    const isFirstScreen = imageIndex === 0;
    const isLastScreen =
      imageIndex === user.customerData.customerPhoto.length - 1;
    const tapX = event.absoluteX;

    if (tapX < cardWidth / 2) {
      if (!isFirstScreen) {
        runOnJS(setImageIndex)(imageIndex - 1);
      }
    } else {
      if (!isLastScreen) {
        runOnJS(setImageIndex)(imageIndex + 1);
      }
    }
  };

  const tapGesture = Gesture.Tap().onEnd(handleTap);

  return (
    <Animated.ScrollView
      style={[
        styles.card,
        animatedCard,
        {
          zIndex: numOfCards - index,
        },
      ]}>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.imageContainer}>
          <View style={styles.stepIndicatorContainer}>
            {user.customerData.customerPhoto.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.stepIndicator,
                  {
                    backgroundColor:
                      index === imageIndex ? COLORS.secondary1 : 'grey',
                  },
                ]}
              />
            ))}
          </View>
          <AnimatedImage
            style={[styles.image]}
            entering={FadeIn}
            exiting={FadeOut}
            key={imageIndex}
            source={{uri: customerImages.photoUrl}}>
            <LinearGradient
              colors={['transparent', 'transparent', 'rgba(17,17,17,0.68)']}
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
          </AnimatedImage>
        </View>
      </GestureDetector>

      <View style={styles.belowSection}>
        <View style={styles.container}>
          {user.customerData.customerDetails.bio && (
            <View>
              <Text style={styles.title}>About Me</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.bio}
              </Text>
            </View>
          )}
        </View>
        {/*Background*/}
        <View style={styles.container}>
          <Text style={styles.title}>Background</Text>

          {user.customerData.customerDetails.work && (
            <View>
              <Text style={styles.subtitle}>Work</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.work}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.education && (
            <View>
              <Text style={styles.subtitle}>Education</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.education}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.location && (
            <View>
              <Text style={styles.subtitle}>Location</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.location}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.height && (
            <View>
              <Text style={styles.subtitle}>Height</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.height}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.religion && (
            <View>
              <Text style={styles.subtitle}>Religion</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.religion}
              </Text>
            </View>
          )}
        </View>
        {/*Interests*/}
        <View style={styles.container}>
          <Text style={styles.title}>Interests</Text>
          {user.customerData.customerDetails.hobbies && (
            <Text style={styles.body}>
              {user.customerData.customerDetails.hobbies}
            </Text>
          )}

          {user.customerData.customerDetails.starSign && (
            <View>
              <Text style={styles.subtitle}>Star Sign</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.starSign}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.politics && (
            <View>
              <Text style={styles.subtitle}>Politics</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.politics}
              </Text>
            </View>
          )}
        </View>
        {/*Lifestyle*/}
        <View style={styles.container}>
          <Text style={styles.title}>Lifestyle</Text>
          {user.customerData.customerDetails.drinking && (
            <View>
              <Text style={styles.subtitle}>Drinking</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.drinking}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.smoking && (
            <View>
              <Text style={styles.subtitle}>Smoking</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.smoking}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.politics && (
            <View>
              <Text style={styles.subtitle}>Politics</Text>
              <Text style={styles.body}>
                {user.customerData.customerDetails.politics}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Personality Type</Text>
          <View style={styles.personalityTypeContainer}>
            {selectedPersonality && (
              <SelectableButton buttonData={[selectedPersonality]} />
            )}
          </View>
          <View style={styles.reportContainer}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginVertical: 6,
                borderRadius: 20,
              }}
              onPress={handlePresentModalPress}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: moderateScale(14),
                }}>
                Report
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ReportBottomSheetModal
        ref={bottomSheetRef}
        sub={user.sub}
        category={'MATCH'}
        name={user.customerData.name}
      />
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
});

export default Card;
