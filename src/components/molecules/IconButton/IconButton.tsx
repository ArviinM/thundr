import React from 'react';

import styled from 'styled-components/native';

import BasicButton, {
   BasicButtonProps,
} from '@/components/atoms/Buttons/Basic';

import { useTheme } from '@/hooks';

const Container = styled.View`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   background-color: red;
`;

const SampleImage = styled.Image``;

interface IconButtonProps extends BasicButtonProps {}

const IconButton: React.FC<IconButtonProps> = props => {
   const { Images } = useTheme();

   return (
      <Container>
         <SampleImage source={Images.socials.icon_google} />
         <BasicButton {...props} />
      </Container>
   );
};

export default IconButton;
