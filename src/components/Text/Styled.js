// Third party libraries
import styled from 'styled-components/native';

// Utils
import {isIosDevice, moderateScale} from '../../utils/commons';

export const StyledText = styled.Text.attrs(props => ({
  ...props.customStyle,
}))`
  color: ${props => props.color || '#000000'};
  font-family: ${isIosDevice() ? 'System' : 'Roboto-Regular'};
  font-size: ${props => moderateScale(props.size) || 14}px;
  font-weight: ${props => props.weight || 400};
  text-decoration-line: ${props =>
    props.customStyle?.textDecorationLine || 'none'};
  margin-top: 2px;
  text-align: ${props => props?.customStyle?.textAlign || 'auto'};
`;
