import React from 'react';

import styled from 'styled-components/native';

import LinearGradient from 'react-native-linear-gradient';

export default styled(LinearGradient).attrs({
   start: { x: 0, y: 0 },
   end: { x: 1, y: 0 },
   colors: ['#E72454', '#FFC227'],
})`
   padding-bottom: 3px;
   padding-right: 3px;
   border-radius: 10px;
`;
