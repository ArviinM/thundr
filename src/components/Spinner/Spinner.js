// React modules
import React from 'react';
import {ActivityIndicator, useWindowDimensions} from 'react-native';

// Third party libraies
import styled from 'styled-components/native';
import {Overlay} from 'react-native-elements';
import {scale, verticalScale} from '../../utils/commons';

const SpinnerContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

const Spinner = ({visible = false}) => {
  if (!visible) return null;

  return (
    <Overlay
      backdropStyle={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
      overlayStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(100)},
          {translateY: -verticalScale(50)},
        ],
        height: verticalScale(100),
        width: scale(200),
        borderRadius: 20,
      }}
      isVisible>
      <ActivityIndicator color={'#e33051'} size={'large'} />
    </Overlay>
  );
};

export default Spinner;
