// React modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../components/Text/Text';
import Separator from '../../components/Separator/Separator';
import Image from '../../components/Image/Image';

// Utils
import {DRAWER_ASSET_URI} from '../../utils/images';
import {scale} from '../../utils/commons';
import {useNavigation} from '@react-navigation/native';

const DrawerItem = props => {
  const navigation = useNavigation();
  const {src, title, screen, hideDivider} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(screen)}
        style={{
          flexDirection: 'row',
          gap: scale(10),
          alignItems: 'center',
          marginLeft: scale(20),
        }}>
        <Image source={src} height={30} width={30} />
        <Text size={20} color="#fff" weight={700} fontFamily="Montserrat-Bold">
          {title}
        </Text>
      </TouchableOpacity>
      <Separator space={12} />
      {!hideDivider && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#FEBC29',
            width: scale(230),
          }}
        />
      )}
    </>
  );
};

const DrawerContent = () => {
  return (
    <LinearGradient
      colors={['#ed2a85', '#fe406b', '#ff5d51', '#ff7c39', '#f89924']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <Separator space={150} />
      <View style={{flex: 1}}>
        <View style={{alignSelf: 'center'}}>
          <DrawerItem
            src={DRAWER_ASSET_URI.FILTERS}
            title="Filters"
            screen="Filters"
          />
          <Separator space={15} />
          <DrawerItem
            src={DRAWER_ASSET_URI.THUNDER_BOLT}
            title="Thundr Bolt"
            screen="ThunderBolt"
          />
          <Separator space={15} />
          <DrawerItem
            src={DRAWER_ASSET_URI.POSSIBLES}
            title="The Possibles"
            screen="ThePossibles"
          />
          <Separator space={15} />
          <DrawerItem
            src={DRAWER_ASSET_URI.SETTINGS}
            title="Settings"
            screen="Settings"
            hideDivider={true}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default DrawerContent;
