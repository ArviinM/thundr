// React modules
import React, {useRef} from 'react';
import {View, PanResponder, Animated} from 'react-native';

// Third party libraries

// Components
import Image from '../../components/Image/Image';

// Utils
import {DASHBOARD_ASSET_URI} from '../../utils/images';
import {verticalScale} from '../../utils/commons';
import Button from '../../components/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  CUSTOMER_MATCH,
  UPDATE_DASHBOARD_STATE,
} from '../../ducks/Dashboard/actionTypes';

const JowaMareSection = props => {
  const {
    setMare,
    setJowa,
    isMare,
    isJowa,
    swipeValue,
    setSwipeValue,
    setCurrentIndex,
    currentIndex,
    setOutOfSwipe,
    matchList,
  } = props;
  const leftValue = useRef(0);
  const rightValue = useRef(0);

  const updateLeftPosition = dx => {
    leftValue.current = dx;
  };

  const updateRightPosition = dx => {
    rightValue.current = dx;
  };

  const panResponderLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setMare(true);
        return true;
      },
      onPanResponderMove: (_, gestureState) => {
        updateLeftPosition(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          setMare(false);
          setSwipeValue('Mare');
          updateLeftPosition(0);
          // if (matchList.length && currentIndex < matchList.length - 1) {
          setCurrentIndex(prevIndex => prevIndex + 1);
          // }
        } else {
          updateLeftPosition(0);
          setMare(false);
        }
      },
    }),
  ).current;

  const panResponderRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setJowa(true);
        return true;
      },
      onPanResponderMove: (_, gestureState) => {
        updateRightPosition(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          setJowa(false);
          setSwipeValue('Jowa');
          updateRightPosition(0);
          // if (currentIndex < matchList.length - 1) {
          setCurrentIndex(prevIndex => prevIndex + 1);
          // }
        } else {
          updateRightPosition(0);
          setJowa(false);
        }
      },
    }),
  ).current;

  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.View
        style={{
          transform: [{translateX: leftValue.current}],
        }}
        {...panResponderLeft.panHandlers}>
        <Image
          source={
            isMare ? DASHBOARD_ASSET_URI.GLOWING_MARE : DASHBOARD_ASSET_URI.MARE
          }
          height={160}
          width={65}
        />
      </Animated.View>
      <View style={{marginTop: verticalScale(40)}}>
        <Image
          source={
            isMare || isJowa
              ? DASHBOARD_ASSET_URI.GLOWING_THUNDR
              : DASHBOARD_ASSET_URI.THUNDR
          }
          height={65}
          width={240}
        />
      </View>
      <Animated.View
        style={{
          transform: [{translateX: rightValue.current}],
        }}
        {...panResponderRight.panHandlers}>
        <Image
          source={
            isJowa ? DASHBOARD_ASSET_URI.GLOWING_JOWA : DASHBOARD_ASSET_URI.JOWA
          }
          height={160}
          width={65}
        />
      </Animated.View>
    </View>
  );
};

export default JowaMareSection;
