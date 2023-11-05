// React modules
import React, {useState} from 'react';
import {Platform} from 'react-native';

// Third party libraries
import {SelectList} from 'react-native-dropdown-select-list';

// Components
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';

// Utils
import {
  DAYS,
  MONTHS,
  YEARS,
  isIosDevice,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {
  BirthdayContainer,
  BorderLinearGradient,
  Container,
  Input,
  LabelContainer,
  LabeledInputContainer,
  Lgbtqia,
  PhotoIcon,
  PhotoIconBorderLinearGradient,
  PhotoIconContainer,
  PhotoIconWrapper,
  Wrapper,
} from './Styled';
import Image from '../../../components/Image/Image';
import {GLOBAL_ASSET_URI} from '../../../utils/images';
import Separator from '../../../components/Separator/Separator';

const Gender = () => {
  return (
    <LabeledInputContainer>
      <LabelContainer>
        <Text color="#e33051" size={18}>
          Gender
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(-1)}}>
          (Required)
        </Text>
      </LabelContainer>
      <Lgbtqia resizeMode="contain" />
    </LabeledInputContainer>
  );
};

const Photo = () => {
  return (
    <LabeledInputContainer>
      <LabelContainer>
        <Text color="#e33051" size={18}>
          Photo
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(-1)}}>
          (Required 1 photo)
        </Text>
      </LabelContainer>
      <Text size={10} color="#808080" customStyle={{bottom: verticalScale(7)}}>
        Can add multiple photos once profile creation is finished.
      </Text>
      <PhotoIconWrapper>
        <PhotoIconBorderLinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E72454', '#FFC227']}>
          <PhotoIconContainer>
            <Image source={GLOBAL_ASSET_URI.ADD_ICON} height={30} width={30} />
          </PhotoIconContainer>
        </PhotoIconBorderLinearGradient>
      </PhotoIconWrapper>
    </LabeledInputContainer>
  );
};

const LabeledInput = ({label, validationLabel = '', textInputProps}) => {
  return (
    <LabeledInputContainer>
      <LabelContainer>
        <Text color="#e33051" size={18}>
          {label}
        </Text>
        {validationLabel && (
          <Text
            size={14}
            color="#808080"
            customStyle={{marginLeft: scale(5), top: verticalScale(-1)}}>
            {validationLabel}
          </Text>
        )}
      </LabelContainer>
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <Input {...textInputProps} />
      </BorderLinearGradient>
    </LabeledInputContainer>
  );
};

const CustomDropDown = props => (
  <BorderLinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#E72454', '#FFC227']}>
    <SelectList
      save="value"
      boxStyles={{
        backgroundColor: 'white',
        borderWidth: 0,
        width: scale(80),
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
  const [months, setMonth] = useState(MONTHS);
  const [years, setYear] = useState(YEARS);
  const [days, setDay] = useState(DAYS);

  return (
    <Container
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}>
      <Wrapper>
        <LabeledInput label="Name" validationLabel="(Required)" />
        <Photo />
        <Gender />
        <LabelContainer style={{marginBottom: 0}}>
          <Text color="#e33051" size={18}>
            Birthday
          </Text>
          <Text
            size={14}
            color="#808080"
            customStyle={{marginLeft: scale(5), top: verticalScale(-1)}}>
            (Required)
          </Text>
        </LabelContainer>
        <BirthdayContainer>
          <CustomDropDown setSelected={setMonth} data={months} />
          <CustomDropDown setSelected={setYear} data={years} />
          <CustomDropDown setSelected={setDay} data={days} />
        </BirthdayContainer>
        <LabeledInput label="Hometown" validationLabel="(Required)" />
        <Button
          title="Continue"
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(20),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(150),
          }}
          // onPress={handleSubmit}
        />
        <Separator space={50} />
      </Wrapper>
    </Container>
  );
};

export default PrimaryDetails;
