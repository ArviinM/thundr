// React modules
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Text from '../../../components/Text/Text';
import FeatureNotAvailableModal from '../../../composition/FeatureNotAvailableModal/FeatureNotAvailableModal';

// Utils
import {
  isIosDevice,
  moderateScale,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {ADVOCACY_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';

// Style
import {BorderLinearGradient} from '../PersonalityType/Styled';

const AdvocacyTransaction = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <KeyboardAwareScrollView bounces={false}>
      <FeatureNotAvailableModal
        displayCloseIcon={true}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        normalBehaviorModal={true}
      />
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={GLOBAL_ASSET_URI.BACK_ICON}
            height={30}
            width={30}
            customStyle={{left: scale(20), top: verticalScale(15)}}
          />
        </TouchableOpacity>
        <Separator space={40} />
        <View style={{alignItems: 'center'}}>
          <Text
            color="#E33051"
            weight={700}
            size={24}
            fontFamily="Montserrat-Bold"
            customStyle={{textAlign: 'center', paddingHorizontal: scale(55)}}>
            Bongga mo day! Your support is greatly appreciated.
          </Text>
        </View>
        <Separator space={25} />
        <View style={{alignItems: 'center'}}>
          <Text size={15}>Amount to Donate</Text>
          <Separator space={10} />
          <BorderLinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#E72454', '#FFC227']}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                width: scale(200),
                height: verticalScale(isIosDevice() ? 60 : 75),
                borderRadius: 20,
                paddingLeft: scale(10),
              }}>
              <Text
                fontFamily="Montserrat-Bold"
                size={40}
                weight={700}
                color="#E43C59"
                customStyle={{
                  marginRight: scale(5),
                  bottom: verticalScale(1),
                }}>
                ₱
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: moderateScale(40),
                  color: '#E43C59',
                  fontWeight: 'bold',
                  top: verticalScale(0),
                }}
                placeholder="0,000"
                placeholderTextColor="#E43C59"
                value={inputValue}
                onChangeText={text => setInputValue(text)}
                keyboardType="numeric"
              />
            </View>
          </BorderLinearGradient>
          <TouchableOpacity
            // disabled={!inputValue}
            // onPress={() => navigation.navigate('AdvocacyResult')}
            onPress={() => setDisplayModal(true)}>
            <Image
              source={ADVOCACY_ASSET_URI.DONATE_BUTTON}
              height={60}
              width={170}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AdvocacyTransaction;
