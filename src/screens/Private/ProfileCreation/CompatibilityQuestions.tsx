import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import GradientButton from '../../../components/shared/GradientButton.tsx';
import StepProgressBar from '../../../components/shared/StepProgressBar.tsx';

import {IMAGES} from '../../../constants/images.ts';
import {RootNavigationParams} from '../../../constants/navigator.ts';

import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {profileCreationStyles} from './styles.tsx';
import {COLORS} from '../../../constants/commons.ts';

const CompatibilityQuestions = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const textInputRef = useRef<TextInput>(null);

  const [loading, isLoading] = useState(false);

  // TODO: MOCK DATA ONLY
  const [questions, setQuestions] = useState([
    {
      question: 'Question 1 text',
      choices: ['Choice A', 'Choice B'],
      selected: null,
    },
    {
      question: 'Question 2 text',
      choices: ['Choice A', 'Choice B'],
      selected: null,
    },
    {
      question: 'Question 2 text',
      choices: ['Choice A', 'Choice B'],
      selected: null,
    },
    {
      question: 'Question 2 text',
      choices: ['Choice A', 'Choice B'],
      selected: null,
    },
    {
      question: 'Question 2 text',
      choices: ['Choice A', 'Choice B'],
      selected: null,
    },
    // ... other questions
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const onSubmit = async () => {
    try {
      isLoading(true);

      const userAnswers = questions.map(question => question.selected);

      console.log(userAnswers);
      // const result = await emailValidation.mutateAsync({
      //   phoneNumber: username,
      //   email: data.email,
      //   session: session,
      //   challengeName: challengeName,
      // } as EmailValidationRequest);

      isLoading(false);
      // navigation.navigate('EmailVerification', result);
    } catch (error) {
      // Handle validation errors
      if (error instanceof yup.ValidationError) {
        console.error(error.message);
      }
    }
  };

  //TODO: Will add type here
  const handleChoiceSelection = (choiceIndex: any) => {
    setQuestions(prevQuestions =>
      prevQuestions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {...question, selected: choiceIndex};
        } else {
          return question;
        }
      }),
    );

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    }, 300);
  };

  const cardOpacity = useRef(new Animated.Value(0)).current; // For fade animation
  const cardScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(cardOpacity, {
      toValue: 0,
      duration: 450,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }).start();
    });
  }, [currentQuestionIndex]);

  const allQuestionsAnswered = questions.every(
    question => question.selected !== null,
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={profileCreationStyles.container}>
        <StepProgressBar currentStep={3} totalSteps={6} />
        <KeyboardAwareScrollView
          bottomOffset={220}
          style={profileCreationStyles.flex}>
          <View style={profileCreationStyles.container}>
            <View style={profileCreationStyles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                disabled={true}
                style={profileCreationStyles.backButton}>
                <Image
                  source={IMAGES.back}
                  style={[profileCreationStyles.backImage]}
                />
              </TouchableOpacity>
            </View>
            <View style={profileCreationStyles.titleContainer}>
              <Text style={profileCreationStyles.textTitle}>
                Compatibility Questions
              </Text>
              <Text style={profileCreationStyles.textSubtitle}>
                Answer the questions below mars! No turning back na after you
                choose 🎉
              </Text>
              {/*  Card Container */}
              {/*<View style={profileCreationStyles.cardContainer}>*/}
              <View style={profileCreationStyles.cardContainer}>
                <Animated.View
                  style={{
                    opacity: cardOpacity,
                    transform: [{scale: cardScale}],
                  }}>
                  {/*<Text style={profileCreationStyles.questionText}>*/}
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 20,
                      marginBottom: 14,
                    }}>
                    {questions[currentQuestionIndex].question}
                  </Text>
                  {questions[currentQuestionIndex].choices.map(
                    (choice, choiceIndex) => (
                      <TouchableOpacity
                        key={choiceIndex}
                        onPress={() => handleChoiceSelection(choiceIndex)}
                        style={[
                          {
                            height: 50,
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            marginBottom: 8,
                            borderRadius: 30,
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                          // profileCreationStyles.choiceButton,
                          // profileCreationStyles.choiceButton,
                          // questions[currentQuestionIndex].selected === choiceIndex && profileCreationStyles.selectedChoice
                          questions[currentQuestionIndex].selected ===
                            choiceIndex && {
                            backgroundColor: COLORS.secondary1,
                          },
                        ]}>
                        {/*<Text style={profileCreationStyles.choiceText}>{choice}</Text>*/}
                        <Text
                          style={[
                            {
                              paddingHorizontal: 20,
                              fontFamily: 'ClimateCrisis-Regular',
                              fontSize: 32,
                              color: COLORS.secondary1,
                            },
                            questions[currentQuestionIndex].selected ===
                              choiceIndex && {color: 'white'},
                          ]}>
                          {choiceIndex === 0 && 'A'}
                          {choiceIndex === 1 && 'B'}
                        </Text>
                        <Text
                          style={[
                            {
                              color: COLORS.gray3,
                              fontSize: 16,
                              letterSpacing: -0.4,
                              fontFamily: 'Montserrat-Medium',
                            },
                            questions[currentQuestionIndex].selected ===
                              choiceIndex && {color: 'white'},
                          ]}>
                          {choice}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </Animated.View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView offset={{closed: -20, opened: 0}}>
          <View style={profileCreationStyles.buttonContainer}>
            <GradientButton
              onPress={onSubmit}
              text="Next"
              loading={loading}
              disabled={loading || !allQuestionsAnswered}
              buttonStyle={profileCreationStyles.buttonStyle}
              textStyle={profileCreationStyles.buttonTextStyle}
            />
          </View>
        </KeyboardStickyView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default CompatibilityQuestions;
