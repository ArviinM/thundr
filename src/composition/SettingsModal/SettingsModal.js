// React modules
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {Overlay} from 'react-native-elements';
import CheckBox from 'react-native-check-box';

// Components
import Separator from '../../components/Separator/Separator';
import Text from '../../components/Text/Text';
import Image from '../../components/Image/Image';
import TextInput from '../TextInput/TextInput';
import Button from '../../components/Button/Button';
import DeactivateAccountModal from '../DeactivateAccountModal/DeactivateAccountModal';

// Utils
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {GLOBAL_ASSET_URI, SETTINGS_URI} from '../../utils/images';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_CUSTOMER_SURVEY} from '../../ducks/Settings/actionTypes';
import {START_LOGOUT} from '../../ducks/Login/actionTypes';
import {UPDATE_PERSISTED_STATE} from '../../ducks/PersistedState/actionTypes';

const OtherCheckBoxItem = ({
  label,
  isDisabled,
  setSecondarySelectedItems,
  setInputValue,
}) => {
  const [checked, setChecked] = useState(false);
  const showTextInput = label === 'Other reasons. Please specify';

  return (
    <View style={{marginLeft: scale(20)}}>
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          disabled={isDisabled}
          checkedImage={
            <Image
              source={SETTINGS_URI.SETTINGS_CHECKED_CHECKBOX}
              height={20}
              width={18}
            />
          }
          unCheckedImage={
            <Image
              source={SETTINGS_URI.SETTINGS_CHECKBOX}
              height={20}
              width={18}
            />
          }
          isChecked={checked}
          onClick={() => {
            setChecked(!checked);
            setSecondarySelectedItems(label);
          }}
        />
        <Text color="#fff" size={15} customStyle={{marginLeft: scale(10)}}>
          {label}
        </Text>
      </View>
      {showTextInput && (
        <TextInput
          onChangeText={text => setInputValue(text)}
          inputStyle={{
            width: scale(200),
            height: verticalScale(isIosDevice() ? 30 : 40),
          }}
        />
      )}
    </View>
  );
};

const CheckboxItem = ({
  label,
  handleCheckBoxPress,
  setSecondarySelectedItems,
  setInputValue,
}) => {
  const [checked, setChecked] = useState(false);
  const showTextInput =
    label === 'Issues with perks. Please specify' ||
    label === 'Others. Please specify';
  const showOtherCheckboxes = label === 'Dissatisfied with the app';
  const [dissatisfiedValues, setDissatisfiedValues] = useState([
    'App crashes',
    'Limited options (for mare / jowa)',
    'I don’t find my matches engaging during chat',
    'Other reasons. Please specify',
  ]);

  return (
    <View style={{marginVertical: scale(5)}}>
      <View style={{flexDirection: 'row'}}>
        <CheckBox
          checkedImage={
            <Image
              source={SETTINGS_URI.SETTINGS_CHECKED_CHECKBOX}
              height={20}
              width={18}
            />
          }
          unCheckedImage={
            <Image
              source={SETTINGS_URI.SETTINGS_CHECKBOX}
              height={20}
              width={18}
            />
          }
          isChecked={checked}
          onClick={() => {
            setChecked(!checked);
            handleCheckBoxPress(label);
          }}
        />
        <Text color="#fff" size={15} customStyle={{marginLeft: scale(10)}}>
          {label}
        </Text>
      </View>
      {showOtherCheckboxes &&
        dissatisfiedValues.map((value, index) => (
          <OtherCheckBoxItem
            key={index}
            label={value}
            isDisabled={showOtherCheckboxes && !checked}
            setSecondarySelectedItems={setSecondarySelectedItems}
            setInputValue={setInputValue}
          />
        ))}
      {showTextInput && (
        <TextInput
          inputStyle={{
            width: scale(200),
            height: verticalScale(isIosDevice() ? 30 : 40),
          }}
        />
      )}
    </View>
  );
};

const SettingsModal = props => {
  const dispatch = useDispatch();
  const {displayModal, setDisplayModal} = props;
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.persistedState);
  const {customerSurvey} = useSelector(state => state.settings);
  const isUnsubscribe = displayModal === 'unsubscribe';
  const [unsubscribeValues, setUnsubscribeValues] = useState([
    'Issues with billings',
    'Focus muna on self love',
    'I have changed my mind',
    'Issues with perks. Please specify',
    'Others. Please specify',
  ]);
  const [deleteValues, setDeleteValues] = useState([
    'In a relationship now/I met someone',
    'Focus muna on self love',
    'Issues with perks',
    'Dissatisfied with the app',
    'Others. Please specify',
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [secondarySelectedItems, setSecondarySelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [displayDeactivateModal, setDisplayDeactivateModal] = useState(false);

  const handleCheckBoxPress = value => {
    const updatedSelectedItems = selectedItems.includes(value)
      ? selectedItems.filter(item => item !== value)
      : [...selectedItems, value];

    setSelectedItems(updatedSelectedItems);
  };

  const handleDeleteOrUnsubscribe = () => {
    const apiPayload = selectedItems.map(value => ({
      sub: loginData?.sub || sub,
      type: isUnsubscribe ? 'UNSUBSCRIBE' : 'DELETE',
      value: secondarySelectedItems
        ? `${value}:${secondarySelectedItems}:${inputValue}`
        : value,
    }));

    if (!isUnsubscribe && !displayDeactivateModal) {
      setDisplayDeactivateModal(true);
    } else {
      dispatch({type: UPDATE_CUSTOMER_SURVEY, payload: apiPayload});
      setDisplayModal(false);
      //After deactivation - this will go to login screen
      dispatch({type: START_LOGOUT});
      dispatch({
        type: UPDATE_PERSISTED_STATE,
        newState: {
          refreshToken: null,
          customerName: null,
          sub: null,
          customerPhoto: null,
          showPossiblesPrompt: false,
        },
      });
    }
  };

  return (
    <Overlay
      onBackdropPress={() => setDisplayModal('')}
      overlayStyle={{
        backgroundColor: '#E33051',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {
            translateX: -scale(isUnsubscribe ? 125 : 135),
          },
          {
            translateY: -verticalScale(
              isUnsubscribe
                ? isIosDevice()
                  ? 150
                  : 200
                : isIosDevice()
                ? 220
                : 280,
            ),
          },
        ],
        height: 'auto',
        width: scale(isUnsubscribe ? 250 : 280),
        borderRadius: 20,
      }}
      isVisible={displayModal === 'unsubscribe' || displayModal === 'delete'}>
      <View
        style={{
          position: 'absolute',
          bottom: verticalScale(
            isUnsubscribe
              ? isIosDevice()
                ? 380
                : 450
              : isIosDevice()
              ? 485
              : 600,
          ),
          right: scale(10),
        }}>
        <TouchableOpacity onPress={() => setDisplayModal('')}>
          <Image source={GLOBAL_ASSET_URI.CLOSE_ICON} height={25} width={25} />
        </TouchableOpacity>
      </View>
      <Text
        fontFamily="Montserrat-Light"
        size={11}
        color="#fff"
        weight={500}
        customStyle={{textAlign: 'center'}}>
        {isUnsubscribe
          ? 'Unsubscribing removes your access from Thundr Bolt perks and features.'
          : 'Reactivate after 7 days; otherwise your account autodeletes in 30 days and will no longer be retrievable'}
      </Text>
      <Separator space={10} />
      <Text
        fontFamily="Montserrat-Bold"
        size={15}
        color="#fff"
        weight={700}
        customStyle={{textAlign: 'center'}}>
        {isUnsubscribe
          ? ' Sure ka na ba? Mind telling us why, mars?'
          : 'Babush na ba talaga? Why naman, besh?'}
      </Text>
      <Separator space={15} />
      {isUnsubscribe
        ? unsubscribeValues.map((value, index) => (
            <CheckboxItem
              key={index}
              label={value}
              handleCheckBoxPress={handleCheckBoxPress}
              customerSurvey={customerSurvey}
              setSecondarySelectedItems={setSecondarySelectedItems}
              setInputValue={setInputValue}
            />
          ))
        : deleteValues.map((value, index) => (
            <CheckboxItem
              key={index}
              label={value}
              handleCheckBoxPress={handleCheckBoxPress}
              customerSurvey={customerSurvey}
              setSecondarySelectedItems={setSecondarySelectedItems}
              setInputValue={setInputValue}
            />
          ))}
      <Separator space={20} />
      <Button
        onPress={handleDeleteOrUnsubscribe}
        title={isUnsubscribe ? 'Unsubscribe' : 'Confirm'}
        style={{
          backgroundColor: !selectedItems.length ? '#808080' : '#fff',
          width: scale(150),
        }}
        textColor={!selectedItems.length ? '#fff' : '#E43C59'}
        disabled={!selectedItems.length}
      />
      <DeactivateAccountModal
        handleDeactivate={handleDeleteOrUnsubscribe}
        displayDeactivateModal={displayDeactivateModal}
        setDisplayDeactivateModal={setDisplayDeactivateModal}
      />
    </Overlay>
  );
};

export default SettingsModal;
