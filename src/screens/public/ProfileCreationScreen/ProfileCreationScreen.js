// React modules
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

// Components
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';

// Utils
import {
  getDaysInMonth,
  isIosDevice,
  months,
  scale,
  verticalScale,
  years,
} from '../../../utils/commons';
import {
  BorderLinearGradient,
  Container,
  Input,
  LabelContainer,
  LabeledInputContainer,
  PhotoIconBorderLinearGradient,
  PhotoIconContainer,
  PhotoIconWrapper,
  Wrapper,
} from './Styled';
import Image from '../../../components/Image/Image';
import {GLOBAL_ASSET_URI, LGBTQ_ASSET_URI} from '../../../utils/images';
import Separator from '../../../components/Separator/Separator';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_COMPATIBILTY_QUESTIONS,
  START_PROFILE_CREATION,
  UPLOAD_PHOTO,
} from '../../../ducks/ProfileCreation/actionTypes';
import {monthNameToNumber} from './utils';
import Spinner from '../../../components/Spinner/Spinner';
import axios from 'axios';
import {Overlay} from 'react-native-elements';

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

const LabeledInput = ({
  label,
  validationLabel = '',
  textInputProps,
  value,
  setter,
}) => {
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
        <Input {...textInputProps} value={value} onChangeText={setter} />
      </BorderLinearGradient>
    </LabeledInputContainer>
  );
};

const PrimaryDetails = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.profileCreation);
  const {loginData} = useSelector(state => state.login);
  const [activeIcon, setActiveIcon] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(null);
  const [day, setDay] = useState(null);
  const [name, setName] = useState(null);
  const [hometown, setHometown] = useState(null);
  const [imageSource, setImageSource] = useState('');
  const [gender, setGender] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const shouldBeEnabled =
    month && year && day && name && hometown && gender && imageSource;

  useEffect(() => {
    dispatch({type: GET_COMPATIBILTY_QUESTIONS, payload: loginData.sub});
  }, [dispatch]);

  const openImageLibrary = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.03,
    };

    const response = await new Promise(resolve => {
      launchImageLibrary(options, resolve);
    });

    if (!response) {
      return null;
    }

    const source = {uri: response.assets[0].uri};
    const {uri, fileName} = response.assets[0];
    setImageSource(source);

    const imageBase64 = await RNFS.readFile(uri, 'base64');
    const formData = new FormData();

    formData.append('sub', loginData.sub);
    formData.append('isPrimary', 'true');
    formData.append('filepath', imageBase64);
    formData.append('filename', fileName);

    try {
      const uploadResponse = await axios.post(
        `https://dev-api.thundr.ph/customer/customer-photo-b64`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        },
      );
    } catch (error) {
      // setDisplayModal(true);
      // setImageSource(null);
    }
  };

  const renderModal = () => {
    return (
      <Overlay
        onBackdropPress={() => setDisplayModal(false)}
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
          height: verticalScale(isIosDevice() ? 80 : 85),
          width: scale(250),
          borderRadius: 20,
        }}
        isVisible={displayModal}>
        <View
          style={{
            position: 'absolute',
            bottom: verticalScale(isIosDevice() ? 65 : 75),
            right: scale(5),
          }}>
          <TouchableOpacity onPress={() => setDisplayModal(false)}>
            <Image
              source={GLOBAL_ASSET_URI.CLOSE_ICON}
              height={25}
              width={25}
            />
          </TouchableOpacity>
        </View>
        <Text
          size={18}
          color="#fff"
          weight={700}
          customStyle={{textAlign: 'center'}}>
          There's something wrong with the photo you uploaded. Please try again.
        </Text>
        <Separator space={15} />
      </Overlay>
    );
  };

  const Photo = () => {
    return (
      <LabeledInputContainer>
        {displayModal && renderModal()}
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
        <Separator space={10} />
        <PhotoIconWrapper onPress={openImageLibrary}>
          {imageSource && !displayModal ? (
            <Image
              source={imageSource}
              customStyle={{width: '100%', height: '100%'}}
              stretch
            />
          ) : (
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
          )}
        </PhotoIconWrapper>
      </LabeledInputContainer>
    );
  };

  const Gender = () => {
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

  return (
    <Container
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={isIosDevice()}>
      {loading && <Spinner visible />}
      <Wrapper>
        <LabeledInput
          label="Name"
          validationLabel="(Required)"
          value={name}
          setter={text => setName(text)}
        />
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
            data={months}
            placeholder="Month"
            width={78}
            defaultButtonText="March"
            stateUpdateFunction={setMonth}
            selectedItem={month}
          />
          <CustomDropdown
            data={getDaysInMonth(month)}
            placeholder="Day"
            width={78}
            defaultButtonText="11"
            stateUpdateFunction={setDay}
            selectedItem={day}
          />
          <CustomDropdown
            data={years}
            placeholder="Year"
            width={78}
            defaultButtonText="1998"
            stateUpdateFunction={setYear}
            selectedItem={year}
          />
        </View>
        <LabeledInput
          label="Hometown"
          validationLabel="(Required)"
          value={hometown}
          setter={text => setHometown(text)}
        />
        <Button
          disabled={!shouldBeEnabled}
          title="Continue"
          primary
          textStyle={{weight: 400}}
          style={{
            top: verticalScale(15),
            height: verticalScale(isIosDevice() ? 30 : 40),
            width: scale(150),
          }}
          onPress={() =>
            dispatch({
              type: START_PROFILE_CREATION,
              payload: {
                name: name,
                hometown: hometown,
                gender: gender,
                birthday: `${year}-${monthNameToNumber(month)}-${day}`,
              },
            })
          }
        />
        <Separator space={30} />
      </Wrapper>
    </Container>
  );
};

export default PrimaryDetails;
