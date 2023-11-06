import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../../components/Text/Text';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import Separator from '../../../components/Separator/Separator';
import {BorderLinearGradient} from '../../public/ProfileCreationScreen/Styled';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';

const mockData = [
  {
    id: 7,
    catergory: 'c01-sub01',
    question: 'Who is your favorite action star?',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 13,
        answer: 'Tom Cruise',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 14,
        answer: 'Jackie Chan',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 11,
    catergory: 'c01-sub02',
    question: 'Ano gusto mong gawin ni partner sa mga beshies mo? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 21,
        answer: 'Dazzle them with charisma',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 22,
        answer: 'Cutie, shy type siya ih',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 28,
    catergory: 'c01-sub03',
    question: 'Iced coffee is life they say. Tama ba, bes? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 55,
        answer: 'Occasionally lang naman',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 56,
        answer: "Can't live without it!",
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 34,
    catergory: 'c02-sub01',
    question: "There's a new horror movie, mars? ",
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 67,
        answer: "Let's buy tickets!",
        sequence: '1',
        updateDate: null,
      },
      {
        id: 68,
        answer: 'Love story ang bet ko eh',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 49,
    catergory: 'c02-sub02',
    question: 'First field trip ni kiddo. Excited ka din ba? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 97,
        answer: 'Let the kids enjoy with their friends',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 98,
        answer: 'Sama ako para bantay-sarado',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 56,
    catergory: 'c02-sub03',
    question:
      'You and your jowa missed the start of the movie. Ano’ng feeling? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 111,
        answer: 'Pissed off',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 112,
        answer: 'Shake it off',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 69,
    catergory: 'c03-sub01',
    question: 'Which of the following best explains yourself? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 137,
        answer: 'Hearty',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 138,
        answer: 'Quiet',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 75,
    catergory: 'c03-sub02',
    question: 'Favorite section sa newspaper? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 149,
        answer: 'News',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 150,
        answer: 'Comics',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 86,
    catergory: 'c03-sub03',
    question: 'May ginawang mali si beshy. Ano’ng dapat manaig? ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 171,
        answer: 'Law',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 172,
        answer: 'Love',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
  {
    id: 92,
    catergory: 'c03-sub04',
    question: 'The idea of making a list of errands make you ',
    updateDate: '2023-09-27T20:48:35.000+00:00',
    compatibilityAnswer: [
      {
        id: 183,
        answer: 'At ease',
        sequence: '1',
        updateDate: null,
      },
      {
        id: 184,
        answer: 'Stressed',
        sequence: '2',
        updateDate: null,
      },
    ],
  },
];

const CompatibilityQuestions = () => {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  console.log('selectedAnswer', selectedAnswer);
  const answerLabels = ['A.', 'B.'];
  const currentQuestion = mockData[currentQuestionIndex];

  const handleAnswerClick = answerId => {
    setSelectedAnswer(answerId);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < mockData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
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
          {currentQuestion.compatibilityAnswer.map((answer, index) => (
            <TouchableOpacity
              key={answer.id}
              onPress={() => handleAnswerClick(answer.id)}
              style={{
                padding: 10,
                margin: 5,
                backgroundColor: '#E33051',
                width: scale(200),
                borderRadius: 10,
              }}>
              <Text color="#fff">
                {answerLabels[index]} {answer.answer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BorderLinearGradient>
      <Separator space={20} />
      <Button
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
