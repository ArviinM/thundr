import React, { useEffect, useState } from 'react';

import { Image, TextInputProps } from 'react-native';

import Toast from 'react-native-toast-message';

import { Footer } from '@screens/Registration/MobileNumber';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RegistrationStackParamList } from '@navigators/Main';

import styled from 'styled-components/native';

import StandardSkeleton from '@/components/templates/StandardSkeleton';
import BasicButton from '@/components/atoms/Buttons/Basic';

import { useValidateQuestionMutation } from '@services/modules/users';

import { useTheme } from '@hooks';

const AlignVertical = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

const LogoImage = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 80px;
`;

const ActionsContainer = styled.View`
   flex: 1;
   gap: 10px;
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

const FooterIcon = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 18px;
`;

// TODO: should create a separate component for this
export const TextInput = styled.TextInput<TextInputProps>`
   background-color: white;
   padding: 10px;
   border-radius: 20px;
`;

const Title = styled.Text`
   color: #e33051;
   font-weight: 700;
   align-self: center;
   top: -50;
`;

interface CreatePasswordProps
   extends StackScreenProps<RegistrationStackParamList, 'CreatePassword'> {}

const CreatePassword: React.FC<CreatePasswordProps> = ({
   navigation,
   route,
}) => {
   const { Images } = useTheme();

   const { username, session } = route.params.data;

   const [validateQuestion, { error, isError, isLoading, isSuccess, data }] =
      useValidateQuestionMutation();

   const [credentials, setCredentials] = useState<AuthenticationPostBody>({
      password: '',
      retypepassword: '',
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
               <LogoImage source={Images.icons.icon_lock_password} />
            </AlignVertical>
         }
         secondSection={
            <ActionsContainer>
               <Title>Create Password</Title>
               <TextInput
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={text => handleOnInputChange('password', text)}
               />
               <TextInput
                  placeholder="Retype Password"
                  secureTextEntry
                  onChangeText={text =>
                     handleOnInputChange('retypepassword', text)
                  }
               />
               <BasicButton
                  title="Continue"
                  onPress={() => {
                     if (credentials.password === credentials.retypepassword) {
                        validateQuestion({
                           phoneNumber: username,
                           challengeName: 'NEW_PASSWORD_REQUIRED',
                           challengeAnswer: credentials.password,
                           session: session,
                        });
                     } else {
                        Toast.show({
                           type: 'error',
                           text1: 'Password not match',
                        });
                     }
                  }}
                  style={{ alignSelf: 'center' }}
                  disabled={isLoading}
               />
            </ActionsContainer>
         }
         thirdSection={<Footer text="Never share your password" />}
      />
   );
};

export default CreatePassword;
