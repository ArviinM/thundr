// React modules
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useNavigation} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Separator from '../../../components/Separator/Separator';
import AdvancedFilters from '../AdvancedFilters/AdvancedFilters';

// Utils
import {FILTERS_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_FILTERS} from '../../../ducks/Filters/actionTypes';
import Spinner from '../../../components/Spinner/Spinner';

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

const hobbies = [
  'Sports & Games',
  'Arts & Crafts',
  'Film & TV',
  'Reading',
  'Music',
  'Food & Drinks',
  'Travel',
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

const FiltersScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {subscriptionDetails} = useSelector(state => state.subscription);
  const {updatedFilters, loading, personality} = useSelector(
    state => state.filters,
  );
  const {
    ageMin,
    ageMax,
    proximity: apiProximity,
    starSign,
    hobbies: apiHobbies,
    gender: apiGender,
    // personality: apiPersonality,
  } = updatedFilters;
  const [age, setAge] = useState([Number(ageMin || 35), Number(ageMax || 80)]);
  const [proximity, setProximity] = useState(Number(apiProximity || 2));
  const [isAdvanceFilterVisible, setAdvanceFilterVisible] = useState(false);
  const withSubscription = subscriptionDetails?.withSubscription;

  const getSelectedSigns = selectedIndices => {
    const selectedSigns = selectedIndices.map(index => starSigns[index]);
    return selectedSigns.join(', ');
  };

  const getSelectedHobby = selectedIndices => {
    const selectedHobbyData = selectedIndices.map(index => hobbies[index]);
    return selectedHobbyData.join(', ');
  };

  const getSelectedGender = selectedIndices => {
    return selectedIndices.map(index => genderIcons[index].value).join(', ');
  };

  // Convert API response from string to array
  const stringToArray = inputString => {
    const trimmedString = inputString?.trim();
    const arrayResult = trimmedString?.split(',');
    const finalArray = arrayResult?.map(item => item.trim());

    return finalArray;
  };

  // Default value of gender if existing
  const defaultGenderState = (genderIcons, genderIdentities) => {
    const matchedIndices = [];
    genderIcons.forEach((icon, index) => {
      if (genderIdentities?.includes(icon.value)) {
        matchedIndices.push(index);
      }
    });

    return matchedIndices;
  };

  // Default value of star sign if existing
  const defaultStarSignState = (starSigns, namesToMatch) => {
    const matchedIndices = [];
    starSigns.forEach((sign, index) => {
      if (namesToMatch?.includes(sign)) {
        matchedIndices.push(index);
      }
    });
    return matchedIndices;
  };

  // Default value of hobbies if existing
  const defaultHobbyState = (hobbies, namesToMatch) => {
    const matchedIndices = [];
    hobbies.forEach((sign, index) => {
      if (namesToMatch?.includes(sign)) {
        matchedIndices.push(index);
      }
    });
    return matchedIndices;
  };

  const [gender, setGender] = useState(
    apiGender ? defaultGenderState(genderIcons, stringToArray(apiGender)) : [],
  );
  const [activeGenderIcon, setActiveGenderIcon] = useState(
    apiGender ? defaultGenderState(genderIcons, stringToArray(apiGender)) : [],
  );
  const [selectedHobby, setSelectedHobby] = useState(
    apiHobbies ? defaultHobbyState(hobbies, stringToArray(apiHobbies)) : [],
  );
  const [selectedStarSign, setSelectedStarSign] = useState(
    starSigns ? defaultStarSignState(starSigns, stringToArray(starSign)) : [],
  );
  const [selectedPersonality, setSelectedPersonality] = useState(
    personality ? stringToArray(personality) : [],
  );

  const renderCustomMarker = () => (
    <Image source={FILTERS_ASSET_URI.SLIDER_MARKER} height={50} width={50} />
  );

  if (loading && !updatedFilters.length) {
    return <Spinner />;
  }

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{backgroundColor: '#EDE8E5', flexGrow: 1}}>
      <View
        style={{
          flexDirection: 'row',
          gap: scale(240),
          alignItems: 'center',
          justifyContent: 'center',
          top: verticalScale(20),
          zIndex: 1,
        }}>
        <TouchableOpacity
          style={{left: scale(10)}}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'DashboardTabs'}],
            })
          }>
          <Image source={GLOBAL_ASSET_URI.BACK_ICON} width={25} height={25} />
        </TouchableOpacity>
        <Button
          title="Save"
          style={{width: scale(65), height: verticalScale(35)}}
          onPress={() => {
            dispatch({
              type: UPDATE_FILTERS,
              payload: {
                ageMax: age[1],
                ageMin: age[0],
                proximity: Number(proximity),
                gender: getSelectedGender(gender),
                starSign: getSelectedSigns(selectedStarSign),
                hobbies: getSelectedHobby(selectedHobby),
                personality: selectedPersonality?.join(', '),
              },
            });
            navigation.reset({
              index: 0,
              routes: [{name: 'DashboardTabs'}],
            });
          }}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text size={30} fontFamily="ClimateCrisis-Regular" color="#E43D59">
          Filters
        </Text>
        <Text
          fontFamily="Montserrat-Regular"
          color="#808080"
          customStyle={{textAlign: 'center', paddingHorizontal: scale(35)}}>
          There are plenty of fishes in the sea; make sure they are the right
          age and location, mars.
        </Text>
      </View>
      <Separator space={20} />
      <View style={{left: scale(28)}}>
        <Text size={25} color="#E43D59" weight={700}>
          Age
        </Text>
        <Separator space={5} />
        <Text
          weight={700}
          size={20}
          color="#808080">{`Between ${age[0]} to ${age[1]}`}</Text>
      </View>
      <Separator space={10} />
      <View style={{alignSelf: 'center'}}>
        <MultiSlider
          values={age}
          sliderLength={300}
          onValuesChange={newValues => setAge(newValues)}
          customMarker={renderCustomMarker}
          min={35}
          max={80}
          step={1}
          allowOverlap
          snapped
          selectedStyle={{
            backgroundColor: '#E43D59',
            height: verticalScale(5),
          }}
          unselectedStyle={{
            backgroundColor: '#808080',
            height: verticalScale(5),
          }}
          containerStyle={{
            height: verticalScale(-30),
            marginBottom: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </View>
      <Separator space={30} />
      <View style={{left: scale(28)}}>
        <Text size={25} color="#E43D59" weight={700}>
          Proximity
        </Text>
        <Separator space={5} />
        <Text
          weight={700}
          size={20}
          color="#808080">{`Up to ${proximity}km away`}</Text>
      </View>
      <Separator space={10} />
      <View style={{alignSelf: 'center'}}>
        <MultiSlider
          values={[proximity]}
          sliderLength={300}
          onValuesChange={newValue => setProximity(newValue)}
          customMarker={renderCustomMarker}
          min={2}
          max={250}
          step={2}
          allowOverlap
          snapped
          selectedStyle={{
            backgroundColor: '#E43D59',
            height: verticalScale(5),
          }}
          unselectedStyle={{
            backgroundColor: '#808080',
            height: verticalScale(5),
          }}
          containerStyle={{
            height: verticalScale(-30),
            marginBottom: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      </View>
      <View style={{top: verticalScale(20)}}>
        <TouchableOpacity
          disabled={!withSubscription}
          style={{alignItems: 'center'}}
          onPress={() => setAdvanceFilterVisible(!isAdvanceFilterVisible)}>
          <Image
            source={
              withSubscription
                ? FILTERS_ASSET_URI.ADVANCED_FILTERS
                : FILTERS_ASSET_URI.DISABLED_ADVANCED_FILTERS
            }
            width={300}
            height={100}
          />
        </TouchableOpacity>
        <Separator space={25} />
        <Text
          fontFamily="Montserrat-Regular"
          size={isIosDevice() ? 15 : 12}
          color="#808080"
          customStyle={{
            textAlign: 'center',
            bottom: verticalScale(50),
            paddingHorizontal: scale(20),
          }}>
          {withSubscription
            ? 'More filters, more fun. Gora na!'
            : 'More filters, more fun! Sign up now for an even more flexible customization.'}
        </Text>
      </View>
      {!withSubscription && (
        <TouchableOpacity onPress={() => navigation.navigate('ThunderBolt')}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={FILTERS_ASSET_URI.SUBSCRIBE_BUTTON}
              width={220}
              height={80}
            />
          </View>
        </TouchableOpacity>
      )}
      {isAdvanceFilterVisible && (
        <AdvancedFilters
          gender={gender}
          setGender={setGender}
          activeGenderIcon={activeGenderIcon}
          setActiveGenderIcon={setActiveGenderIcon}
          selectedHobby={selectedHobby}
          setSelectedHobby={setSelectedHobby}
          selectedStarSign={selectedStarSign}
          setSelectedStarSign={setSelectedStarSign}
          selectedPersonality={selectedPersonality}
          setSelectedPersonality={setSelectedPersonality}
          starSigns={starSigns}
          hobbies={hobbies}
          genderIcons={genderIcons}
        />
      )}
    </ScrollView>
  );
};

export default FiltersScreen;
