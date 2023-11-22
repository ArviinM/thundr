// React modules
import React, {useState, useEffect} from 'react';

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
import {useDispatch} from 'react-redux';
import {UPDATE_DASHBOARD_STATE} from '../../ducks/Dashboard/actionTypes';

const OutOfSwipeModal = props => {
  const dispatch = useDispatch();
  const {isSwipeReached, setOutOfSwipe} = props;
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function calculateRemainingTime() {
    const now = new Date();
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
    ); // Next midnight
    const timeDifference = midnight - now;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {hours, minutes, seconds};
  }

  const formatTime = value => (value < 10 ? `0${value}` : `${value}`);

  const handleCloseModal = () => {
    dispatch({type: UPDATE_DASHBOARD_STATE, newState: {isSwipeReached: false}});
  };

  return (
    <Overlay
      onBackdropPress={handleCloseModal}
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
      isVisible={isSwipeReached}>
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
                {formatTime(remainingTime.hours)}
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
                {formatTime(remainingTime.minutes)}
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
                {formatTime(remainingTime.seconds)}
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
        <Button
          title="Subscribe Now"
          style={{width: scale(200)}}
          onPress={handleCloseModal}
        />
      </BorderLinearGradient>
    </Overlay>
  );
};

export default OutOfSwipeModal;
