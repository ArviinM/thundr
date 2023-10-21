import React, { useState } from 'react';

import { Platform, TextInput } from 'react-native';

import styled from 'styled-components/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LinearGradient from 'react-native-linear-gradient';

import { Dropdown } from 'react-native-element-dropdown';

import { useTheme } from '@hooks';
import PrimaryButton from '@atoms/Buttons/Primary';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

import DropDownPicker from 'react-native-dropdown-picker';

import { SelectList, SelectListProps } from 'react-native-dropdown-select-list';

const BorderLinearGradient = styled(LinearGradient).attrs({})`
   padding-bottom: 3px;
   padding-right: 3px;
   border-radius: 10px;
   overflow: visible;
`;

const Input = styled.TextInput`
   background-color: white;
   padding: 15px;
   border-radius: 10px;
   line-height: 20px;
`;

const Container = styled(KeyboardAwareScrollView).attrs({})`
   flex: 1;
   background-color: #ede8e5;
`;

const Label = styled.Text`
   color: #e33051;
   font-weight: 700;
   font-size: 18px;
`;

const ValidationLabel = styled.Text`
   font-size: 14px;
   color: #808080;
   margin-left: 5px;
   font-style: italic;
`;

const LabeledInputContainer = styled.View`
   display: flex;
`;

const LabelContainer = styled.View`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: flex-end;
   margin-bottom: 8px;
`;

const Wrapper = styled.View`
   display: flex;
   gap: 20px;
   padding: 30px;
`;

const Lgbtqia = styled.Image`
   width: 100%;
`;

const PhotoIcon = styled.Image``;

const PhotoIconContainer = styled.View`
   background-color: white;
   align-items: center;
   justify-content: center;
   border-radius: 20px;
   flex: 1;
`;

const PhotoIconWrapper = styled(TouchableOpacity).attrs({
   activeOpacity: 0.8,
})`
   height: 150px;
   width: 150px;
   align-self: center;
`;

const PhotoIconBorderLinearGradient = styled(BorderLinearGradient)`
   border-radius: 20px;
   flex: 1;
   padding-bottom: 5px;
   padding-right: 5px;
`;

type DrownDownContent = {
   label: string;
   value: string;
};

const currentYear = new Date().getFullYear();
const range = (start: number, stop: number, step: number) =>
   Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step,
   );

const MONTHS: DrownDownContent[] = [
   'Jan',
   'Feb',
   'Mar',
   'April',
   'May',
   'June',
   'Jul',
   'Aug',
   'Sept',
   'Oct',
   'Nov',
   'Dec',
].map(month => ({ label: month, value: month }));

const DAYS: DrownDownContent[] = Array.from(
   { length: 31 },
   (_, i) => i + 1,
).map(day => ({ label: day.toString(), value: day.toString() }));

const YEARS = range(currentYear, currentYear - 50, -1).map(year => ({
   label: year.toString(),
   value: year.toString(),
}));

const Gender = () => {
   const { Images } = useTheme();

   return (
      <LabeledInputContainer>
         <LabelContainer>
            <Label>Gender</Label>
            <ValidationLabel>(Required)</ValidationLabel>
         </LabelContainer>
         <Lgbtqia source={Images.forms.lgbtq} resizeMode="contain" />
      </LabeledInputContainer>
   );
};

const Photo = () => {
   const { Images } = useTheme();

   return (
      <LabeledInputContainer>
         <LabelContainer>
            <Label>Photo</Label>
            <ValidationLabel>(Required 1 photo)</ValidationLabel>
         </LabelContainer>
         <ValidationLabel>
            Can add multiple photos once profile creation is finished.
         </ValidationLabel>
         <PhotoIconWrapper>
            <PhotoIconBorderLinearGradient
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 0 }}
               colors={['#E72454', '#FFC227']}
            >
               <PhotoIconContainer>
                  <PhotoIcon
                     source={Images.icons.icon_plus}
                     resizeMode="center"
                  />
               </PhotoIconContainer>
            </PhotoIconBorderLinearGradient>
         </PhotoIconWrapper>
      </LabeledInputContainer>
   );
};

type LabeledInputProps = {
   label: string;
   validationLabel?: string;
   textInputProps: typeof Input;
};

const LabeledInput: React.FC<LabeledInputProps> = ({
   label,
   validationLabel = '',
   textInputProps,
}) => {
   return (
      <LabeledInputContainer>
         <LabelContainer>
            <Label>{label}</Label>
            {validationLabel && (
               <ValidationLabel>{validationLabel}</ValidationLabel>
            )}
         </LabelContainer>
         <BorderLinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#E72454', '#FFC227']}
         >
            <Input {...textInputProps} />
         </BorderLinearGradient>
      </LabeledInputContainer>
   );
};

const BirthdayContainer = styled.View`
   display: flex;
   flex-direction: row;
   gap: 10px;
`;

const DropdownRowContainer = styled.View`
   flex: 1;
`;

// const CustomDropdown: React.FC<DropdownProps<any>> = props => {
//    return (
//       <BorderLinearGradient
//          start={{ x: 0, y: 0 }}
//          end={{ x: 1, y: 0 }}
//          colors={['#E72454', '#FFC227']}
//          style={{ flex: 1 }}
//       >
//          <Dropdown
//             {...props}
//             style={{
//                flex: 1,
//                backgroundColor: 'white',
//                padding: 10,
//                borderRadius: 10,
//             }}
//          />
//       </BorderLinearGradient>
//    );
// };

const CustomDropDown = (props: SelectListProps) => (
   <BorderLinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#E72454', '#FFC227']}
   >
      <SelectList
         save="value"
         boxStyles={{
            backgroundColor: 'white',
            borderWidth: 0,
         }}
         dropdownStyles={{
            backgroundColor: 'white',
            borderWidth: 0,
         }}
         search={false}
         {...props}
      />
   </BorderLinearGradient>
);

const PrimaryDetails = () => {
   const [selected, setSelected] = useState('');
   const [months, setMonth] = useState<DrownDownContent[]>(MONTHS);
   const [years, setYear] = useState<DrownDownContent[]>(YEARS);
   const [days, setDay] = useState<DrownDownContent[]>(DAYS);

   // return (
   //    <CustomDropDown
   //       setSelected={(val: string) => setSelected(val)}
   //       data={months}
   //    />
   // );

   return (
      <Container
         enableOnAndroid={true}
         enableAutomaticScroll={Platform.OS === 'ios'}
      >
         <Wrapper>
            <LabeledInput label="Name" validationLabel="(Required)" />
            <Photo />
            <Gender />
            <LabelContainer style={{ marginBottom: 0 }}>
               <Label>Birthday</Label>
               <ValidationLabel>(Required)</ValidationLabel>
            </LabelContainer>
            <BirthdayContainer>
               <CustomDropDown setSelected={setMonth} data={months} />
               <CustomDropDown setSelected={setYear} data={years} />
               <CustomDropDown setSelected={setDay} data={days} />
            </BirthdayContainer>
            <LabeledInput label="Hometown" validationLabel="(Required)" />
            <PrimaryButton
               title="Continue"
               // onPress={() => navigation.navigate('CompatibilityQuestions')}
               onPress={() => {
                  console.log('a', monthValue);
               }}
            />
         </Wrapper>
      </Container>
   );
};

export default PrimaryDetails;
