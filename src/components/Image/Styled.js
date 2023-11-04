// React modules
import {Image} from 'react-native';

// Third party libraries
import styled from 'styled-components/native';

// Utils
import {scale, verticalScale} from '../../utils/commons';

export const StyledImage = styled(Image)`
  height: ${props => verticalScale(props.height) || 0}px;
  width: ${props => scale(props.width) || 0}px;
`;

export const StyledTintedImage = styled(Image)`
  height: ${props => verticalScale(props.height) || 0}px;
  width: ${props => scale(props.width) || 0}px;
  tint-color: ${props => props.tintColor || '#FFFFFF'};
`;
