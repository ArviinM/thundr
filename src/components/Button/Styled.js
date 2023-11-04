// Third party libraries
import styled from 'styled-components/native';

// Utils
import {scale, verticalScale} from '../../utils/commons';

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    let color = 'transparent';
    if (props.disabled) {
      color = '#D1D1D1';
    } else {
      color = '#E33051';
    }
    return color;
  }};
  height: ${verticalScale(40)}px;
  width: ${scale(290)}px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
`;
