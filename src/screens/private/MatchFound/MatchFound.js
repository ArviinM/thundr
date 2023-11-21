// React modules
import React from 'react';
import {View} from 'react-native';

// Third party libraries
import LinearGradient from 'react-native-linear-gradient';

// Components
import Text from '../../../components/Text/Text';
import Image from '../../../components/Image/Image';
import {DASHBOARD_ASSET_URI} from '../../../utils/images';
import {scale, verticalScale} from '../../../utils/commons';
import Button from '../../../components/Button/Button';
import {useNavigation, useRoute} from '@react-navigation/native';

const jowaGradientColors = [
  '#ed2a85',
  '#fe406b',
  '#ff5d51',
  '#ff7c39',
  '#f89924',
];
const mareGradientColors = [
  '#f2653c',
  '#fa7d35',
  '#fe9630',
  '#ffae2f',
  '#ffc634',
];

const MatchFound = () => {
  const route = useRoute();
  const {customerMatchData} = route?.params?.params;
  const isMare = customerMatchData?.tag === 'MARE';

  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={isMare ? mareGradientColors : jowaGradientColors}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{flex: 1}}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={
            isMare
              ? DASHBOARD_ASSET_URI.MATCH_FOUND_MARE
              : DASHBOARD_ASSET_URI.MATCH_FOUND_JOWA
          }
          height={450}
          width={250}
        />
        <View style={{alignItems: 'center', bottom: verticalScale(40)}}>
          <Text color="#fff" size={25}>
            {`You got ${isMare ? 'MARE!' : 'JOWA!'}`}
          </Text>
          <Text color="#fff" size={15}>
            {isMare
              ? 'Friendship alert! Say hi to your new mare bilis!'
              : 'The wait is over, mars! Landiin mo na, dali'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: scale(30),
            bottom: verticalScale(20),
          }}>
          <Button
            onPress={() => navigation.navigate('DashboardTab')}
            title="Chat now!"
            style={{width: scale(125), backgroundColor: '#FFBC28'}}
          />
          <Button
            onPress={() => navigation.navigate('DashboardTab')}
            title="Keep sighting"
            style={{width: scale(125)}}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default MatchFound;
