// React modules
import React, {useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';

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
  DayContainer,
  Input,
  LabelContainer,
  LabeledInputContainer,
  Lgbtqia,
  PhotoIcon,
  PhotoIconBorderLinearGradient,
  PhotoIconContainer,
  PhotoIconWrapper,
  Wrapper,
  YearContainer,
} from './Styled';
import Image from '../../../components/Image/Image';
import {GLOBAL_ASSET_URI, LGBTQ_ASSET_URI} from '../../../utils/images';
import Separator from '../../../components/Separator/Separator';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const iconNames = [
  'L_ICON',
  'G_ICON',
  'B_ICON',
  'T_ICON',
  'Q_ICON',
  'I_ICON',
  'A_ICON',
  'PLUS_ICON',
];

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

const PrimaryDetails = () => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [selected, setSelected] = useState('');
  const [months, setMonth] = useState(MONTHS);
  const [years, setYear] = useState(YEARS);
  const [days, setDay] = useState(DAYS);

  const options = {
    title: 'Select an Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo', // Specify that you want to pick photos
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageSource(source);
      }
    });
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
        <Text
          size={10}
          color="#808080"
          customStyle={{bottom: verticalScale(7)}}>
          Can add multiple photos once profile creation is finished.
        </Text>
        <PhotoIconWrapper onPress={openImageLibrary}>
          <PhotoIconBorderLinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E72454', '#FFC227']}>
            <PhotoIconContainer>
              <Image
                source={GLOBAL_ASSET_URI.ADD_ICON}
                height={30}
                width={30}
              />
            </PhotoIconContainer>
          </PhotoIconBorderLinearGradient>
        </PhotoIconWrapper>
      </LabeledInputContainer>
    );
  };

  const Gender = () => {
    const renderIcons = () => {
      return iconNames.map((iconName, index) => {
        const iconWidth = () => {
          if (iconName === 'L_ICON') {
            return 22;
          } else if (iconName === 'T_ICON') {
            return 23;
          } else if (iconName === 'I_ICON') {
            return 12;
          } else if (iconName === 'PLUS_ICON') {
            return 22;
          } else {
            return 26;
          }
        };
        const iconRightMargin = () => {
          if (iconName === 'T_ICON') {
            return -7;
          } else if (iconName === 'I_ICON') {
            return -11;
          } else if (iconName === 'PLUS_ICON') {
            return -7;
          } else {
            return -6;
          }
        };
        return (
          <TouchableWithoutFeedback
            activeOpacity={1}
            key={index}
            onPress={() => setActiveIcon(iconName)}>
            {activeIcon === iconName && (
              <View
                style={{
                  position: 'absolute',
                  bottom: verticalScale(-5),
                  right: scale(iconRightMargin()),
                }}>
                <Image
                  source={LGBTQ_ASSET_URI.SELECTED_GENDER}
                  height={35}
                  width={iconName === 'I_ICON' ? 35 : 38}
                />
              </View>
            )}

            <Image
              source={LGBTQ_ASSET_URI[iconName]}
              height={26}
              width={iconWidth()}
              tintColor={activeIcon === iconName ? '#fff' : '#E43C59'}
              changeTintColor
            />
          </TouchableWithoutFeedback>
        );
      });
    };

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
        <View
          style={{
            flexDirection: 'row',
            gap: scale(12),
            alignContent: 'center',
          }}>
          {renderIcons()}
        </View>
      </LabeledInputContainer>
    );
  };

  const CustomDropdown = props => (
    <BorderLinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E72454', '#FFC227']}>
      <SelectDropdown
        data={['Option1', 'Option2']}
        defaultButtonText={props.defaultButtonText || ''}
        buttonStyle={{
          backgroundColor: '#fff',
          flex: 1,
          borderRadius: 10,
          width: scale(props.width),
        }}
        buttonTextStyle={{
          fontWeight: '700',
          fontSize: scale(12),
          color: '#808080',
        }}
        dropdownIconPosition="right"
        // renderDropdownIcon={renderDropdownIcon}
      />
    </BorderLinearGradient>
  );

  return (
    <Container
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={isIosDevice()}>
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
        <View
          style={{
            flexDirection: 'row',
            gap: scale(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomDropdown
            setSelected={setMonth}
            data={months}
            placeholder="Month"
            width={78}
            defaultButtonText="March"
          />
          <CustomDropdown
            setSelected={setDay}
            data={days}
            placeholder="Day"
            width={78}
            defaultButtonText="11"
          />
          <CustomDropdown
            setSelected={setYear}
            data={years}
            placeholder="Year"
            width={78}
            defaultButtonText="1998"
          />
        </View>
        <LabeledInput label="Hometown" validationLabel="(Required)" />
        <Button
          title="Continue"
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(15),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(150),
          }}
          onPress={() => navigation.navigate('CompatibilityQuestions')}
        />
        <Separator space={30} />
      </Wrapper>
    </Container>
  );
};

export default PrimaryDetails;
