import React, { useEffect, useState } from 'react';

import { Image, TextInputProps } from 'react-native';

import Toast from 'react-native-toast-message';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RegistrationStackParamList } from 'types/navigation';

import styled from 'styled-components/native';

import StandardSkeleton from '@templates/StandardSkeleton';
import PrimaryButton from '@atoms/Buttons/Primary';

import {
   useAuthenticateMutation,
   AuthenticationPostBody,
} from '@services/modules/users';

import { useTheme } from '@hooks';

const LoginContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
   /* background-color: red; */
`;

const LoginContainerWrapper = styled.View`
   height: 60%;
   width: 60%;
   /* background-color: blue; */
`;

const LogoImage = styled(Image).attrs({
   resizeMode: 'contain',
})`
   flex: 1;
   background-color: pink;
`;

const LoginTitle = styled.Text`
   font-size: 24px;
   font-weight: 700;
   color: #e43c59;
   align-self: center;
`;

const ActionsContainer = styled.View`
   flex: 1;
   gap: 15px;
   justify-content: center;
`;

export const FooterContainer = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const FooterText = styled.Text`
   align-self: center;
   text-align: center;
   font-size: 12px;
`;

// TODO: should create a separate component for this
export const TextInput = styled.TextInput<TextInputProps>`
   background-color: white;
   padding: 10px;
   border-radius: 20px;
`;

interface LoginProps
   extends StackScreenProps<RegistrationStackParamList, 'Login'> {}

const Login: React.FC<LoginProps> = ({ navigation }) => {
   const { Images } = useTheme();

   const [authenticate, { error, isError, isLoading }] =
      useAuthenticateMutation();

   const [credentials, setCredentials] = useState<AuthenticationPostBody>({
      phoneNumber: '',
      password: '',
   });

   const handleOnInputChange = (
      key: keyof AuthenticationPostBody,
      text: string,
   ) => {
      setCredentials({
         ...credentials,
         [key]: text,
      });
   };

   useEffect(() => {
      if (isError) {
         Toast.show({
            type: 'error',
            text1: 'Successfully Login',
         });
      }
   }, [isError]);

   return (
      <>
         <StandardSkeleton
            firstSection={
               <LoginContainer>
                  <LoginContainerWrapper>
                     {/* <LogoImage source={Images.logo} /> */}
                  </LoginContainerWrapper>
               </LoginContainer>
            }
            secondSection={
               <ActionsContainer>
                  <LoginTitle>LOGIN ACCOUNT</LoginTitle>
                  <TextInput
                     placeholder="Email / Phone Number"
                     onChangeText={text =>
                        handleOnInputChange('phoneNumber', text)
                     }
                     disableFullscreenUI
                  />
                  <TextInput
                     placeholder="Password"
                     secureTextEntry
                     onChangeText={text =>
                        handleOnInputChange('password', text)
                     }
                  />
               </ActionsContainer>
            }
            thirdSection={
               <PrimaryButton
                  title="Continue"
                  onPress={() => console.log(1)}
                  style={{ alignSelf: 'center' }}
               />
            }
         />
      </>
   );
};

export default Login;

// authenticate(credentials)
