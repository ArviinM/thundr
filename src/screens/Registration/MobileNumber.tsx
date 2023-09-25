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
import BasicButton from '@atoms/Buttons/Basic';

import {
   useRegisterMobileMutation,
   RegisterMobilePostBody,
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

type InstructionsProps = {
   title: string;
   sub: string;
   onPress: () => void;
   onChangeText: (text: string) => void;
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
}) => (
   <>
      <CenterFlex>
         <Title>{title}</Title>
         <Sub>{sub}</Sub>
      </CenterFlex>
      <HorizontalSpacer />
      <TextInput onChangeText={onChangeText} />
      <HorizontalSpacer />
      <BasicButton
         title="Continue"
         style={{ alignSelf: 'center' }}
         onPress={onPress}
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
   const { Images } = useTheme();

   const [phoneNumber, setPhoneNumber] = useState<string>();

   const [registerMobile, { error, isError, isLoading, isSuccess }] =
      useRegisterMobileMutation();

   useEffect(() => {
      if (isSuccess) {
         navigation.navigate('OTP', {
            phoneNumber,
         });
      }
   }, [isSuccess]);

   return (
      <RegistrationSkeleton
         firstSection={<LogoImage source={Images.icons.icon_hold_phone} />}
         secondSection={
            <Instructions
               title="Register with Mobile Number"
               sub="Enter your mobile number. We will send
         you an OTP to verify"
               onPress={() =>
                  registerMobile({
                     phoneNumber,
                     email: 'chester.danao@thundr.ph',
                  })
               }
               onChangeText={setPhoneNumber}
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
