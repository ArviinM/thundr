// React modules
import React from 'react';

// Third party libraries
import {Overlay} from 'react-native-elements';
import {isIosDevice, scale, verticalScale} from '../../utils/commons';
import {TouchableOpacity, View} from 'react-native';
import {GLOBAL_ASSET_URI} from '../../utils/images';
import Text from '../../components/Text/Text';
import Image from '../../components/Image/Image';
import Separator from '../../components/Separator/Separator';
import Button from '../../components/Button/Button';
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';

const OutOfSwipeModal = () => {
  return (
    <Overlay
      // onBackdropPress={handleCloseModal}
      overlayStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8DCDD',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
          {translateX: -scale(150)},
          {translateY: -verticalScale(140)},
        ],
        height: 'auto',
        width: scale(300),
        borderRadius: 20,
        borderColor: '#808080',
        borderWidth: 8,
        padding: scale(30),
      }}
      isVisible={false}>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', gap: scale(10)}}>
          <View style={{alignItems: 'center'}}>
            <Text color="#565656" size={18}>
              hours
            </Text>
            <Separator space={5} />
            <View
              style={{
                backgroundColor: '#808080',
                height: verticalScale(65),
                width: scale(80),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text size={40} color="#fff">
                00
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text color="#565656" size={18}>
              minutes
            </Text>
            <Separator space={5} />
            <View
              style={{
                backgroundColor: '#808080',
                height: verticalScale(65),
                width: scale(80),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text size={40} color="#fff">
                00
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text color="#565656" size={18}>
              seconds
            </Text>
            <Separator space={5} />
            <View
              style={{
                backgroundColor: '#808080',
                height: verticalScale(65),
                width: scale(80),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text size={40} color="#fff">
                00
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Separator space={10} />
      <View>
        <Text size={25} color="#565656" customStyle={{textAlign: 'center'}}>
          Kaloka! You're out of swipes, mars!
        </Text>
        <Text color="#565656" size={15} customStyle={{textAlign: 'center'}}>
          Check in again tomorrow or swipe to sawa when you subscribe to Thundr
          Bolt now!
        </Text>
      </View>
      <Separator space={20} />
      <BorderLinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#E72454', '#FFC227']}>
        <Button title="Subscribe Now" style={{width: scale(200)}} />
      </BorderLinearGradient>
    </Overlay>
  );
};

export default OutOfSwipeModal;
