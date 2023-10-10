import React, { useEffect, useState } from 'react';

import { Image } from 'react-native';

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
   ChallengeName,
   useValidateMobileSSOMutation,
} from '@services/modules/users';
import PrimaryButton from '@atoms/Buttons/Primary';

import { useAuth } from '@hooks';

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
   extends StackScreenProps<RegistrationStackParamList, 'MobileRegistration'> {}

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
      },
   ] = useValidateMobileSSOMutation();

   const [
      registerMobile,
      {
         isLoading: rmLoading,
         isSuccess: rmSuccess,
         data: rmData,
         error: rmError,
         isError: rmIsError,
      },
   ] = useRegisterMobileMutation();

   useEffect(() => {
      if (rmIsError) {
         console.log('rmError', rmError);
      }

      if (rmSuccess) {
         console.log('rmData', rmData);

         navigation.navigate('OTP', {
            phoneNumber: `+63${phoneNumber}`,
            session: rmData?.data.session,
         });
      }
   }, [rmSuccess, rmError]);

   useEffect(() => {
      if (ssoSuccess) {
         console.log('authenticationState', authenticationState);
         console.log('SSO Mobile', ssoData);
         navigation.navigate('OTP', {
            phoneNumber: `+63${phoneNumber}`,
         });
      }
   }, [ssoSuccess, ssoError]);

   return (
      <RegistrationSkeleton
         firstSection={<LogoImage source={Images.icons.icon_hold_phone} />}
         secondSection={
            <Instructions
               title="Register with Mobile Number"
               sub="Enter your mobile number. We will send
         you an OTP to verify"
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
               onChangeText={setPhoneNumber}
               disabled={
                  phoneNumber === '' ||
                  phoneNumber.length < 10 ||
                  rmLoading ||
                  ssoLoading
               }
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

export default MobileNumber;
