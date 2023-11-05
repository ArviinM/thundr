// React modules
import React from 'react';

// Components
import Text from '../../components/Text/Text';

// Styles
import {
  Container,
  LabelContainer,
  StyledTextInput,
  TextInputContainer,
  StyledTouchableOpacity,
} from './Styled';

// Utils
import {scale} from '../../utils/commons';
import Image from '../../components/Image/Image';

const TextInput = props => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    numeric,
    fromForgotPassword,
    errors = '',
    touched = false,
    inputStyle,
    textStyle,
    noLabelMargin = false,
    maxLength,
    multiline = false,
    editable = true,
    hasIcon,
    onPress,
    fromCreatePassword = false,
    fromCreatePassword2 = false,
  } = props;

  return (
    <Container>
      <LabelContainer noLabelMargin={noLabelMargin}>
        <Text size={14} customStyle={textStyle} color="#fff">
          {label}
        </Text>
      </LabelContainer>
      <TextInputContainer>
        <StyledTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={numeric ? 'numeric' : 'default'}
          maxLength={maxLength}
          fromForgotPassword={fromForgotPassword}
          placeholderTextColor="#B2B2B2"
          error={errors && touched}
          style={inputStyle}
          multiline={multiline}
          numberOfLines={4}
          editable={editable}
          autoCapitalize="none"
        />
        {hasIcon && (
          <StyledTouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            fromCreatePassword={fromCreatePassword}
            fromCreatePassword2={fromCreatePassword2}>
            <Image
              source={require('../../assets/Images/eye-icon.png')}
              height={15}
              width={18}
              customStyle={{
                tintColor: secureTextEntry ? 'gray' : '#E33051',
              }}
            />
          </StyledTouchableOpacity>
        )}
      </TextInputContainer>
      {errors && touched && (
        <Text customStyle={{left: scale(30)}} color="#EC543C">
          {errors}
        </Text>
      )}
    </Container>
  );
};

export default TextInput;
