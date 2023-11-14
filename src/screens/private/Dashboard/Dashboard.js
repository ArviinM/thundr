// React modules
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';

// Utils
import {verticalScale} from '../../../utils/commons';

import {DASHBOARD_ASSET_URI} from '../../../utils/images';
import JowaMareSection from '../../../composition/JowaMareSection/JowaMareSection';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_PHOTO,
  GET_CUSTOMER_PROFILE,
} from '../../../ducks/Dashboard/actionTypes';
import Separator from '../../../components/Separator/Separator';

const Dashboard = () => {
  const {loginData} = useSelector(state => state.login);
  const {sub} = useSelector(state => state.onboarding);
  const dispatch = useDispatch();
  const [isMare, setMare] = useState(false);
  const [isJowa, setJowa] = useState(false);

  useEffect(() => {
    dispatch({
      type: GET_CUSTOMER_DETAILS,
      payload: {sub: loginData.sub || sub},
    });
    dispatch({
      type: GET_CUSTOMER_PHOTO,
      payload: {sub: loginData.sub || sub},
    });
    dispatch({
      type: GET_CUSTOMER_PROFILE,
      payload: {sub: loginData.sub || sub},
    });
  }, [dispatch]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={DASHBOARD_ASSET_URI.PHOTO_CONTAINER}
        height={310}
        width={350}
      />
      <View style={{alignItems: 'center'}}>
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
      </View>
      <Separator space={23} />
      <JowaMareSection
        isMare={isMare}
        isJowa={isJowa}
        setMare={setMare}
        setJowa={setJowa}
      />
    </View>
  );
};

export default Dashboard;
