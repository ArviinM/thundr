// Third party libraries
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {scale, verticalScale} from '../../../utils/commons';

export const BorderLinearGradient = styled(LinearGradient).attrs({})`
  padding-bottom: ${verticalScale(2)}px;
  padding-right: ${scale(5)}px;
  border-radius: 20px;
`;

export const Input = styled.TextInput`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  line-height: 20px;
  height: ${props => verticalScale(props.multiline ? 100 : 35)};
`;

export const Container = styled(KeyboardAwareScrollView).attrs({})`
  flex: 1;
  background-color: #ede8e5;
  padding: ${scale(30)}px;
`;

export const LabeledInputContainer = styled.View`
  display: flex;
`;

export const LabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: ${verticalScale(6)}px;
`;

export const Wrapper = styled.View`
  display: flex;
  gap: ${scale(17)}px;
  padding: ${scale(27)}px;
`;

export const Lgbtqia = styled.Image`
  width: 100%;
`;

export const PhotoIcon = styled.Image``;

export const PhotoIconContainer = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  flex: 1;
`;

export const PhotoIconBorderLinearGradient = styled(BorderLinearGradient)`
  border-radius: 20px;
  flex: 1;
  padding-bottom: ${verticalScale(4)}px;
  padding-right: ${verticalScale(4)}px;
`;

export const PhotoIconWrapper = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  height: ${verticalScale(105)}px;
  width: ${scale(120)}px;
  align-self: center;
`;

export const BirthdayContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  position: absolute;
`;
export const DayContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  position: absolute;
  left: ${scale(90)}px;
`;
export const YearContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  position: absolute;
  left: ${scale(180)};
`;
