import React, {useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {LinearBackground} from '../../../assets/images/possibles/LinearBackground.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import Swiping from '../../../components/Home/Swiping.tsx';
import {useSharedValue} from 'react-native-reanimated';
import {CustomerMatchResponse} from '../../../types/generated.ts';
import {scale} from '../../../utils/utils.ts';
import Button from '../../../components/shared/Button.tsx';
import Card from '../../../components/Home/Card.tsx';
import {MockData, MockDataItem} from '../Home/mock.ts';
import {PossiblesTop} from '../../../navigation/Private/Home/Top/PossiblesTop.tsx';
import useMareblesStore from '../../../store/mareblesStore.ts';

const Possibles = () => {
  const headerHeight = useHeaderHeight();
  const isMare = useMareblesStore(state => state.isMare);

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{position: 'absolute'}}>
          <LinearBackground isMare={isMare} />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: headerHeight,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',

              color: 'white',
              textAlign: 'center',
              fontSize: scale(12),
              letterSpacing: -0.4,
            }}>
            When we say "Walang tapon", we are serious about it.
          </Text>
          <View style={{flex: 1}}>
            <PossiblesTop />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Possibles;
