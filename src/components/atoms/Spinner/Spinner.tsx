import React from 'react';

import styled from 'styled-components/native';

// import LottieView from 'lottie-react-native';
import { useWindowDimensions } from 'react-native';

type SpinnerProps = {
   visible?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ visible = false }) => {
   const { width, height } = useWindowDimensions();

   if (!visible) return null;

   return (
      <></>
      // <LottieView
      //    source={require('@assets/json/spinner-heart.json')}
      //    style={{
      //       width,
      //       height,
      //       position: 'absolute',
      //       zIndex: 1,
      //       backgroundColor: 'rgba(255, 255, 255, 0.8)',
      //    }}
      //    autoPlay
      //    loop
      // />
   );
};

export default Spinner;
