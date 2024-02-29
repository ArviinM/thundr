// React modules
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Components
import Text from '../Text/Text';

// Styles
import {TitleContainer} from './Styled';

const Button = props => {
  const {
    activeOpacity,
    onPress,
    disabled = false,
    title,
    type,
    style,
    textColor,
  } = props;

  const renderButton = () => {
    return (
      <TitleContainer style={style} type={type} disabled={disabled}>
        <Text
          size={15}
          weight={500}
          color={textColor || '#ffffff'}
          fontFamily="Montserrat-Medium">
          {title}
        </Text>
      </TitleContainer>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPressIn={onPress}
      disabled={disabled}>
      {renderButton()}
    </TouchableOpacity>
  );
};

export default Button;
