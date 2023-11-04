// React modules
import React from 'react';

// Styles
import {StyledImage} from './Styled';

const Image = props => {
  const {height, width, source, customStyle, stretch = false} = props;

  return (
    <StyledImage
      source={source}
      height={height}
      width={width}
      resizeMode={stretch ? 'stretch' : 'contain'}
      style={customStyle}
    />
  );
};

export default Image;
