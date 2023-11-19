// React modules
import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';

// Third party libraries
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';

// Ducks
import {
  CUSTOMER_MATCH,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PROFILE,
  GET_MATCH_LIST,
  UPDATE_CURRENT_LOCATION,
} from '../../../ducks/Dashboard/actionTypes';

// Utils
import {calculateAge, verticalScale} from '../../../utils/commons';
import OutOfSwipeModal from '../../../composition/OutOfSwipeModal/OutOfSwipeModal';
import Profile from '../Profile/Profile';

import Spinner from '../../../components/Spinner/Spinner';
import {useNavigation} from '@react-navigation/native';

const MatchDetails = props => {
  const {currentIndex, matchList, customerProfile} = props;
  return (
    <>
      <Text size={30} color="#E33C59" weight={700}>
        {customerProfile?.name}, {calculateAge(customerProfile?.birthday)}
      </Text>
      <Text size={15}>{customerProfile?.customerDetails?.work}</Text>
      <View
        style={{
          height: verticalScale(1),
          backgroundColor: '#E33C59',
          width: '50%',
          marginVertical: verticalScale(3),
        }}
      />
      <Text size={15} color="#EE983D">
        {`Compatibility Score: ${matchList[currentIndex]?.percent}`}
      </Text>
    </>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.persistedState);
  const {matchList, matchListLoading, customerProfile} = useSelector(
    state => state.dashboard,
  );
  const scrollViewRef = useRef(null);

  const [isMare, setMare] = useState(false);
  const [isJowa, setJowa] = useState(false);
  const [swipeValue, setSwipeValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOutOfSwipe, setOutOfSwipe] = useState(false);

  // TEST ONLY, TO BE DELETED
  const [matchTestOnly, setMatchTestOnly] = useState(false);

  const compatibilityScore = matchList[currentIndex]?.percent;

  useEffect(() => {
    if (
      !matchListLoading &&
      matchList.length &&
      currentIndex === matchList.length
    ) {
      setOutOfSwipe(true);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, matchList]);

  useEffect(() => {
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: {
        sub: matchList[currentIndex]?.sub,
        accessToken: loginData.accessToken,
        fromSwipe: true,
      },
    });
    if (swipeValue) {
      dispatch({
        type: CUSTOMER_MATCH,
        payload: {tag: swipeValue, target: matchList[currentIndex]?.sub},
      });
    }
  }, [matchList, dispatch, currentIndex, swipeValue]);

  if (scrollViewRef.current) {
    scrollViewRef.current.scrollToEnd({animated: true});
  }

  useEffect(() => {
    dispatch({
      type: GET_MATCH_LIST,
      payload: {sub: loginData.sub || sub},
    });
    dispatch({
      type: GET_CUSTOMER_DETAILS,
      payload: {sub: loginData.sub || sub, accessToken: loginData.accessToken},
    });
    dispatch({
      type: GET_CUSTOMER_PHOTO,
      payload: {sub: loginData.sub || sub, accessToken: loginData.accessToken},
    });
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: {sub: loginData.sub || sub, accessToken: loginData.accessToken},
    });
  }, [dispatch]);

  // TEST ONLY FOR MATCH FOUND
  // useEffect(() => {
  //   if (currentIndex === 3) {
  //     setMatchTestOnly(true);
  //   }
  // }, [setMatchTestOnly, currentIndex]);

  useEffect(() => {
    // Function to get current location and dispatch to Redux
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          dispatch({
            type: UPDATE_CURRENT_LOCATION,
            payload: {
              longitude: longitude,
              latitude: latitude,
            },
          });
        },
        error => {
          console.error('Error getting location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    // Initial call to get location
    getCurrentLocation();

    // Set up an interval to get location every 30 seconds
    const intervalId = setInterval(() => {
      getCurrentLocation();
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (matchTestOnly) {
      navigation.navigate('MatchFound');
    }
  }, [matchTestOnly, navigation]);

  if (matchListLoading && !matchList.length) {
    return <Spinner visible={true} />;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        nestedScrollEnabled={true}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({animated: true});
        }}
        bounces={false}>
        <Profile
          compatibilityScore={compatibilityScore}
          customerProfile={customerProfile}
        />
      </ScrollView>
      <OutOfSwipeModal
        isOutOfSwipe={isOutOfSwipe}
        setOutOfSwipe={setOutOfSwipe}
      />
      <View style={{alignItems: 'center'}}>
        <MatchDetails
          currentIndex={currentIndex}
          matchList={matchList}
          customerProfile={customerProfile}
        />
        <JowaMareSection
          isMare={isMare}
          isJowa={isJowa}
          setMare={setMare}
          setJowa={setJowa}
          setSwipeValue={setSwipeValue}
          swipeValue={swipeValue}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setOutOfSwipe={setOutOfSwipe}
          matchList={matchList}
        />
      </View>
      <Separator space={30} />
    </View>
  );
};

export default Dashboard;
