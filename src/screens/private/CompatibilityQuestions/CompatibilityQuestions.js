import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../../components/Text/Text';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import Separator from '../../../components/Separator/Separator';
import {BorderLinearGradient} from '../../public/ProfileCreationScreen/Styled';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_COMPATIBILTY_QUESTIONS,
  SUBMIT_COMPATIBILITY_ANSWER,
} from '../../../ducks/ProfileCreation/actionTypes';
import {mockData} from './utils';

const CompatibilityQuestions = () => {
  const dispatch = useDispatch();
  const {compatibilityQuestions} = useSelector(state => state.profileCreation);
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionId, setQuestionId] = useState(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const answerLabels = ['A.', 'B.'];
  const currentQuestion =
    compatibilityQuestions[currentQuestionIndex] ||
    mockData[currentQuestionIndex];

  const handleContinue = () => {
    if (currentQuestionIndex < compatibilityQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setQuestionId(null);
      dispatch({
        type: SUBMIT_COMPATIBILITY_ANSWER,
        payload: {
          questionId: questionId,
          answerId: selectedAnswerId.toString(),
        },
      });
    } else {
      navigation.navigate('PersonalityType');
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#ede8e5',
        flex: 1,
        alignItems: 'center',
        padding: scale(30),
      }}>
      <Separator space={35} />
      <Text
        color="#E33051"
        size={30}
        weight={400}
        customStyle={{textAlign: 'center'}}>
        {`Compatibility\nQuestions`}
      </Text>
      <Separator space={30} />
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <View
          style={{
            height: 'auto',
            width: scale(250),
            backgroundColor: '#fff',
            borderRadius: 15,
            padding: scale(22),
            alignItems: 'center',
          }}>
          <Text color="#E33051" size={18}>
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </Text>
          <Separator space={10} />
          {currentQuestion.compatibilityAnswer.map((answer, index) => {
            return (
              <TouchableOpacity
                key={answer.id}
                onPress={() => {
                  setQuestionId(currentQuestion.id);
                  setSelectedAnswerId(answer.id);
                }}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor:
                    answer.id === selectedAnswerId ? '#FFBD28' : '#E43C59',
                  width: scale(200),
                  borderRadius: 10,
                }}>
                <Text color="#fff">
                  {answerLabels[index]} {answer.answer}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BorderLinearGradient>
      <Separator space={20} />
      <Button
        disabled={!selectedAnswerId}
        onPress={handleContinue}
        title="Continue"
        style={{
          top: verticalScale(20),
          height: verticalScale(isIosDevice() ? 30 : 40),
          width: scale(150),
        }}
      />
    </View>
  );
};

export default CompatibilityQuestions;
