// React modules
import React from 'react';

// Styles
import {StyledText} from './Styled';

const Text = props => {
  const {
    color,
    children,
    customStyle,
    size,
    weight,
    numberOfLines,
    ellipsizeMode,
    fontFamily = 'normal',
  } = props;
  return (
    <StyledText
      color={color}
      customStyle={customStyle}
      size={size}
      weight={weight}
      fontFamily={fontFamily}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </StyledText>
  );
};

export default Text;
