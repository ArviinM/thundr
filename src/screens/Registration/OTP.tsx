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
import BasicButton from '@atoms/Buttons/Basic';

import { useValidateQuestionMutation } from '@services/modules/users';

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
   navigation: any;
   route: any;
};

const TextInput = styled(GenericTextInput).attrs({
   placeholder: 'xxxxxxxxxx',
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
   navigation,
   route,
}) => {
   const [validateQuestion, { error, isError, isLoading, isSuccess, data }] =
      useValidateQuestionMutation();

   const [otpInput, setOtpInput] = useState<string>('');

   const input = useRef<OTPTextView>(null);

   useEffect(() => {
      if (isSuccess) {
         // console.log(data);
         navigation.navigate('CreatePassword', data);
      }
   }, [isSuccess, error]);

   return (
      <>
         <CenterFlex>
            <Title>{title}</Title>
            <Sub>{sub}</Sub>
         </CenterFlex>
         <HorizontalSpacer />
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
         <HorizontalSpacer />
         <BasicButton
            title="Continue"
            style={{ alignSelf: 'center' }}
            onPress={() => {
               validateQuestion({
                  phoneNumber: route.params.phoneNumber,
                  session: 'default sms authentication',
                  challengeName: 'SMS_MFA',
                  challengeAnswer: otpInput.toString(),
               });
            }}
         />
      </>
   );
};

type FooterProps = {
   text: string;
};

export const Footer: React.FC<FooterProps> = ({ text }) => (
   <FooterText>{text}</FooterText>
);

interface OTPProps
   extends StackScreenProps<RegistrationStackParamList, 'OTP'> {}

const OTP: React.FC<OTPProps> = ({ navigation, route }) => {
   const { Images } = useTheme();

   return (
      <RegistrationSkeleton
         firstSection={<LogoImage source={Images.icons.icon_mobile_otp} />}
         secondSection={
            <Instructions
               title="Verification"
               sub="Enter OTP code sent to your number
               +63 xxxxxxxxxx"
               navigation={navigation}
               route={route}
            />
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
