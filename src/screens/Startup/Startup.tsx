import React, { useEffect } from 'react';

import { Alert, Image, Linking, Platform } from 'react-native';

import base64 from 'react-native-base64';

import type { StackScreenProps } from '@react-navigation/stack';

import { APIChallengeQuestionResponseData } from '@services/modules/users';

import styled from 'styled-components/native';

import StandardSkeleton from '@templates/StandardSkeleton';
import BasicButton from '@atoms/Buttons/Basic';

import IconButton from '@molecules/IconButton/IconButton';

import type { RootStackParamList, StartUpFlow } from 'types/navigation';

import { useTheme, useAuth } from '@hooks';

import { useAppSelector, useAppDispatch } from '@store/index';

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

enum AUTH_TYPE {
   google = 'Google',
   facebook = 'Facebook',
   apple = 'SignInWithApple',
}

const getActualURL = (ref: AUTH_TYPE) =>
   `${process.env.API_URL}auth/get-sso-url?sso=${ref}`;

interface StartupProps extends StackScreenProps<StartUpFlow, 'StartUp'> { }

const Startup: React.FC<StartupProps> = ({ navigation, route }) => {
   const { Images } = useTheme();
   const { authenticateUser, authenticationState } = useAuth();

   const { params } = route;

   useEffect(() => {
      if (params?.payload) {
         const responseObject: APIChallengeQuestionResponseData = JSON.parse(
            base64.decode(params.payload),
         );

         authenticateUser(responseObject);

         if (responseObject.forProfileCreation) {
            navigation.navigate('MobileRegistrationFlow', {
               screen: 'RegisterMobileNumber',
            });
         } else {
            navigation.navigate('Dashboard');
         }
      }
   }, [params]);

   const openSSO = async (auth: AUTH_TYPE) => {
      const actualURL = getActualURL(auth);

      await Linking.openURL(actualURL);
   };
   // city, province
   return (
      <>
         <StandardSkeleton
            firstSection={
               <AlignVertical>
                  <LogoImage source={Images.logo} />
               </AlignVertical>
            }
            secondSection={
               <ActionsContainer>
                  <LoginTitle>Register here</LoginTitle>
                  {Platform.OS === 'ios' ? (
                     <SocialButton
                        title="Continue with Apple"
                        icon={Images.socials.icon_apple}
                        onPress={() => openSSO(AUTH_TYPE.apple)}
                     />
                  ) : (
                     <SocialButton
                        title="Continue with Google"
                        icon={Images.icons.icon_google}
                        onPress={() => openSSO(AUTH_TYPE.google)}
                     />
                  )}
                  <SocialButton
                     title="Continue with Facebook"
                     icon={Images.icons.icon_facebook}
                     onPress={() => openSSO(AUTH_TYPE.facebook)}
                  />
                  <SocialButton
                     title="Continue with Mobile Number"
                     icon={Images.icons.icon_phone_hold}
                     onPress={() =>
                        navigation.navigate('MobileRegistrationFlow', {
                           screen: 'RegisterMobileNumber',
                        })
                     }
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
                     By signing up, I declare that I'm 35 years of age or older
                     and hereby agree to the{' '}
                     <FooterTextUnderline>
                        Terms and Conditions
                     </FooterTextUnderline>{' '}
                     of Thundr and its{' '}
                     <FooterTextUnderline>Privacy Policy</FooterTextUnderline>.
                  </FooterText>
               </FooterContainer>
            }
         />
      </>
   );
};

export default Startup;
