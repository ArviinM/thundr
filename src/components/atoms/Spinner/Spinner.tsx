import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
   background-color: rgba(255, 255, 255, 0.3);
   position: absolute;
   z-index: 1;
   height: 100%;
   width: 100%;
   align-items: center;
   justify-content: center;
`;

const ActivitySpinner = styled.ActivityIndicator``;

type SpinnerProps = {
   visible?: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ visible = false }) => {
   if (!visible) return null;

   return (
      <Container>
         <ActivitySpinner color="#e43c59" />
      </Container>
   );
};

export default Spinner;
