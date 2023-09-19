import React from 'react';

import { Image } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '@navigators/Main';

import styled from 'styled-components/native';

import StandardSkeleton from '@/components/templates/StandardSkeleton';
import BasicButton from '@/components/atoms/Buttons/Basic';

import IconButton from '@/components/molecules/IconButton/IconButton';

import { useTheme } from '@hooks';

const AlignVertical = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const LogoImage = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 200px;
`;

const ActionsContainer = styled.View`
   flex: 1;
   gap: 10px;
`;

const LoginTitle = styled.Text`
   align-self: center;
`;

const FooterContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const FooterText = styled.Text`
   align-self: center;
   text-align: center;
   font-size: 12px;
`;

interface StartupProps
   extends StackScreenProps<RootStackParamList, 'Startup'> {}

const Startup: React.FC<StartupProps> = ({ navigation }) => {
   const { Images } = useTheme();

   return (
      <StandardSkeleton
         firstSection={
            <AlignVertical>
               <LogoImage source={Images.logo} />
            </AlignVertical>
         }
         secondSection={
            <ActionsContainer>
               <LoginTitle>Register here</LoginTitle>
               <BasicButton
                  title="Continue with Google"
                  onPress={() => console.log(1)}
               />
               <BasicButton
                  title="Continue with Facebook"
                  onPress={() => console.log(1)}
               />
               <BasicButton
                  title="Continue with Mobile Number"
                  onPress={() =>
                     navigation.navigate('Registration', {
                        screen: 'MobileRegistration',
                     })
                  }
               />
               <BasicButton
                  title="LOGIN"
                  onPress={() => navigation.navigate('Login')}
                  style={{ alignSelf: 'center' }}
               />
            </ActionsContainer>
         }
         thirdSection={
            <FooterContainer>
               <FooterText>
                  By signing up, I am 35 years of age or older and agrees to the
                  <FooterText>Terms and Conditions</FooterText> of Thundr and
                  its
                  <FooterText>Privacy Policy</FooterText>.
               </FooterText>
            </FooterContainer>
         }
      />
   );
};

export default Startup;
