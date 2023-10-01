import React from 'react';

import styled from 'styled-components/native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RegistrationStackParamList } from 'types/navigation';

const Container = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const Text = styled.Text``;

interface DashboardProps
   extends StackScreenProps<RegistrationStackParamList, 'Dashboard'> {}

const Dashboard: React.FC<DashboardProps> = () => (
   <Container>
      <Text>Welcome to Thundr</Text>
   </Container>
);

export default Dashboard;
