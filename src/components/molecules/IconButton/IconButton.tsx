import React from 'react';

import { ImageSourcePropType, Text } from 'react-native';

import styled from 'styled-components/native';

import {
   BasicButtonProps,
   PressableButtonContainer,
} from '@atoms/Buttons/Basic';

const CustomPressableButton = styled(PressableButtonContainer)`
   display: flex;
   flex-direction: row;
   justify-content: center;
`;

const SampleImage = styled.Image`
   height: 25px;
`;

interface IconButtonProps extends BasicButtonProps {
   icon: ImageSourcePropType;
}

const IconButton: React.FC<IconButtonProps> = props => {
   const { icon: _, ...customPressableProps } = props;

   return (
      <CustomPressableButton
         bgColor={props.bgColor || 'white'}
         {...customPressableProps}
      >
         <SampleImage source={props.icon} resizeMode="contain" />
         <Text
            style={{
               color: props.disabled ? 'white' : '#e33051',
               ...(props.textStyles && props.textStyles),
            }}
         >
            {props.title}
         </Text>
      </CustomPressableButton>
   );
};

export default IconButton;
