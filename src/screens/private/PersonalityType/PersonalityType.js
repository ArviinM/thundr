import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {
  BorderLinearGradient,
  Container,
  Input,
  LabelContainer,
  LabeledInputContainer,
} from './Styled';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';
import {GLOBAL_ASSET_URI, PERSONALITY_TYPE_URI} from '../../../utils/images';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../../../components/Button/Button';

const hobbies = [
  'Sports & Games',
  'Arts & Crafts',
  'Film & TV',
  'Reading',
  'Music',
  'Food & Drinks',
  'Travel',
];

const LabeledInput = ({label, validationLabel = '', textInputProps, isBio}) => {
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
        <Input {...textInputProps} multiline={isBio} />
      </BorderLinearGradient>
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

const PersonalityType = () => {
  const [selectedHobby, setSelectedHobby] = useState([]);

  const toggleLetterSelection = index => {
    // Check if the letter is already selected
    if (selectedHobby.includes(index)) {
      // Deselect the letter
      setSelectedHobby(selectedHobby.filter(i => i !== index));
    } else if (selectedHobby.length < 4) {
      // Select the letter if not already selected and limit to 4 selections
      setSelectedHobby([...selectedHobby, index]);
    }
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={isIosDevice()}>
      <LabeledInput label="Bio" isBio={true} />
      <Separator space={20} />
      <LabeledInput label="Work" />
      <Separator space={20} />
      <LabeledInput label="Location" />
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <Text color="#e33051" size={18}>
          Hobbies
        </Text>
        <Text
          size={14}
          color="#808080"
          customStyle={{marginLeft: scale(5), top: verticalScale(3)}}>
          (Choose up to 4)
        </Text>
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {hobbies.map((hobby, index) => {
          const isSelected = selectedHobby.includes(index);
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <TouchableOpacity
                key={index}
                onPress={() => toggleLetterSelection(index)}>
                {isSelected ? (
                  <Image
                    source={GLOBAL_ASSET_URI.CHECKED_SELECTION_BOX}
                    height={30}
                    width={30}
                  />
                ) : (
                  <Image
                    source={GLOBAL_ASSET_URI.SELECTION_BOX}
                    height={30}
                    width={30}
                  />
                )}
              </TouchableOpacity>
              <Text color="#808080" size={15} customStyle={{left: scale(5)}}>
                {hobby}
              </Text>
            </View>
          );
        })}
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18}>
            Height
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown width={60} defaultButtonText="5'" />
            <CustomDropdown width={60} defaultButtonText="7'" />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18}>
            Star Sign
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={isIosDevice() ? 140 : 135}
            defaultButtonText="Sagittarius"
          />
        </View>
      </View>
      <Separator space={10} />
      <View>
        <Text color="#e33051" size={18}>
          Education
        </Text>
        <Separator space={10} />
        <CustomDropdown width={285} defaultButtonText="Doctorate" />
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18}>
            Drinking
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown
              width={isIosDevice() ? 140 : 130}
              defaultButtonText="Occasional"
            />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18}>
            Smoking
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={isIosDevice() ? 140 : 130}
            defaultButtonText="Occasional"
          />
        </View>
      </View>
      <Separator space={10} />
      <View>
        <Text color="#e33051" size={18}>
          Religion
        </Text>
        <Separator space={10} />
        <CustomDropdown width={285} defaultButtonText="Christian" />
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18}>
            Pet
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown
              width={isIosDevice() ? 140 : 130}
              defaultButtonText="Dog"
            />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18}>
            Politics
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={isIosDevice() ? 140 : 130}
            defaultButtonText="Apolitical"
          />
        </View>
      </View>
      <Separator space={10} />
      <Text color="#e33051" size={18}>
        Personality Type
      </Text>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={PERSONALITY_TYPE_URI.RED_BG}
            height={isIosDevice() ? 145 : 130}
            width={isIosDevice() ? 145 : 130}
          />
          <Image
            source={PERSONALITY_TYPE_URI.RED_BG}
            height={isIosDevice() ? 145 : 130}
            width={isIosDevice() ? 145 : 130}
            customStyle={{left: scale(10)}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={PERSONALITY_TYPE_URI.RED_BG}
            height={isIosDevice() ? 145 : 130}
            width={isIosDevice() ? 145 : 130}
          />
          <Image
            source={PERSONALITY_TYPE_URI.RED_BG}
            height={isIosDevice() ? 145 : 130}
            width={isIosDevice() ? 145 : 130}
            customStyle={{left: scale(10)}}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: scale(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title="Continue"
          style={{
            top: verticalScale(20),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(isIosDevice() ? 140 : 130),
          }}
        />
        <Button
          title="Skip"
          style={{
            top: verticalScale(20),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(isIosDevice() ? 140 : 130),
            backgroundColor: '#9C9EA1',
          }}
        />
      </View>
      <Separator space={60} />
    </Container>
  );
};

export default PersonalityType;
