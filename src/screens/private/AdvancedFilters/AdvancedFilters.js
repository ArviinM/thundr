// React modules
import React, {useState} from 'react';
import {View} from 'react-native';

// Components
import Separator from '../../../components/Separator/Separator';
import Personality from '../../../composition/Personality/Personality';
import SelectionBox from '../../../composition/SelectionBox/SelectionBox';
import GenderSelection from '../../../composition/GenderSelection/GenderSelection';

// Utils
import {verticalScale} from '../../../utils/commons';

const AdvancedFilters = () => {
  const [selectedHobby, setSelectedHobby] = useState([]);
  const [selectedStarSign, setSelectedStarSign] = useState([]);
  const [selectedPersonality, setSelectedPersonality] = useState([]);
  const [activeGenderIcon, setActiveGenderIcon] = useState([]);
  const [gender, setGender] = useState([]);

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

  const genderIcons = [
    {name: 'L_ICON', value: 'Lesbian'},
    {name: 'G_ICON', value: 'Gay'},
    {name: 'B_ICON', value: 'Bisexual'},
    {name: 'T_ICON', value: 'Transgender'},
    {name: 'Q_ICON', value: 'Queer'},
    {name: 'I_ICON', value: 'Intersex'},
    {name: 'A_ICON', value: 'Asexual'},
    {name: 'PLUS_ICON', value: 'Plus'},
  ];

  const toggleGenderSelection = (index, gender) => {
    if (gender.includes(index)) {
      setGender(gender.filter(i => i !== index));
      setActiveGenderIcon(gender.filter(i => i !== index));
    } else if (gender.length < 4) {
      setGender([...gender, index]);
      setActiveGenderIcon([...gender, index]);
    }
  };

  const toggleCheckboxSelector = (index, isHobby) => {
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

  const togglePersonality = personality => {
    if (selectedPersonality.includes(personality)) {
      setSelectedPersonality(
        selectedPersonality.filter(p => p !== personality),
      );
    } else {
      if (selectedPersonality.length < 2) {
        setSelectedPersonality([...selectedPersonality, personality]);
      } else {
        setSelectedPersonality([personality, ...selectedPersonality.slice(1)]);
      }
    }
  };

  return (
    <View style={{alignItems: 'center', paddingBottom: verticalScale(30)}}>
      <View>
        <GenderSelection
          genderIcons={genderIcons}
          activeGenderIcon={activeGenderIcon}
          toggleGenderSelection={toggleGenderSelection}
          gender={gender}
        />
      </View>
      <Separator space={20} />
      <View>
        <SelectionBox
          data={hobbies}
          isHobby={true}
          selectedHobby={selectedHobby}
          toggleCheckboxSelector={toggleCheckboxSelector}
        />
      </View>
      <Separator space={20} />
      <View>
        <SelectionBox
          data={starSigns}
          isHobby={false}
          selectedStarSign={selectedStarSign}
          toggleCheckboxSelector={toggleCheckboxSelector}
        />
      </View>
      <Separator space={20} />
      <View>
        <Personality
          selectedPersonality={selectedPersonality}
          togglePersonality={togglePersonality}
        />
      </View>
    </View>
  );
};

export default AdvancedFilters;
