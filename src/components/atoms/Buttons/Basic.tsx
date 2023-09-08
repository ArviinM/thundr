import React from 'react';

import { Pressable } from 'react-native';

import styled from 'styled-components/native';

/**
 * TODO: Remove this block after theme implementation
 */

const basicButtonTextColor: string = '#E33051';

const CustomButton = styled(Pressable).attrs({})`
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`;

const BasicButtonTitle = styled.Text`
    color: ${basicButtonTextColor};
`;

type BasicButtonProps = {
    title: string
};

const BasicButton: React.FC<BasicButtonProps> = ({ title }) => (
    <CustomButton>
        <BasicButtonTitle>{title}</BasicButtonTitle>
    </CustomButton>
);

export default BasicButton;