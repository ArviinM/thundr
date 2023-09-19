import React, { useEffect, useState } from 'react';

import { Image, TextInputProps } from 'react-native';

import Toast from 'react-native-toast-message';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '@navigators/Main';

import styled from 'styled-components/native';

import StandardSkeleton from '@/components/templates/StandardSkeleton';
import BasicButton from '@/components/atoms/Buttons/Basic';

import {
   useAuthenticateMutation,
   AuthenticationPostBody,
} from '@services/modules/users';

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

interface LoginProps extends StackScreenProps<RootStackParamList, 'Login'> {}

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
            text1: error,
         });
      }
   }, [isError]);

   return (
      <StandardSkeleton
         firstSection={
            <AlignVertical>
               <LogoImage source={Images.logo} />
            </AlignVertical>
         }
         secondSection={
            <ActionsContainer>
               <TextInput
                  placeholder="Email / Phone Number"
                  onChangeText={text =>
                     handleOnInputChange('phoneNumber', text)
                  }
               />
               <TextInput
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={text => handleOnInputChange('password', text)}
               />
               <BasicButton
                  title="Continue"
                  onPress={() => authenticate(credentials)}
                  style={{ alignSelf: 'center' }}
                  disabled={isLoading}
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

export default Login;
