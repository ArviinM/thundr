// React modules
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation, useRoute} from '@react-navigation/native';

// Components
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import Text from '../../../components/Text/Text';

// Utils
import {
  isIosDevice,
  moderateScale,
  scale,
  verticalScale,
} from '../../../utils/commons';
import {ADVOCACY_ASSET_URI, GLOBAL_ASSET_URI} from '../../../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BorderLinearGradient} from '../PersonalityType/Styled';

const AdvocacyTransaction = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {fromGoldenGays} = route?.params;

  const [inputValue, setInputValue] = useState('');

  return (
    <KeyboardAwareScrollView bounces={false}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={GLOBAL_ASSET_URI.BACK_ICON}
            height={30}
            width={30}
            customStyle={{left: scale(20), top: verticalScale(15)}}
          />
        </TouchableOpacity>
        <Separator space={20} />
        <Text
          fontFamily="ClimateCrisis-Regular"
          color="#E43C59"
          size={22}
          customStyle={{textAlign: 'center'}}>
          {fromGoldenGays ? 'Golden Gays' : 'Galang Philippines'}
        </Text>
        <Separator space={5} />
        <View style={{alignItems: 'center'}}>
          <Image
            source={
              fromGoldenGays
                ? ADVOCACY_ASSET_URI.GOLDEN_GAYS
                : ADVOCACY_ASSET_URI.GALANG
            }
            height={150}
            width={150}
          />
          <Separator space={10} />
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
            disabled={!inputValue}
            onPress={() => navigation.navigate('AdvocacyResult')}>
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
