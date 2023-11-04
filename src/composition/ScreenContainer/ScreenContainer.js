// React modules
import React from 'react';

// Styles
import {StyledContainer} from './Styled';

const ScreenContainer = props => {
  const {children, customStyle} = props;

  return <StyledContainer style={customStyle}>{children}</StyledContainer>;
};

export default ScreenContainer;
