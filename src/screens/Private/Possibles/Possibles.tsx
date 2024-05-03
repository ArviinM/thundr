import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {LinearBackground} from '../../../assets/images/possibles/LinearBackground.tsx';
import {COLORS, width} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import {PossiblesTop} from '../../../navigation/Private/Home/Top/PossiblesTop.tsx';
import useMareblesStore from '../../../store/mareblesStore.ts';

const Possibles = () => {
  const headerHeight = useHeaderHeight();
  const isMare = useMareblesStore(state => state.isMare);

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{backgroundColor: COLORS.white, flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <View
          style={{
            position: 'absolute',
          }}>
          <LinearBackground isMare={isMare} width={width} />
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
          <View style={{flex: 1, width: width}}>
            <PossiblesTop />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Possibles;
