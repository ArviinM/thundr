import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import Animated, {FadeIn, FadeOut, runOnJS} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {calculateAge} from './utils.ts';
import SelectableButton from '../CustomerPersonalityType/SelectableButton.tsx';
import {calculateCountdown, moderateScale, scale} from '../../utils/utils.ts';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';
import React, {useEffect, useRef, useState} from 'react';
import {cardHeight, cardStyles, cardWidth} from './Card.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {personalityData} from '../CustomerPersonalityType/personalityData.ts';

import {CustomerMatchResponse} from '../../types/generated.ts';
import {IMAGES} from '../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import moment from 'moment';
import {BlurView} from '@react-native-community/blur';

import {Image as ImageBackground} from 'expo-image';

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

type ProfileCardProps = {
  user: CustomerMatchResponse;
  isUser?: boolean;
  possibles?: boolean;
  nextAction?: number;
  isCountdownTimer?: boolean;
};

const ProfileCard = ({
  user,
  isUser = false,
  possibles,
  nextAction,
  isCountdownTimer = false,
}: ProfileCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const firstName = user.customerData.name.split(' ')[0] || '✨';
  const customerImages = user.customerData.customerPhoto[imageIndex];

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [countdownTime, setCountdownTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // for bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

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

  // const nextActionTimer = moment(nextAction) || 0;

  useEffect(() => {
    if (user.isBlurred) {
      const intervalId = setInterval(() => {
        const newCountdown = calculateCountdown(nextAction);
        setCountdownTime(newCountdown);
      }, 1000); // Update every second

      return () => clearInterval(intervalId); // Cleanup function
    }
  }, [nextAction, user.isBlurred]);

  return (
    <ScrollView>
      {isUser && (
        <View style={[cardStyles.editIconContainer, {zIndex: 100}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', user.customerData);
            }}>
            <Image
              source={IMAGES.editIcon}
              style={{height: scale(50), width: scale(50)}}
            />
          </TouchableOpacity>
        </View>
      )}
      <GestureDetector gesture={tapGesture}>
        <View
          style={[
            possibles
              ? cardStyles.possiblesImageContainer
              : cardStyles.imageContainer,
          ]}>
          <View style={cardStyles.stepIndicatorContainer}>
            {user.customerData.customerPhoto.map((step, index) => (
              <View
                key={index}
                style={[
                  cardStyles.stepIndicator,
                  {
                    backgroundColor:
                      index === imageIndex ? COLORS.secondary1 : 'grey',
                  },
                ]}
              />
            ))}
          </View>
          <AnimatedImage
            style={[possibles ? cardStyles.possiblesImage : cardStyles.image]}
            placeholder={customerImages.blurHash}
            transition={1000}
            entering={FadeIn}
            exiting={FadeOut}
            key={imageIndex}
            source={{uri: customerImages.photoUrl}}>
            <LinearGradient
              colors={['transparent', 'transparent', 'rgba(17,17,17,0.68)']}
              start={{x: 0.5, y: 0}} // Start from the center top
              end={{x: 0.5, y: 1}} // End at the center bottom
              style={[StyleSheet.absoluteFillObject, cardStyles.overlay]}
            />

            <View style={cardStyles.overlay}>
              <Text style={cardStyles.name}>
                {firstName}, {calculateAge(user.customerData.birthday)}
              </Text>
              <Text style={cardStyles.work}>
                {user.customerData.customerDetails.work}
              </Text>
              {user.percent && (
                <Text style={cardStyles.compatibilityScore}>
                  Compatibility Score {user.percent}
                </Text>
              )}
            </View>
          </AnimatedImage>
        </View>
      </GestureDetector>

      <View style={cardStyles.belowSection}>
        <View style={cardStyles.container}>
          {user.customerData.customerDetails.bio && (
            <View>
              <Text style={cardStyles.title}>About Me</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.bio}
              </Text>
            </View>
          )}

          {user.customerData.gender && (
            <View>
              <Text style={cardStyles.subtitle}>Gender</Text>
              <Text style={cardStyles.body}>{user.customerData.gender}</Text>
            </View>
          )}

          {user.customerData.birthday && (
            <View>
              <Text style={cardStyles.subtitle}>Birthday</Text>
              <Text style={cardStyles.body}>
                {moment(user.customerData.birthday).format('MMMM DD, YYYY')}
              </Text>
            </View>
          )}
        </View>
        {/*Background*/}
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>Background</Text>

          {user.customerData.customerDetails.work && (
            <View>
              <Text style={cardStyles.subtitle}>Work</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.work}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.education && (
            <View>
              <Text style={cardStyles.subtitle}>Education</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.education}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.location && (
            <View>
              <Text style={cardStyles.subtitle}>Location</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.location}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.height && (
            <View>
              <Text style={cardStyles.subtitle}>Height</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.height}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.religion && (
            <View>
              <Text style={cardStyles.subtitle}>Religion</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.religion}
              </Text>
            </View>
          )}
        </View>
        {/*Interests*/}
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>Interests</Text>
          {user.customerData.customerDetails.hobbies && (
            <Text style={cardStyles.body}>
              {user.customerData.customerDetails.hobbies.split(',').join(', ')}
            </Text>
          )}

          {user.customerData.customerDetails.starSign && (
            <View>
              <Text style={cardStyles.subtitle}>Star Sign</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.starSign}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.politics && (
            <View>
              <Text style={cardStyles.subtitle}>Politics</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.politics}
              </Text>
            </View>
          )}
        </View>
        {/*Lifestyle*/}
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>Lifestyle</Text>
          {user.customerData.customerDetails.drinking && (
            <View>
              <Text style={cardStyles.subtitle}>Drinking</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.drinking}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.smoking && (
            <View>
              <Text style={cardStyles.subtitle}>Smoking</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.smoking}
              </Text>
            </View>
          )}

          {user.customerData.customerDetails.pet && (
            <View>
              <Text style={cardStyles.subtitle}>Pet</Text>
              <Text style={cardStyles.body}>
                {user.customerData.customerDetails.pet}
              </Text>
            </View>
          )}
        </View>
        <View style={cardStyles.container}>
          <Text style={cardStyles.title}>Personality Type</Text>
          <View style={cardStyles.personalityTypeContainer}>
            {selectedPersonality && (
              <SelectableButton buttonData={[selectedPersonality]} />
            )}
          </View>
          {!isUser && (
            <View style={cardStyles.reportContainer}>
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
          )}
        </View>
      </View>
      {possibles && user.isBlurred && (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderRadius: 15,
          }}
          blurType="light"
          blurAmount={35}
        />
      )}
      {possibles && user.isBlurred && countdownTime && (
        <View
          style={{
            position: 'absolute',
            top: cardHeight / 6,
            left: 0,
            right: 0,
            justifyContent: 'center',
            width: '100%', // Take full width horizontally
            alignItems: 'center',
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.secondary2,
                width: scale(60),
                height: scale(30),
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            />
            <View
              style={{
                backgroundColor: '#FFB100',
                width: scale(60),
                height: scale(30),
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'ClimateCrisis-Regular',
                fontSize: scale(26),
                color: COLORS.white,
              }}>
              {countdownTime.hours}
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: scale(-20),
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: scale(10),
                fontFamily: 'Montserrat-Bold',
                color: COLORS.white,
              }}>
              hours
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.secondary2,
                width: scale(60),
                height: scale(30),
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            />
            <View
              style={{
                backgroundColor: '#FFB100',
                width: scale(60),
                height: scale(30),
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'ClimateCrisis-Regular',
                fontSize: scale(26),
                color: COLORS.white,
              }}>
              {countdownTime.minutes}
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: scale(-20),
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: scale(10),
                fontFamily: 'Montserrat-Bold',
                color: COLORS.white,
              }}>
              minutes
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.secondary2,
                width: scale(60),
                height: scale(30),
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            />
            <View
              style={{
                backgroundColor: '#FFB100',
                width: scale(60),
                height: scale(30),
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'ClimateCrisis-Regular',
                fontSize: scale(26),
                color: COLORS.white,
              }}>
              {countdownTime.seconds}
            </Text>

            <Text
              style={{
                position: 'absolute',
                top: scale(-20),
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: scale(10),
                fontFamily: 'Montserrat-Bold',
                color: COLORS.white,
              }}>
              seconds
            </Text>
          </View>

          {/*<Text>*/}
          {/*  Time until next action: {countdownTime.hours}:*/}
          {/*  {countdownTime.minutes}:{countdownTime.seconds}*/}
          {/*</Text>*/}
        </View>
      )}
      {!isUser && (
        <ReportBottomSheetModal
          ref={bottomSheetRef}
          sub={user.sub}
          category={'MATCH'}
          name={user.customerData.name}
        />
      )}
    </ScrollView>
  );
};

export default ProfileCard;
