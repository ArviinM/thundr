import React from 'react';

import { Image } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';

import styled from 'styled-components/native';

import StandardSkeleton from '@templates/StandardSkeleton';
import BasicButton from '@atoms/Buttons/Basic';

import IconButton from '@molecules/IconButton/IconButton';

import type { RegistrationStackParamList } from 'types/navigation';

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

const FooterTextUnderline = styled(FooterText)`
   text-decoration: underline;
`;

const SocialButton = styled(IconButton)`
   border-radius: 30px;
`;

const LoginButton = styled(BasicButton).attrs({
   textStyles: {
      fontWeight: '800',
   },
})`
   border-radius: 30px;
`;

interface StartupProps
   extends StackScreenProps<RegistrationStackParamList, 'StartUp'> {}

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
               <SocialButton
                  title="Continue with Google"
                  icon={Images.icons.icon_google}
                  onPress={() => console.log(1)}
               />
               <SocialButton
                  title="Continue with Facebook"
                  icon={Images.icons.icon_facebook}
                  onPress={() => console.log(1)}
               />
               <SocialButton
                  title="Continue with Mobile Number"
                  icon={Images.icons.icon_phone_hold}
                  onPress={() => navigation.navigate('MobileRegistration')}
               />
               <LoginButton
                  title="LOGIN"
                  onPress={() => navigation.navigate('Login')}
                  style={{ alignSelf: 'center' }}
               />
            </ActionsContainer>
         }
         thirdSection={
            <FooterContainer>
               <FooterText>
                  By signing up, I am 35 years of age or older and agrees to the{' '}
                  <FooterTextUnderline>
                     Terms and Conditions
                  </FooterTextUnderline>{' '}
                  of Thundr and its{' '}
                  <FooterTextUnderline>Privacy Policy</FooterTextUnderline>.
               </FooterText>
            </FooterContainer>
         }
      />
   );
};

export default Startup;
