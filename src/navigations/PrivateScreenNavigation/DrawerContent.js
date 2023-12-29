// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useDispatch} from 'react-redux';

// Components
import Text from '../../components/Text/Text';

// Utils
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
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text size={25} color="#E33C59">
            ● Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;
