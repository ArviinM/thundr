// React modules
import React from 'react';

// Styles
import {StyledImage, StyledTintedImage} from './Styled';

const Image = props => {
  const {
    height,
    width,
    source,
    customStyle,
    stretch = false,
    tintColor,
    changeTintColor = false,
  } = props;

  if (changeTintColor) {
    return (
      <StyledTintedImage
        source={source}
        height={height}
        width={width}
        resizeMode="contain"
        style={customStyle}
        tintColor={tintColor}
      />
    );
  }

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
