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
  } = props;
  return (
    <StyledText
      color={color}
      customStyle={customStyle}
      size={size}
      weight={weight}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </StyledText>
  );
};

export default Text;
