import React from 'react';

import styled from 'styled-components/native';

import type { BasicButtonProps } from './Basic';
import BasicButton from './Basic';

const PressableButton = styled(BasicButton).attrs({
   textStyles: {
      color: 'white',
   },
})`
   background-color: ${props => (props.disabled ? '#9C9EA1' : '#e43c59')};
`;

interface PrimaryButtonProps extends BasicButtonProps {}

const PrimaryButton: React.FC<PrimaryButtonProps> = props => (
   <PressableButton {...props} />
);

export default PrimaryButton;
