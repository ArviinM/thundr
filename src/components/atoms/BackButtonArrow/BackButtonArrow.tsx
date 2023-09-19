import React from 'react';

import { Image, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { useTheme } from '@hooks';

type BackButtonArrowProps = {
   onPress: () => void;
};

const ArrowButton = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 24px;
`;

const BackButtonArrow: React.FC<BackButtonArrowProps> = ({ onPress }) => {
   const { Images } = useTheme();

   return (
      <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
         <ArrowButton source={Images.icons.back_arrow} />
      </TouchableOpacity>
   );
};

export default BackButtonArrow;
