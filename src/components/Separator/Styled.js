// Third party libraries
import styled from 'styled-components/native';
import {verticalScale} from '../../utils/commons';

export const StyledSeparator = styled.View`
  margin-top: ${props => verticalScale(props.space) || 0}px;
`;
