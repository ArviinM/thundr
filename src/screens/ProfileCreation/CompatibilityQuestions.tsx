import React from 'react';

import styled from 'styled-components/native';

import BorderLinearGradient from '@atoms/BorderLinearGradient';
import PrimaryButton from '@atoms/Buttons/Primary';
import BasicButton, { BasicButtonProps } from '@atoms/Buttons/Basic';

const Container = styled.View`
   flex: 1;
   align-items: center;
   background-color: #ede8e5;
   gap: 30px;
   padding: 30px 0;
`;

const QestionContainer = styled.View`
   background-color: white;
   border-radius: 10px;
   flex: 1;
   padding: 20px;
   justify-content: space-evenly;
`;

const Title = styled.Text`
   color: #e33051;
   font-size: 24px;
   text-align: center;
   font-weight: 700;
`;

const CompQuestionButton = styled(BasicButton).attrs({
   textStyles: {
      color: 'white',
      alignSelf: 'flex-start',
   },
})`
   background-color: #e33051;
`;

const BottomActions = styled.View`
   display: flex;
   gap: 10px;
`;

const QuestionText = styled(Title)`
   font-size: 22px;
   font-weight: 600;
   text-align: left;
`;

const CompQuestionButtonWithGradient: React.FC<BasicButtonProps> = props => {
   return (
      <BorderLinearGradient>
         <CompQuestionButton {...props} />
      </BorderLinearGradient>
   );
};

const API_MOCK_QUESTIONS = [
   {
      question: 'Bored on a Saturday night, Best? Tara!',
      answers: [
         {
            answer: 'Chill lang sa baler',
            sequence: 1,
         },
         {
            answer: 'Chickahan sa coffeeshop',
            sequence: 2,
         },
      ],
   },
   {
      question: 'Sample Question',
      answers: [
         {
            answer: 'Answer B',
            sequence: 1,
         },
         {
            answer: 'Answer A',
            sequence: 1,
         },
      ],
   },
];

const CompatibilityQuestions = () => (
   <Container>
      <Title>Compatibility{'\n'}Questions</Title>
      <BorderLinearGradient
         style={{
            height: '40%',
            width: '70%',
         }}
      >
         <QestionContainer>
            <QuestionText>
               1. Bored on a Saturday night, Bes? Tara!
            </QuestionText>
            <BottomActions>
               <CompQuestionButtonWithGradient
                  title="A. Chill lang sa baler"
                  onPress={() => {}}
               />
               <CompQuestionButtonWithGradient
                  title="B. Chickahan sa coffeeshop"
                  onPress={() => {}}
               />
            </BottomActions>
         </QestionContainer>
      </BorderLinearGradient>
      <PrimaryButton title="Continue" onPress={() => {}} />
   </Container>
);

export default CompatibilityQuestions;
