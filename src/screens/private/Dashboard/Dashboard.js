// React modules
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

// Third party libraries
import {useDispatch, useSelector} from 'react-redux';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import Separator from '../../../components/Separator/Separator';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';

// Ducks
import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PROFILE,
} from '../../../ducks/Dashboard/actionTypes';

// Utils
import {isIosDevice, verticalScale} from '../../../utils/commons';
import {DASHBOARD_ASSET_URI} from '../../../utils/images';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.persistedState);

  const [isMare, setMare] = useState(false);
  const [isJowa, setJowa] = useState(false);
  const [swipeValue, setSwipeValue] = useState('');

  useEffect(() => {
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

  const renderMatchDetails = () => {
    return (
      <>
        <Text size={35} color="#E33C59">
          Cholo, 39
        </Text>
        <Text size={17}>CEO at Business Inc.</Text>
        <View
          style={{
            height: verticalScale(1),
            backgroundColor: '#E33C59',
            width: '50%',
            marginVertical: verticalScale(3),
          }}
        />
        <Text size={15} color="#EE983D">
          Compatibility Score: 89%
        </Text>
      </>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={DASHBOARD_ASSET_URI.PHOTO_CONTAINER}
        height={isIosDevice() ? 310 : 330}
        width={350}
      />
      <View style={{alignItems: 'center'}}>
        {renderMatchDetails()}
        <JowaMareSection
          isMare={isMare}
          isJowa={isJowa}
          setMare={setMare}
          setJowa={setJowa}
          setSwipeValue={setSwipeValue}
          swipeValue={swipeValue}
        />
      </View>
      <Separator space={10} />
    </View>
  );
};

export default Dashboard;
