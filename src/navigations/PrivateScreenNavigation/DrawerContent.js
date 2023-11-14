// DrawerContent.js
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import {useDispatch} from 'react-redux';
import {START_LOGOUT} from '../../ducks/Login/actionTypes';
import {scale} from '../../utils/commons';
import Separator from '../../components/Separator/Separator';

const DrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#f2cecd'}}>
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('DashboardTab')}>
          <Text size={30} color="#E33C59">
            - Dashboard
          </Text>
        </TouchableOpacity>
        <Separator space={15} />
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text size={30} color="#E33C59">
            - Profile
          </Text>
        </TouchableOpacity>
        <Separator space={15} />
        <TouchableOpacity onPress={() => navigation.navigate('Stars')}>
          <Text size={30} color="#E33C59">
            - Settings
          </Text>
        </TouchableOpacity>
      </View>
      <Separator space={50} />
      <Button
        title="Logout"
        onPress={() => dispatch({type: START_LOGOUT})}
        style={{width: scale(150)}}
      />
    </View>
  );
};

export default DrawerContent;
