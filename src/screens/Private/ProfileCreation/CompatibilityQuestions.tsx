import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  Button,
} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

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
import {useGetCompatibilityQuestions} from '../../../hooks/profile/useGetCompatiblityQuestions.ts';
import {useAuth} from '../../../providers/Auth.tsx';
import {CompatibilityQuestion} from '../../../types/generated.ts';
import {useSaveCompatibilityAnswers} from '../../../hooks/profile/useSaveCompatibilityAnswers.ts';

type CompatibilityScreenRouteProp = RouteProp<
  RootNavigationParams,
  'CompatibilityQuestions'
>;

type CompatibilityProps = {
  route?: CompatibilityScreenRouteProp;
};

const CompatibilityQuestions = ({route}: CompatibilityProps) => {
  const {sub} = route?.params || {sub: ''};

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [loading, isLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    {questionId: string; answerId: number}[]
  >([]);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  );
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);
  const saveCompatibilityAnswers = useSaveCompatibilityAnswers();
  const compatibilityQuestion = useGetCompatibilityQuestions({
    sub: sub,
  });

  const fetchData = async () => {
    await compatibilityQuestion.refetch();
  };

  useEffect(() => {
    if (compatibilityQuestion.isPending) {
      fetchData();
    }
  }, [compatibilityQuestion.isPending]);

  const onSubmit = async () => {
    try {
      isLoading(true);
      console.log(selectedAnswers);
      await saveCompatibilityAnswers.mutateAsync({
        sub: sub,
        compatibilities: selectedAnswers,
      });

      isLoading(false);
      navigation.navigate('CustomerInterests');
    } catch (error) {
      console.error(error);
    }
  };

  const cardOpacity = useRef(new Animated.Value(0)).current;

  const handleChoiceSelection = (choiceIndex: number, answerId: number) => {
    setSelectedChoiceIndex(choiceIndex);
    if (compatibilityQuestion.data) {
      const updatedQuestions = compatibilityQuestion.data.map(
        (question, index) =>
          index === currentQuestionIndex
            ? {...question, selected: choiceIndex}
            : question,
      );

      // setQuestions(updatedQuestions);
      setSelectedAnswers(
        prevSelectedAnswers =>
          [
            ...prevSelectedAnswers,
            {
              questionId: updatedQuestions[currentQuestionIndex].id,
              answerId: answerId,
            },
          ] as Array<{questionId: string; answerId: number}>,
      );

      if (currentQuestionIndex < updatedQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedChoiceIndex(null);
        }, 600);
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        console.log('All questions answered');
        setIsAllQuestionsAnswered(true);
      }
    }
  };

  useEffect(() => {
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [cardOpacity, currentQuestionIndex]);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={profileCreationStyles.container}>
        <StepProgressBar currentStep={5} totalSteps={10} />
        <KeyboardAwareScrollView
          bottomOffset={220}
          style={profileCreationStyles.flex}>
          <View style={profileCreationStyles.container}>
            <View style={profileCreationStyles.backButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                // disabled={true}
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
              <View style={profileCreationStyles.cardContainer}>
                <View>
                  {compatibilityQuestion.isPending ||
                  compatibilityQuestion.isLoading ? (
                    <ActivityIndicator animating={true} size="large" />
                  ) : (
                    <Animated.View style={{opacity: cardOpacity}}>
                      <Text style={profileCreationStyles.questionTitle}>
                        {compatibilityQuestion.data &&
                          compatibilityQuestion.data[currentQuestionIndex]
                            .question}
                      </Text>
                      {compatibilityQuestion.data &&
                        compatibilityQuestion.data[
                          currentQuestionIndex
                        ].compatibilityAnswer.map((choice, choiceIndex) => (
                          <TouchableOpacity
                            key={choiceIndex}
                            onPress={() =>
                              handleChoiceSelection(choiceIndex, choice.id)
                            }
                            disabled={isAllQuestionsAnswered}
                            style={[
                              profileCreationStyles.questionButton,
                              selectedChoiceIndex === choiceIndex && {
                                backgroundColor: COLORS.secondary1,
                              },
                            ]}>
                            <Text
                              style={[
                                profileCreationStyles.letterChoice,
                                selectedChoiceIndex === choiceIndex && {
                                  color: 'white',
                                },
                              ]}>
                              {choiceIndex === 0 && 'A'}
                              {choiceIndex === 1 && 'B'}
                            </Text>
                            <Text
                              style={[
                                profileCreationStyles.answerText,
                                selectedChoiceIndex === choiceIndex && {
                                  color: 'white',
                                },
                              ]}>
                              {choice.answer}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </Animated.View>
                  )}
                </View>
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
              disabled={!isAllQuestionsAnswered}
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
