// React modules
import React, {useRef} from 'react';
import {View, PanResponder, Animated} from 'react-native';

// Third party libraries

// Components
import Image from '../../components/Image/Image';

// Utils
import {DASHBOARD_ASSET_URI} from '../../utils/images';
import {scale, verticalScale} from '../../utils/commons';

const JowaMareSection = props => {
  const {setMare, setJowa, isMare, isJowa, setSwipeValue, setCurrentIndex} =
    props;
  // const leftValue = useRef(0);
  const translateXLeft = useRef(new Animated.Value(0)).current;
  const translateXRight = useRef(new Animated.Value(0)).current;

  // const updateLeftPosition = dx => {
  //   leftValue.current = dx;
  // };

  // const updateRightPosition = dx => {
  //   rightValue.current = dx;
  // };

  // TEMPORARY COMMENT
  // const panResponderLeft = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => {
  //       setMare(true);
  //       return true;
  //     },
  //     onPanResponderMove: (_, gestureState) => {
  //       updateLeftPosition(gestureState.dx);
  //     },
  //     onPanResponderRelease: (_, gestureState) => {
  //       if (gestureState.dx > 50) {
  //         setMare(false);
  //         setSwipeValue('Mare');
  //         updateLeftPosition(0);
  //         // if (matchList.length && currentIndex < matchList.length - 1) {
  //         setCurrentIndex(prevIndex => prevIndex + 1);
  //         // }
  //       } else {
  //         updateLeftPosition(0);
  //         setMare(false);
  //       }
  //     },
  //   }),
  // ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        setMare(true);
        return true;
      },
      onPanResponderMove: (_, gestureState) => {
        translateXLeft.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          setMare(false);
          setSwipeValue('Mare');
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          setMare(false);
        }
        Animated.spring(translateXLeft, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
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
        translateXRight.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          setJowa(false);
          setSwipeValue('Jowa');
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          setJowa(false);
        }

        Animated.spring(translateXRight, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={{flexDirection: 'row'}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[{transform: [{translateX: translateXLeft}]}]}>
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
          width={220}
        />
      </View>
      <Animated.View
        style={{
          transform: [{translateX: translateXRight}],
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
