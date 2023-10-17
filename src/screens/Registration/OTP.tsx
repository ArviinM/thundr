import React, { useEffect, useRef, useState } from 'react';

import { Image } from 'react-native';

import styled from 'styled-components/native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { RegistrationStackParamList } from 'types/navigation';

import OTPTextView from 'react-native-otp-textinput';

import RegistrationSkeleton from '@templates/RegistrationSkeleton';
import { useTheme } from '@hooks';
import {
   TextInput as GenericTextInput,
   FooterContainer as GenericFC,
} from '@screens/Login/Login';
import PrimaryButton from '@atoms/Buttons/Primary';

import { useFocusEffect } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import { useAuth } from '@hooks';

import {
   useValidateQuestionMutation,
   ChallengeName,
   ValidateQuestion,
   useConfirmMobileSSOMutation,
} from '@services/modules/users';

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

const TextInput = styled(GenericTextInput).attrs({
   placeholder: 'Email Verficiation Code',
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

interface OTPProps
   extends StackScreenProps<RegistrationStackParamList, 'OTP'> {}

type FooterProps = {
   text: string;
};

export const Footer: React.FC<FooterProps> = ({ text }) => (
   <FooterText>{text}</FooterText>
);

const OTP: React.FC<OTPProps> = navigationProps => {
   const { Images } = useTheme();

   const [validateQuestion, { error, isLoading, isSuccess, data, isError }] =
      useValidateQuestionMutation();

   const [
      confirmMobileSSO,
      {
         error: confirmSSOError,
         isLoading: confirmSSOIsLoading,
         isSuccess: confirmSSOSuccess,
         isError: confirmSSOIsError,
         data: confirmSSOData,
      },
   ] = useConfirmMobileSSOMutation();

   const { params } = navigationProps.route;

   const [otpInput, setOtpInput] = useState<string>('');

   const { authenticationState } = useAuth();

   const input = useRef<OTPTextView>(null);

   useEffect(() => {
      if (confirmSSOIsError) {
         Toast.show({
            type: 'error',
            text1: 'An error occured during the request',
         });
      }

      if (confirmSSOSuccess) {
         navigationProps.navigation.navigate('Dashboard');
      }
   }, [confirmSSOSuccess, confirmSSOIsError, confirmSSOError]);

   useEffect(() => {
      if (isError) {
         Toast.show({
            type: 'error',
            text1: 'An error occured during the request',
         });
      }

      if (isSuccess) {
         const phoneNumber = params?.phoneNumber;

         if (data?.challengeName === ChallengeName.email_required) {
            navigationProps.navigation.navigate('Email', {
               session: data.session,
               phoneNumber,
            });
         } else if (
            data?.challengeName === ChallengeName.new_password_required
         ) {
            navigationProps.navigation.navigate('CreatePassword', {
               session: data.session,
               phoneNumber,
            });
         }
      }
   }, [isSuccess, isError, error]);

   const handleOnProceed = () => {
      let challengeObject: ValidateQuestion = {
         phoneNumber: params?.phoneNumber,
         session: params?.session,
         challengeName: ChallengeName.sms_mfa,
         challengeAnswer: otpInput.toString(),
      };

      if (params?.email) {
         challengeObject = {
            ...challengeObject,
            email: params?.email,
            challengeName: ChallengeName.email_mfa,
         };
      }

      if (authenticationState.isLogin) {
         console.log(
            'Sent to BE: loggedin - ',
            JSON.stringify({
               phoneNumber: params?.phoneNumber,
               sub: authenticationState.sub,
               session: params.session,
               challengeAnswer: otpInput.toString(),
            }),
         );

         confirmMobileSSO({
            phoneNumber: params?.phoneNumber,
            sub: authenticationState.sub,
            session: params.session,
            challengeAnswer: otpInput.toString(),
         });
      } else {
         console.log('Sent to BE: Not login - ', challengeObject);
         validateQuestion(challengeObject);
      }
   };

   useFocusEffect(
      React.useCallback(() => {
         return () => {
            setOtpInput('');
         };
      }, []),
   );

   const censorWord = (str: string) =>
      str[0] + '*'.repeat(str.length - 2) + str.slice(-1);

   const censorEmail = (email: string) => {
      const arr = email.split('@');
      return censorWord(arr[0]) + '@' + censorWord(arr[1]);
   };

   return (
      <RegistrationSkeleton
         firstSection={
            <LogoImage
               source={
                  params?.email
                     ? Images.icons.icon_email
                     : Images.icons.icon_mobile_otp
               }
            />
         }
         secondSection={
            <>
               <CenterFlex>
                  <Title>Verification</Title>
                  <Sub>
                     {params?.email
                        ? `Enter OTP code sent to your email \n ${censorEmail(
                             params?.email,
                          )}`
                        : 'Enter OTP code sent to your number \n +63 xxxxxxxxxx'}
                  </Sub>
               </CenterFlex>
               <HorizontalSpacer />
               {params?.email ? (
                  <TextInput onChangeText={setOtpInput} value={otpInput} />
               ) : (
                  <OTPTextView
                     ref={input}
                     inputCount={6}
                     tintColor="#FFFFFF"
                     offTintColor="#FFFFFF"
                     autoFocus
                     textInputStyle={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        width: 40,
                        height: 40,
                     }}
                     handleTextChange={setOtpInput}
                  />
               )}
               <HorizontalSpacer />
               <PrimaryButton
                  title="Continue"
                  style={{ alignSelf: 'center' }}
                  onPress={handleOnProceed}
                  disabled={isLoading || confirmSSOIsLoading}
               />
            </>
         }
         thirdSection={
            <FooterContainer>
               <FooterIcon source={Images.icons.icon_lock} />
               <Footer
                  text="Don’t share your OTP
                  with anyone"
               />
            </FooterContainer>
         }
      />
   );
};

export default OTP;
