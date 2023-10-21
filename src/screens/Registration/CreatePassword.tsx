import React, { useEffect, useState } from 'react';

import { Image, TextInputProps } from 'react-native';

import Toast from 'react-native-toast-message';

import { Footer } from '@screens/Registration/MobileNumber';

import type { StackScreenProps } from '@react-navigation/stack';
import type { MobileRegistrationFlow } from 'types/navigation';

import styled from 'styled-components/native';

import StandardSkeleton from '@templates/StandardSkeleton';

import {
   useValidateQuestionMutation,
   ChallengeName,
   ErrorResponse,
} from '@services/modules/users';

import { useAuth, useTheme } from '@hooks';
import PrimaryButton from '@atoms/Buttons/Primary';

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
   extends StackScreenProps<MobileRegistrationFlow, 'CreatePassword'> {}

type CredentialsState = {
   password: string;
   retypepassword: string;
};

const CreatePassword: React.FC<CreatePasswordProps> = ({
   navigation,
   route,
}) => {
   const { Images } = useTheme();

   const { phoneNumber, session } = route.params;

   const { authenticateUser } = useAuth();

   const [validateQuestion, { isError, isLoading, isSuccess, data }] =
      useValidateQuestionMutation();

   const [credentials, setCredentials] = useState<CredentialsState>({
      password: '',
      retypepassword: '',
   });

   const handleOnInputChange = (key: keyof CredentialsState, text: string) => {
      setCredentials({
         ...credentials,
         [key]: text,
      });
   };

   const handleOnPasswordSubmit = async () => {
      if (credentials.password === credentials.retypepassword) {
         try {
            const response = await validateQuestion({
               phoneNumber,
               challengeName: ChallengeName.new_password_required,
               challengeAnswer: credentials.password,
               session: session,
               password: credentials.password,
            }).unwrap();

            authenticateUser(response);
         } catch (message: any) {
            Toast.show({
               type: 'error',
               text1: message || 'Server Error',
            });
         }
      } else {
         Toast.show({
            type: 'error',
            text1: 'Password not match',
         });
      }
   };

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
               <PrimaryButton
                  title="Continue"
                  onPress={handleOnPasswordSubmit}
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
