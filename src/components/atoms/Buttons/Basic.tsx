import React, { ReactElement } from 'react';

import { Pressable, PressableProps } from 'react-native';

import styled from 'styled-components/native';

/**
 * TODO: Remove this block after theme implementation
 */

const basicButtonTextColor: string = '#E33051';

const CustomButton = styled(Pressable).attrs({})<BasicButtonProps>`
   padding: 10px;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
   background-color: ${props => (props.disabled ? 'gray' : props.bgColor)};
`;

const BasicButtonTitle = styled.Text`
   color: ${basicButtonTextColor};
`;

export interface BasicButtonProps extends PressableProps {
   title: string;
   onPress: PressableProps['onPress'];
   bgColor?: string;
}

const BasicButton: React.FC<BasicButtonProps> = props => (
   <CustomButton bgColor={props.bgColor || 'white'} {...props}>
      <BasicButtonTitle>{props.title}</BasicButtonTitle>
   </CustomButton>
);

export default BasicButton;
