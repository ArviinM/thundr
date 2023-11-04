// React modules
import {TextInput, TouchableOpacity} from 'react-native';

// Third party libraries
import styled from 'styled-components/native';

// Utils
import {scale, verticalScale} from '../../utils/commons';

export const Container = styled.View`
  align-items: flex-start;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${props => scale(props.noLabelMargin ? 5 : 22)}px;
`;

export const StyledTextInput = styled(TextInput)`
  height: ${props => verticalScale(props.multiline ? 90 : 40)}px;
  margin-horizontal: ${scale(22)}px;
  margin-vertical: ${verticalScale(3)}px;
  border-width: 1px;
  padding-horizontal: ${scale(15)}px;
  width: ${scale(290)}px;
  border-color: ${props => (props.error ? '#EC543C' : '#dfdfdf')};
  border-radius: 50px;
  color: black;
  background: #fff;
`;

export const TextInputContainer = styled.View`
  flex-direction: row;
`;

export const StyledTouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  align-self: flex-end;
  left: ${scale(275)}px;
  bottom: ${verticalScale(15)}px;
`;
