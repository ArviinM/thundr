import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LabelContainer, LabeledInputContainer} from '../PersonalityType/Styled';
import Text from '../../../components/Text/Text';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  GLOBAL_ASSET_URI,
  LGBTQ_ASSET_URI,
  PERSONALITY_TYPE_URI,
} from '../../../utils/images';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';

const AdvancedFilters = () => {
  const [selectedHobby, setSelectedHobby] = useState([]);
  const [selectedStarSign, setSelectedStarSign] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState('');

  const hobbies = [
    'Sports & Games',
    'Arts & Crafts',
    'Film & TV',
    'Reading',
    'Music',
    'Food & Drinks',
    'Travel',
  ];

  const starSigns = [
    'Aries',
    'Scorpio',
    'Taurus',
    'Sagittarius',
    'Gemini',
    'Capricorn',
    'Cancer',
    'Aquarius',
    'Leo',
    'Pisces',
    'Virgo',
    'Libra',
  ];

  const toggleLetterSelection = (index, isHobby) => {
    if (isHobby) {
      if (selectedHobby.includes(index)) {
        setSelectedHobby(selectedHobby.filter(i => i !== index));
      } else if (selectedHobby.length < 4) {
        setSelectedHobby([...selectedHobby, index]);
      }
    } else {
      if (selectedStarSign.includes(index)) {
        setSelectedStarSign(selectedStarSign.filter(i => i !== index));
      } else if (selectedStarSign.length < 4) {
        setSelectedStarSign([...selectedStarSign, index]);
      }
    }
  };

  const Gender = () => {
    const [activeIcon, setActiveIcon] = useState('');
    const [gender, setGender] = useState(null);

    const icons = [
      {name: 'L_ICON', value: 'Lesbian'},
      {name: 'G_ICON', value: 'Gay'},
      {name: 'B_ICON', value: 'Bisexual'},
      {name: 'T_ICON', value: 'Transgender'},
      {name: 'Q_ICON', value: 'Queer'},
      {name: 'I_ICON', value: 'Intersex'},
      {name: 'A_ICON', value: 'Asexual'},
      {name: 'PLUS_ICON', value: 'Plus'},
    ];

    const renderIcons = () => {
      return icons.map((item, index) => {
        const iconWidth = () => {
          if (item.name === 'L_ICON') {
            return 22;
          } else if (item.name === 'T_ICON') {
            return 23;
          } else if (item.name === 'I_ICON') {
            return 12;
          } else if (item.name === 'PLUS_ICON') {
            return 22;
          } else {
            return 26;
          }
        };

        const iconRightMargin = () => {
          if (item.name === 'T_ICON') {
            return -7;
          } else if (item.name === 'I_ICON') {
            return -11;
          } else if (item.name === 'PLUS_ICON') {
            return -7;
          } else {
            return -6;
          }
        };

        return (
          <TouchableWithoutFeedback
            activeOpacity={1}
            key={index}
            onPress={() => {
              setActiveIcon(item.name);
              setGender(item.value);
            }}>
            {activeIcon === item.name && (
              <View
                style={{
                  position: 'absolute',
                  bottom: verticalScale(-5),
                  right: scale(iconRightMargin()),
                }}>
                <Image
                  source={LGBTQ_ASSET_URI.SELECTED_GENDER}
                  height={35}
                  width={item.name === 'I_ICON' ? 35 : 38}
                />
              </View>
            )}

            <Image
              source={LGBTQ_ASSET_URI[item.name]}
              height={26}
              width={iconWidth()}
              tintColor={activeIcon === item.name ? '#fff' : '#E43C59'}
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
            (Choose up to 4)
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

  const SelectionBox = props => {
    const {data, isHobby} = props;
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <Text color="#e33051" size={18}>
            {isHobby ? 'Hobbies' : 'Star Sign'}
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
          {data.map((selectedKey, index) => {
            const selectedData = isHobby ? selectedHobby : selectedStarSign;
            const isSelected = selectedData.includes(index);
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '50%',
                }}>
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleLetterSelection(index, isHobby)}>
                  {isSelected ? (
                    <Image
                      source={GLOBAL_ASSET_URI.CHECKED_SELECTION_BOX}
                      height={20}
                      width={20}
                    />
                  ) : (
                    <Image
                      source={GLOBAL_ASSET_URI.SELECTION_BOX}
                      height={20}
                      width={20}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  color="#808080"
                  size={15}
                  customStyle={{
                    left: scale(5),
                    top: verticalScale(-1),
                  }}>
                  {selectedKey}
                </Text>
              </View>
            );
          })}
        </View>
      </>
    );
  };

  const PersonalityType = () => {
    return (
      <>
        <Separator space={10} />
        <Text color="#e33051" size={18}>
          Personality Type
        </Text>
        <Separator space={10} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setSelectedPersonality('lion')}>
              <Image
                source={
                  selectedPersonality === 'lion'
                    ? PERSONALITY_TYPE_URI.LION_YELLOW
                    : PERSONALITY_TYPE_URI.LION_RED
                }
                height={140}
                width={140}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scale(15),
                  position: 'absolute',
                  top: verticalScale(isIosDevice() ? 60 : 55),
                }}>
                <Text color="#fff" size={12}>
                  Lion
                </Text>
                <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                  Takes charge, Determined, Assertive, Competitive, Leader,
                  Goal-driven, Self-reliant, Adventurous.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPersonality('otter')}>
              <Image
                source={
                  selectedPersonality === 'otter'
                    ? PERSONALITY_TYPE_URI.OTTER_YELLOW
                    : PERSONALITY_TYPE_URI.OTTER_RED
                }
                height={140}
                width={140}
                customStyle={{left: scale(10)}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scale(15),
                  left: scale(isIosDevice() ? 13 : 10),
                  position: 'absolute',
                  top: verticalScale(isIosDevice() ? 60 : 55),
                }}>
                <Text color="#fff" size={12}>
                  Otter
                </Text>
                <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                  Takes risks, Visionary, Energetic, Promoter, Fun-loving,
                  Enjoys change, Creative, Optimistic.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setSelectedPersonality('dog')}>
              <Image
                source={
                  selectedPersonality === 'dog'
                    ? PERSONALITY_TYPE_URI.DOG_YELLOW
                    : PERSONALITY_TYPE_URI.DOG_RED
                }
                height={140}
                width={140}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scale(15),
                  position: 'absolute',
                  top: verticalScale(isIosDevice() ? 60 : 55),
                }}>
                <Text color="#fff" size={12}>
                  Dog
                </Text>
                <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                  Loyal, Deep relationships, Adaptable, Sympathetic, Thoughtful,
                  Nurturing, Tolerant, Good listener.
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPersonality('beaver')}>
              <Image
                source={
                  selectedPersonality === 'beaver'
                    ? PERSONALITY_TYPE_URI.BEAVER_YELLOW
                    : PERSONALITY_TYPE_URI.BEAVER_RED
                }
                height={140}
                width={140}
                customStyle={{left: scale(10)}}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: scale(15),
                  left: scale(18),
                  position: 'absolute',
                  top: verticalScale(isIosDevice() ? 60 : 55),
                }}>
                <Text color="#fff" size={12}>
                  Beaver
                </Text>
                <Text color="#fff" customStyle={{textAlign: 'center'}} size={9}>
                  Deliberate, Controlled, Reserved, Practical, Factual,
                  Analytical, Inquisitive, Persistent.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Gender />
      <SelectionBox data={hobbies} isHobby={true} />
      <SelectionBox data={starSigns} isHobby={false} />
      <PersonalityType />
    </View>
  );
};

export default AdvancedFilters;
