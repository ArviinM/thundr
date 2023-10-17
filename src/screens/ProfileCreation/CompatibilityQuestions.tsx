import React, { useEffect, useState } from 'react';

import { Dimensions, View } from 'react-native';

import styled from 'styled-components/native';

import BorderLinearGradient from '@atoms/BorderLinearGradient';
import PrimaryButton from '@atoms/Buttons/Primary';
import BasicButton, { BasicButtonProps } from '@atoms/Buttons/Basic';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const Container = styled.View`
   flex: 1;
   align-items: center;
   justify-content: flex-start;
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
   font-size: 18px;
   font-weight: 600;
   text-align: center;
`;

const ItemContainer = styled.View`
   background-color: pink;
   /* padding: 30px; */
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
      id: 9,
      catergory: 'c01-sub01',
      question: 'Alin sa dalawang latte ang mas bet mo? ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 17,
            answer: 'Spanish latte',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 18,
            answer: 'Vietnamese latte',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 13,
      catergory: 'c01-sub02',
      question: 'Ano gusto mo tawag sayo ni partner?',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 25,
            answer: 'Baby! (Gusto ko alagaan niya ako)',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 26,
            answer: 'Daddy! (Gusto ko sya ispoil)',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 23,
      catergory: 'c01-sub03',
      question: 'End of shift na. Paano ka uuwi? ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 45,
            answer: 'Commute',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 46,
            answer: 'Grab',
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
      id: 50,
      catergory: 'c02-sub02',
      question: 'Do you require updates from your kids all the time? ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 99,
            answer: "Basta magsabi 'pag paalis at pag-uwi",
            sequence: '1',
            updateDate: null,
         },
         {
            id: 100,
            answer: 'Every hour',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 59,
      catergory: 'c02-sub03',
      question: 'First day sa island and your agenda is?',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 117,
            answer: 'I plan the activities',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 118,
            answer: 'Go with the flow',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 64,
      catergory: 'c03-sub01',
      question: 'Kapag kwentuhan, ikaw ba yung: ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 127,
            answer: 'Nakikidagdag sa usapan',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 128,
            answer: 'Nakikinig lang',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 80,
      catergory: 'c03-sub02',
      question: 'Ano mas gusto mong movie? ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 159,
            answer: 'General Luna',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 160,
            answer: 'Enteng Kabisote',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 81,
      catergory: 'c03-sub03',
      question: 'Sa love ano’ng mas dapat gamitin? ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 161,
            answer: 'Utak',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 162,
            answer: 'Puso',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
   {
      id: 93,
      catergory: 'c03-sub04',
      question: 'Pag may special task ka, You: ',
      updateDate: '2023-09-27T20:48:35.000+00:00',
      compatibilityAnswer: [
         {
            id: 185,
            answer: 'Plan the steps',
            sequence: '1',
            updateDate: null,
         },
         {
            id: 186,
            answer: 'Just wing it',
            sequence: '2',
            updateDate: null,
         },
      ],
   },
];

const CompatibilityQuestions = () => {
   const [selectedIndex, setSelectedIndex] = useState(0);
   const [selectedItem, setSelectedItem] = useState(API_MOCK_QUESTIONS[0]);

   useEffect(() => {
      setSelectedItem(API_MOCK_QUESTIONS[selectedIndex]);
   }, [selectedIndex]);

   return (
      <Container>
         <Title>Compatibility{'\n'}Questions</Title>
         <BorderLinearGradient
            style={{
               height: '40%',
               width: '75%',
            }}
         >
            <QestionContainer>
               <QuestionText>
                  {selectedIndex + 1}. {selectedItem.question}
               </QuestionText>
               <BottomActions>
                  {selectedItem.compatibilityAnswer.map(row => (
                     <CompQuestionButtonWithGradient
                        title={row.answer}
                        onPress={() => {}}
                     />
                  ))}
               </BottomActions>
            </QestionContainer>
         </BorderLinearGradient>
         <PrimaryButton
            title="Continue"
            onPress={() => setSelectedIndex(selectedIndex + 1)}
         />
      </Container>
   );
};

export default CompatibilityQuestions;
