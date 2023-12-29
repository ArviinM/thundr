// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useDispatch} from 'react-redux';

// Components
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';

// Ducks
import {START_LOGOUT} from '../../ducks/Login/actionTypes';

// Utils
import {scale} from '../../utils/commons';
import Separator from '../../components/Separator/Separator';

const DrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#f2cecd'}}>
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Text size={25} color="#E33C59">
            ● Filters
          </Text>
        </TouchableOpacity>
        <Separator space={15} />
        <TouchableOpacity onPress={() => navigation.navigate('ThunderBolt')}>
          <Text size={25} color="#E33C59">
            ● Thunder Bolt
          </Text>
        </TouchableOpacity>
        <Separator space={15} />
        <TouchableOpacity onPress={() => navigation.navigate('ThePossibles')}>
          <Text size={25} color="#E33C59">
            ● The Possibles
          </Text>
        </TouchableOpacity>
        <Separator space={15} />
        <TouchableOpacity onPress={() => navigation.navigate('Stars')}>
          <Text size={25} color="#E33C59">
            ● Settings
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
