import React from 'react';

import styled from 'styled-components/native';

import { ActivityIndicator, useWindowDimensions } from 'react-native';

const SpinnerOverlayBG = styled.View`
   background-color: rgba(255, 255, 255, 0.8);
   position: absolute;
   z-index: 1;
   align-items: center;
   justify-content: center;
`;

type SpinnerProps = {
   visible?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ visible = false }) => {
   const { width, height } = useWindowDimensions();

   if (!visible) return null;

   return (
      <SpinnerOverlayBG style={{ width, height }}>
         <ActivityIndicator color={'#e33051'} />
      </SpinnerOverlayBG>
   );

   /**
    * Disabled lottie for now since it doesnt support react versions
   
   return (
      <LottieView
         source={require('@assets/json/spinner-heart.json')}
         style={{
            width,
            height,
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
         }}
         autoPlay
         loop
      />
   );
    */
};

export default Spinner;
