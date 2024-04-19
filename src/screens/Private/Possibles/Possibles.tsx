import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import LinearGradient from 'react-native-linear-gradient';
import {width} from '../../../constants/commons.ts';

const START_DEFAULT = {x: 0, y: 0}; // Updated start position
const END_DEFAULT = {x: 1, y: 1}; // Updated end position
const MARE_GRADIENT_COLORS = ['#FFDA6E', '#FFAC19'];
const JOWA_GRADIENT_COLORS = ['#FFE381', '#ff7300', '#BA0A2C'];

const Possibles = () => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView edges={['left', 'right']}>
      <View style={{flex: 1}}>
        <LinearGradient
          colors={MARE_GRADIENT_COLORS}
          start={START_DEFAULT}
          end={END_DEFAULT}
          style={{width: width, height: 200}}
        />
      </View>
      <View style={{marginTop: headerHeight}}>
        <Text style={{fontFamily: 'Montserrat-Regular', padding: 20}}>
          This is working in progress, please wait for the upcoming builds for
          The Possibles Update. {'\n\n'}Thank you!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Possibles;
