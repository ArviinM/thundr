import React, { useEffect, useState } from 'react';

import { Image } from 'react-native';

import styled from 'styled-components/native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { MobileRegistrationFlow } from 'types/navigation';

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
   ChallengeName,
   useValidateMobileSSOMutation,
} from '@services/modules/users';
import PrimaryButton from '@atoms/Buttons/Primary';

import { useAuth } from '@hooks';
import Toast from 'react-native-toast-message';

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
      <IconTextInput
         placeholder="xx xxxx xxxx"
         onChangeText={onChangeText}
         maxLength={10}
         inputMode="numeric"
      />
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

interface MobileNumberProps
   extends StackScreenProps<MobileRegistrationFlow, 'RegisterMobileNumber'> {}

const MobileNumber: React.FC<MobileNumberProps> = ({ navigation }) => {
   const { authenticationState } = useAuth();
   const { Images } = useTheme();

   const [phoneNumber, setPhoneNumber] = useState<string>('');

   const [
      validateMobileSSO,
      {
         isLoading: ssoLoading,
         isSuccess: ssoSuccess,
         data: ssoData,
         error: ssoError,
         isError: ssoIsError,
      },
   ] = useValidateMobileSSOMutation();

   const [
      registerMobile,
      {
         isLoading: rmLoading,
         isSuccess: rmSuccess,
         data: rmData,
         error: RMErroMessage,
         isError: rmIsError,
      },
   ] = useRegisterMobileMutation();

   useEffect(() => {
      if (rmIsError) {
         Toast.show({
            text2: RMErroMessage,
            type: 'error',
         });
      }

      if (rmSuccess) {
         console.log('rmData', rmData);

         navigation.navigate('NumberOTP', {
            phoneNumber: `+63${phoneNumber}`,
            session: rmData?.data.session,
         });
      }
   }, [rmSuccess, RMErroMessage, rmIsError]);

   useEffect(() => {
      if (ssoIsError) {
         console.log('ssoError mobile', ssoError);
         Toast.show({
            type: 'error',
            text1: 'An error occured during the request',
         });
      }

      if (ssoSuccess) {
         console.log('authenticationState', authenticationState);
         console.log('SSO Mobile', JSON.stringify(ssoData));

         navigation.navigate('NumberOTP', {
            phoneNumber: `+63${phoneNumber}`,
            session: ssoData?.session,
         });
      }
   }, [ssoSuccess, ssoIsError, ssoError]);

   return (
      <RegistrationSkeleton
         firstSection={<LogoImage source={Images.icons.icon_hold_phone} />}
         secondSection={
            <>
               <CenterFlex>
                  <Title>Register with Mobile Number</Title>
                  <Sub>
                     Enter your mobile number. We will send you an OTP to verify
                  </Sub>
               </CenterFlex>
               <HorizontalSpacer />
               <IconTextInput
                  placeholder="xx xxxx xxxx"
                  onChangeText={setPhoneNumber}
                  maxLength={10}
                  inputMode="numeric"
               />
               <HorizontalSpacer />
               <PrimaryButton
                  title="Continue"
                  style={{ alignSelf: 'center' }}
                  onPress={() => {
                     if (authenticationState.isLogin) {
                        validateMobileSSO({
                           phoneNumber: `+63${phoneNumber}`,
                           sub: authenticationState.sub,
                        });
                     } else {
                        registerMobile({
                           phoneNumber: `+63${phoneNumber}`,
                        });
                     }
                  }}
                  disabled={
                     phoneNumber === '' ||
                     phoneNumber.length < 10 ||
                     rmLoading ||
                     ssoLoading
                  }
               />
            </>
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

export default MobileNumber;
