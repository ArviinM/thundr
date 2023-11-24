// React modules
import React, {useEffect, useState, useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';

// Third party libraries
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

// Components
import Text from '../../../components/Text/Text';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';
import OutOfSwipeModal from '../../../composition/OutOfSwipeModal/OutOfSwipeModal';
import Profile from '../Profile/Profile';
import Spinner from '../../../components/Spinner/Spinner';

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
import LinearGradient from 'react-native-linear-gradient';

const MatchDetails = props => {
  const {currentIndex, matchList, customerProfile} = props;
  if (!matchList?.length) {
    return;
  }
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        size={30}
        color="#E33C59"
        weight={700}
        customStyle={{textAlign: 'center'}}>
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
        {`Compatibility Score: ${
          matchList?.length && matchList[currentIndex]?.percent
        }`}
      </Text>
    </View>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.persistedState);
  const {
    matchList,
    matchListLoading,
    customerProfile,
    customerMatchData,
    isSwipeReached,
  } = useSelector(state => state.dashboard);
  const [isMare, setMare] = useState(false);
  const [isJowa, setJowa] = useState(false);
  const [isUserInformationShown, setUserInformationShown] = useState(false);
  const [swipeValue, setSwipeValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const compatibilityScore =
    (matchList?.length && matchList[currentIndex]?.percent) || 0;

  useEffect(() => {
    if (isSwipeReached) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [isSwipeReached]);

  useEffect(() => {
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: {
        sub: matchList?.length && matchList[currentIndex]?.sub,
        accessToken: loginData.accessToken,
        fromSwipe: true,
      },
    });
    if (swipeValue) {
      dispatch({
        type: CUSTOMER_MATCH,
        payload: {
          tag: swipeValue,
          target: matchList.length && matchList[currentIndex]?.sub,
        },
      });
    }
  }, [matchList, dispatch, currentIndex, swipeValue]);

  /*Check this useEffect if may kakaibang issue sa swipe*/
  useEffect(() => {
    if (matchList?.length && currentIndex === matchList?.length) {
      dispatch({
        type: GET_MATCH_LIST,
        payload: {sub: loginData.sub || sub},
      });
      if (!matchListLoading) {
        setCurrentIndex(0);
      }
    }
  }, [matchList, dispatch, currentIndex, matchListLoading]);

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

  const handleRefresh = () => {
    dispatch({
      type: GET_MATCH_LIST,
      payload: {sub: loginData.sub || sub},
    });
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          if (latitude && longitude) {
            dispatch({
              type: UPDATE_CURRENT_LOCATION,
              payload: {
                longitude: longitude,
                latitude: latitude,
              },
            });
          }
        },
        error => {
          console.error('Error getting location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    getCurrentLocation();

    const intervalId = setInterval(() => {
      getCurrentLocation();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (customerMatchData?.match) {
      navigation.navigate('MatchFound', {params: {customerMatchData}});
    }
  }, [customerMatchData, navigation]);

  if (matchListLoading) {
    return <Spinner visible={true} />;
  }

  const noAvailableMatches = () => {
    return (
      <LinearGradient
        colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
        start={{x: 0.5, y: 1}}
        end={{x: 0.5, y: 0}}
        style={{
          flex: 1,
          height: verticalScale(320),
          borderBottomLeftRadius: 120,
          borderBottomRightRadius: 120,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text
            size={20}
            weight="700"
            color="#E33051"
            customStyle={{textAlign: 'center'}}>
            {'No available matches \nPlease try again'}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {!matchList || !matchList?.length ? (
        <ScrollView
          refreshControl={
            !matchList?.length && (
              <RefreshControl
                refreshing={matchListLoading}
                onRefresh={handleRefresh}
              />
            )
          }
          showsVerticalScrollIndicator={false}
          bounces={!matchList?.length}>
          {noAvailableMatches()}
        </ScrollView>
      ) : (
        <Profile
          compatibilityScore={compatibilityScore}
          customerProfile={customerProfile}
          matchList={matchList}
          isUserInformationShown={isUserInformationShown}
          setUserInformationShown={setUserInformationShown}
        />
      )}
      {!isUserInformationShown && (
        <MatchDetails
          currentIndex={currentIndex}
          matchList={matchList}
          customerProfile={customerProfile}
        />
      )}
      <OutOfSwipeModal isSwipeReached={isSwipeReached} />
      <View
        style={{
          alignItems: 'center',
          top: verticalScale(isUserInformationShown ? -25 : 0),
        }}>
        <JowaMareSection
          isMare={isMare}
          isJowa={isJowa}
          setMare={setMare}
          setJowa={setJowa}
          setSwipeValue={setSwipeValue}
          swipeValue={swipeValue}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          matchList={matchList}
          setUserInformationShown={setUserInformationShown}
        />
      </View>
    </View>
  );
};

export default Dashboard;
