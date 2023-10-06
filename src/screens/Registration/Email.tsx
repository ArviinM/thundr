import React, { useEffect, useState } from 'react';

import { Image, Text } from 'react-native';

import styled from 'styled-components/native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RegistrationStackParamList } from 'types/navigation';

import RegistrationSkeleton from '@templates/RegistrationSkeleton';
import { useTheme } from '@hooks';
import {
   TextInput as GenericTextInput,
   FooterContainer as GenericFC,
} from '@screens/Login/Login';

import IconTextInput from '@molecules/IconTextInput';

import {
   useRegisterMobileMutation,
   RegisterMobilePostBody,
   useValidateQuestionMutation,
   useRegisterEmailMutation,
} from '@services/modules/users';
import PrimaryButton from '@atoms/Buttons/Primary';

const LogoImage = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 60px;
   align-self: center;
   justify-content: flex-end;
   flex: 1;
`;

const Title = styled.Text`
   color: #e33051;
   font-weight: 700;
`;
const Sub = styled.Text`
   text-align: center;
   color: #59595b;
`;

const CenterFlex = styled.View`
   align-items: center;
   justify-content: center;
   display: flex;
`;

const HorizontalSpacer = styled.View`
   height: 30px;
`;

type InstructionsProps = {
   title: string;
   sub: string;
   onPress: () => void;
   onChangeText: (text: string) => void;
   disabled: boolean;
};

const TextInput = styled(GenericTextInput).attrs({
   placeholder: 'Email',
})``;

const FooterContainer = styled(GenericFC).attrs({})`
   flex-direction: row;
   align-items: center;
   justify-items: center;
   padding: 0 30px;
`;

const FooterIcon = styled(Image).attrs({
   resizeMode: 'contain',
})`
   width: 18px;
`;

const FooterText = styled(Sub).attrs({})`
   font-size: 12px;
`;

export const Instructions: React.FC<InstructionsProps> = ({
   title,
   sub,
   onPress,
   onChangeText,
   disabled = false,
}) => (
   <>
      <CenterFlex>
         <Title>{title}</Title>
         <Sub>{sub}</Sub>
      </CenterFlex>
      <HorizontalSpacer />
      <TextInput onChangeText={onChangeText} inputMode="email" />
      <HorizontalSpacer />
      <PrimaryButton
         title="Continue"
         style={{ alignSelf: 'center' }}
         onPress={onPress}
         disabled={disabled}
      />
   </>
);

type FooterProps = {
   text: string;
};

export const Footer: React.FC<FooterProps> = ({ text }) => (
   <FooterText>{text}</FooterText>
);

const expression: RegExp =
   /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const isValidEmail = (email: string) => expression.test(email);

interface EmailProps
   extends StackScreenProps<RegistrationStackParamList, 'Email'> {}

const Email: React.FC<EmailProps> = ({ navigation, route }) => {
   const { Images } = useTheme();

   const [email, setEmail] = useState<string>('');

   const [registerEmail, { error, isError, isLoading, isSuccess, data }] =
      useRegisterEmailMutation();

   useEffect(() => {
      if (isSuccess) {
         navigation.navigate('OTP', {
            email: email.toLocaleLowerCase(),
            phoneNumber: route.params.phoneNumber,
            session: data?.session,
         });
      }
   }, [isSuccess]);

   return (
      <RegistrationSkeleton
         firstSection={<LogoImage source={Images.icons.icon_email} />}
         secondSection={
            <Instructions
               title="Add Email"
               sub="Enter your email address for
               added security of your account."
               onPress={() =>
                  registerEmail({
                     email: email.toLocaleLowerCase(),
                  })
               }
               onChangeText={setEmail}
               disabled={email === '' || !isValidEmail(email) || isLoading}
            />
         }
         thirdSection={
            <FooterContainer>
               <FooterIcon source={Images.icons.icon_lock} />
               <Footer
                  text="We never share this with anyone
                  and it won’t be on your profile"
               />
            </FooterContainer>
         }
      />
   );
};

export default Email;
