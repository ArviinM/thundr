import React, {useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, Text, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {LinearBackground} from '../../../assets/images/possibles/LinearBackground.tsx';
import {COLORS} from '../../../constants/commons.ts';
import {Loading} from '../../../components/shared/Loading.tsx';
import Swiping from '../../../components/Home/Swiping.tsx';
import {useSharedValue} from 'react-native-reanimated';
import {CustomerMatchResponse} from '../../../types/generated.ts';

const Possibles = () => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const [isMare, setIsMare] = useState<boolean>(true);

  const [index, setIndex] = useState(0);

  const activeIndex = useSharedValue(0);
  const mareTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const jowaTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const sharedIsMare = useSharedValue<boolean>(false);

  const onResponse = async (
    tag: 'Mare' | 'Jowa',
    swipedUser: CustomerMatchResponse,
  ) => {
    try {
      // if (auth.authData?.sub) {
      //     await swipeMatch.mutateAsync({
      //         sub: auth.authData.sub,
      //         target: swipedUser.sub,
      //         tag: tag,
      //     });
      // }
      console.log('Test');
    } catch (error) {
      console.warn('Error updating swipe match:', error);
    }
  };

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{position: 'absolute'}}>
          <LinearBackground isMare={isMare} />
        </View>
        <View style={{flex: 1, marginTop: headerHeight}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              padding: 20,
              color: 'white',
            }}>
            This is working in progress, please wait for the upcoming builds for
            The Possibles Update. {'\n\n'}Thank you!
          </Text>
          <Button
            onPress={() => setIsMare(false)}
            title="Toggle Jowa"
            color="white"
          />
          <Button
            onPress={() => setIsMare(true)}
            title="Toggle Mare"
            color="white"
          />
          {/*<View style={{borderWidth: 1, flex: 1}} />*/}
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Swiping
            activeIndex={activeIndex}
            mareTranslation={mareTranslations}
            jowaTranslation={jowaTranslations}
            index={index}
            onResponse={onResponse}
            user={[]}
            isMare={sharedIsMare}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Possibles;
