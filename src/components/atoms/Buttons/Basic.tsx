import React from 'react';

import { PressableProps, TextStyle } from 'react-native';

import styled from 'styled-components/native';

export const PressableButtonContainer = styled.Pressable<
   Omit<BasicButtonProps, 'textStyles'>
>`
   padding: 8px 25px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   background-color: ${props => (props.disabled ? '#9C9EA1' : props.bgColor)};
`;

const BasicButtonTitle = styled.Text``;

export interface BasicButtonProps extends PressableProps {
   title: string;
   onPress: PressableProps['onPress'];
   bgColor?: string;
   textStyles?: TextStyle;
}

const BasicButton: React.FC<BasicButtonProps> = props => {
   const { textStyles: _, ...pressableProps } = props;

   return (
      <PressableButtonContainer
         bgColor={props.bgColor || 'white'}
         style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
            props.style && props.style,
         ]}
         {...pressableProps}
      >
         <BasicButtonTitle
            style={{
               color: props.disabled ? 'white' : '#e33051',
               ...(props.textStyles && props.textStyles),
            }}
         >
            {props.title}
         </BasicButtonTitle>
      </PressableButtonContainer>
   );
};
export default BasicButton;
