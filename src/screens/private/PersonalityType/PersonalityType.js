import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  drinkingAndSmoking,
  education,
  feet,
  inches,
  isIosDevice,
  pets,
  politics,
  religion,
  removeSpaces,
  scale,
  starSign,
  verticalScale,
} from '../../../utils/commons';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  SUBMIT_CUSTOMER_DETAILS,
  UPDATE_PROFILE_CREATION_STATE,
} from '../../../ducks/ProfileCreation/actionTypes';
import Modal from '../../../composition/Modal/Modal';
import {Overlay} from 'react-native-elements';
import {
  GET_MATCH_LIST,
  UPDATE_DASHBOARD_STATE,
} from '../../../ducks/Dashboard/actionTypes';

const hobbies = [
  'Sports & Games',
  'Arts & Crafts',
  'Film & TV',
  'Reading',
  'Music',
  'Food & Drinks',
  'Travel',
];

const LabeledInput = ({
  label,
  validationLabel = '',
  textInputProps,
  isBio,
  value,
  setter,
  clearState,
}) => {
  const clearTextInputs = label === 'Education' || label === 'Religion';
  return (
    <LabeledInputContainer>
      <LabelContainer>
        <Text color="#e33051" size={18} weight={700}>
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
        <Input
          {...textInputProps}
          multiline={isBio}
          value={value}
          onChangeText={setter}
        />
        {clearTextInputs && (
          <TouchableOpacity
            onPress={clearState}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              right: scale(15),
              top: verticalScale(8),
            }}>
            <Image
              source={GLOBAL_ASSET_URI.CLOSE_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        )}
      </BorderLinearGradient>
    </LabeledInputContainer>
  );
};

const CustomDropdown = props => {
  const handleSelect = selectedItem => {
    props.stateUpdateFunction(selectedItem);
  };

  return (
    <BorderLinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#E72454', '#FFC227']}>
      <SelectDropdown
        data={props.data}
        onSelect={handleSelect}
        buttonTextAfterSelection={() => {
          return props.selectedItem;
        }}
        defaultButtonText={props.selectedItem || props.placeholder}
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
};

const PersonalityType = props => {
  const {fromEditProfileScreen, currentUserProfile} = props;

  const {loginData} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const stringToArray = inputString => {
    const trimmedString = inputString?.trim();
    const arrayResult = trimmedString?.split(',');
    const finalArray = arrayResult?.map(item => item.trim());

    return finalArray;
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

  const [selectedHobby, setSelectedHobby] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.hobbies
      ? defaultHobbyState(
          hobbies,
          stringToArray(currentUserProfile?.customerDetails?.hobbies),
        )
      : [],
  );

  const [selectedPersonality, setSelectedPersonality] = useState(
    fromEditProfileScreen &&
      currentUserProfile?.customerDetails?.personalityType
      ? currentUserProfile?.customerDetails?.personalityType
      : '',
  );
  const [bio, setBio] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.bio
      ? currentUserProfile?.customerDetails?.bio
      : '',
  );
  const [work, setWork] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.work
      ? currentUserProfile?.customerDetails?.work
      : '',
  );
  const [location, setLocation] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.location
      ? currentUserProfile?.customerDetails?.location
      : '',
  );
  const [startSignState, setStartSignState] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.starSign
      ? currentUserProfile?.customerDetails?.starSign
      : '',
  );
  const [educationState, setEducationState] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.education
      ? currentUserProfile?.customerDetails?.education
      : '',
  );
  const [drinking, setDrinking] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.drinking
      ? currentUserProfile?.customerDetails?.drinking
      : '',
  );
  const [smoking, setSmoking] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.smoking
      ? currentUserProfile?.customerDetails?.smoking
      : '',
  );
  const [religionState, setReligionState] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.religion
      ? currentUserProfile?.customerDetails?.religion
      : '',
  );
  const [petState, setPetState] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.pet
      ? currentUserProfile?.customerDetails?.pet
      : '',
  );
  const [politicsState, setPoliticsState] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.politics
      ? currentUserProfile?.customerDetails?.politics
      : '',
  );
  const [otherEducationValue, setOtherEducationValue] = useState('');
  const [otherReligionValue, setOtherReligionValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const parseHeight = heightString => {
    const [feetString, inchesString] = heightString?.split('ft ');
    const ftState = parseInt(feetString, 10) || 0;
    const inState = parseInt(inchesString, 10) || 0;
    return {ftState, inState};
  };

  const [heightFt, setHeightFt] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.height
      ? parseHeight(currentUserProfile?.customerDetails?.height)?.ftState +
          ' Ft'
      : '',
  );
  const [heightIn, setHeightIn] = useState(
    fromEditProfileScreen && currentUserProfile?.customerDetails?.height
      ? parseHeight(currentUserProfile?.customerDetails?.height)?.inState +
          ' In'
      : '',
  );

  const getSelectedHobby = selectedIndices => {
    const selectedHobbyData = selectedIndices.map(index => hobbies[index]);
    return selectedHobbyData.join(', ');
  };

  useEffect(() => {
    if (fromEditProfileScreen) {
      dispatch({
        type: UPDATE_DASHBOARD_STATE,
        newState: {
          personalityDetailsState: {
            bio,
            work,
            location,
            hobbies: getSelectedHobby(selectedHobby),
            height: currentUserProfile?.customerDetails?.height
              ? `${removeSpaces(heightFt.toLocaleLowerCase())} ${removeSpaces(
                  heightIn.toLocaleLowerCase(),
                )}`
              : `${heightFt} ${heightIn}`,
            starSign: startSignState,
            education: educationState,
            drinking,
            smoking,
            religion: religionState,
            pet: petState,
            personalityType: selectedPersonality,
            politics: politicsState,
            gender: 'Others',
          },
        },
      });
    }
  }, [
    dispatch,
    bio,
    work,
    location,
    heightFt,
    heightIn,
    startSignState,
    educationState,
    drinking,
    smoking,
    religionState,
    petState,
    selectedPersonality,
    politicsState,
    selectedHobby,
  ]);

  useEffect(() => {
    dispatch({type: GET_MATCH_LIST, payload: {sub: loginData?.sub}});
  }, [dispatch]);

  const toggleLetterSelection = index => {
    if (selectedHobby.includes(index)) {
      setSelectedHobby(selectedHobby.filter(i => i !== index));
    } else if (selectedHobby.length < 4) {
      setSelectedHobby([...selectedHobby, index]);
    }
  };

  const getSelectedHobbiesString = () => {
    return selectedHobby?.map(index => hobbies[index]).join(',');
  };

  const renderModal = () => {
    return (
      <Overlay
        onBackdropPress={() => setShowModal(false)}
        overlayStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E33051',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            {translateX: -scale(125)},
            {translateY: -verticalScale(40)},
          ],
          height: 'auto',
          width: scale(250),
          borderRadius: 20,
        }}
        isVisible={showModal}>
        <Text
          size={18}
          color="#fff"
          weight={700}
          customStyle={{textAlign: 'center'}}>
          Skipping this may affect the personalization of your profile.
        </Text>
        <Separator space={15} />
        <View style={{flexDirection: 'row', gap: scale(10)}}>
          <Button
            title="Continue"
            primary
            textStyle={{weight: 400}}
            textColor="#59595B"
            style={{
              height: verticalScale(isIosDevice() ? 30 : 40),
              width: scale(100),
              backgroundColor: '#FFFFFF',
            }}
            onPress={() => {
              setShowModal(false);
              dispatch({
                type: SUBMIT_CUSTOMER_DETAILS,
                payload: {
                  bio: '',
                  work: '',
                  location: '',
                  height: '',
                  starSign: '',
                  education: '',
                  drinking: '',
                  smoking: '',
                  religion: '',
                  pet: '',
                  politics: '',
                  personalityType: '',
                },
              });
            }}
          />
          <Button
            title="Go Back"
            primary
            textStyle={{weight: 400}}
            textColor="#E33051"
            style={{
              height: verticalScale(isIosDevice() ? 30 : 40),
              width: scale(100),
              backgroundColor: '#FFFFFF',
            }}
            onPress={() => setShowModal(false)}
          />
        </View>
      </Overlay>
    );
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={isIosDevice()}>
      {renderModal()}
      <LabeledInput label="Bio" isBio={true} value={bio} setter={setBio} />
      <Separator space={20} />
      <LabeledInput label="Work" value={work} setter={setWork} />
      <Separator space={20} />
      <LabeledInput label="Location" value={location} setter={setLocation} />
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <Text color="#e33051" size={18} weight={700}>
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
                {hobby}
              </Text>
            </View>
          );
        })}
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18} weight={700}>
            Height
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown
              width={60}
              defaultButtonText="5'"
              data={feet}
              placeholder="Ft"
              stateUpdateFunction={setHeightFt}
              selectedItem={heightFt}
            />
            <CustomDropdown
              width={60}
              defaultButtonText="7'"
              data={inches}
              placeholder="In"
              stateUpdateFunction={setHeightIn}
              selectedItem={heightIn}
            />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18} weight={700}>
            Star Sign
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={135}
            defaultButtonText="Sagittarius"
            data={starSign}
            placeholder="Star Sign"
            stateUpdateFunction={setStartSignState}
            selectedItem={startSignState}
          />
        </View>
      </View>
      <Separator space={10} />
      <View>
        {educationState === 'Others' ? (
          <LabeledInput
            label="Education"
            value={otherEducationValue}
            setter={setOtherEducationValue}
            clearState={() => {
              setEducationState('');
              setOtherEducationValue('');
            }}
          />
        ) : (
          <>
            <Text color="#e33051" size={18} weight={700}>
              Education
            </Text>
            <Separator space={10} />
            <CustomDropdown
              width={285}
              defaultButtonText="Doctorate"
              data={education}
              placeholder="Education"
              stateUpdateFunction={setEducationState}
              selectedItem={educationState}
            />
          </>
        )}
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18} weight={700}>
            Drinking
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown
              width={135}
              defaultButtonText="Occasional"
              data={drinkingAndSmoking}
              placeholder="Drinking"
              stateUpdateFunction={setDrinking}
              selectedItem={drinking}
            />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18} weight={700}>
            Smoking
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={135}
            defaultButtonText="Occasional"
            data={drinkingAndSmoking}
            placeholder="Smoking"
            stateUpdateFunction={setSmoking}
            selectedItem={smoking}
          />
        </View>
      </View>
      <Separator space={10} />
      <View>
        {religionState === 'Others' ? (
          <LabeledInput
            label="Religion"
            value={otherReligionValue}
            setter={setOtherReligionValue}
            clearState={() => {
              setReligionState('');
              setOtherReligionValue('');
            }}
          />
        ) : (
          <>
            <Text color="#e33051" size={18} weight={700}>
              Religion
            </Text>
            <Separator space={10} />
            <CustomDropdown
              width={285}
              defaultButtonText="Christian"
              data={religion}
              placeholder="Religion"
              stateUpdateFunction={setReligionState}
              selectedItem={religionState}
            />
          </>
        )}
      </View>
      <Separator space={10} />
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text color="#e33051" size={18} weight={700}>
            Pet
          </Text>
          <Separator space={10} />
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <CustomDropdown
              width={135}
              defaultButtonText="Dog"
              data={pets}
              placeholder="Pets"
              stateUpdateFunction={setPetState}
              selectedItem={petState}
            />
          </View>
        </View>
        <View style={{left: scale(10)}}>
          <Text color="#e33051" size={18} weight={700}>
            Politics
          </Text>
          <Separator space={10} />
          <CustomDropdown
            width={135}
            defaultButtonText="Apolitical"
            data={politics}
            placeholder="Politics"
            stateUpdateFunction={setPoliticsState}
            selectedItem={politicsState}
          />
        </View>
      </View>
      <Separator space={10} />
      <Text color="#e33051" size={18} weight={700}>
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
                Takes risks, Visionary, Energetic, Promoter, Fun-loving, Enjoys
                change, Creative, Optimistic.
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
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {!fromEditProfileScreen && (
          <View style={{flexDirection: 'row', gap: scale(10)}}>
            <Button
              title="Continue"
              onPress={() => {
                dispatch({
                  type: SUBMIT_CUSTOMER_DETAILS,
                  payload: {
                    bio,
                    work,
                    location,
                    height: `${removeSpaces(
                      heightFt.toLocaleLowerCase(),
                    )} ${removeSpaces(heightIn.toLocaleLowerCase())}`,
                    hobbies: getSelectedHobbiesString(),
                    starSign: startSignState,
                    education: otherEducationValue || educationState,
                    drinking,
                    smoking,
                    religion: otherReligionValue || religionState,
                    pet: petState,
                    politics: politicsState,
                    personalityType: selectedPersonality,
                  },
                });
              }}
              style={{
                top: verticalScale(20),
                height: verticalScale(isIosDevice() ? 30 : 40),
                width: scale(140),
              }}
            />
            <Button
              title="Skip"
              onPress={() => setShowModal(true)}
              style={{
                top: verticalScale(20),
                height: verticalScale(isIosDevice() ? 30 : 40),
                width: scale(140),
                backgroundColor: '#9C9EA1',
              }}
            />
          </View>
        )}
      </View>
      <Separator space={60} />
    </Container>
  );
};

export default PersonalityType;
