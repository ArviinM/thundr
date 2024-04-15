import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, Text, View} from 'react-native';

import {COLORS} from '../../../constants/commons.ts';

import {useEffect, useState} from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import Card from '../../../components/Home/Card.tsx';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Swiping from '../../../components/Home/Swiping.tsx';
import GenericModal from '../../../components/shared/GenericModal.tsx';
import {MockData, MockDataItem} from './mock.ts';

const Home = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  const [users, setUsers] = useState(MockData);
  const [index, setIndex] = useState(0);

  const activeIndex = useSharedValue(0);
  const mareTranslations = useSharedValue<number[]>(
    new Array(MockData.length).fill(0),
  );
  const jowaTranslations = useSharedValue<number[]>(
    new Array(MockData.length).fill(0),
  );
  const isMare = useSharedValue<boolean>(false);

  const [visible, isVisible] = useState(true);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    },
  );

  useEffect(() => {
    if (index > users.length - 3) {
      console.log('Last 2 cards remaining. Fetch more!');
      // setUsers(prevUser => [...prevUser, ...mockData]);
      mareTranslations.modify(value => {
        'worklet';
        value.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return value;
      });
      jowaTranslations.modify(value => {
        'worklet';
        value.push(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        return value;
      });
      runOnJS(setUsers)(prevState => [...prevState, ...MockData]);
    }
  }, [
    index,
    mareTranslations,
    mareTranslations.value,
    jowaTranslations,
    jowaTranslations.value,
    users,
    users.length,
  ]);

  const onResponse = (res: boolean, swipedUser: MockDataItem) => {
    console.log('on Response: ', res);
    console.log(swipedUser);
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left']}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <GenericModal
        isVisible={visible}
        title="Dev Log Sprint #2"
        content={
          <Text style={{fontFamily: 'Montserrat-Regular'}}>
            Welcome Testers! 🦈 {'\n\n'}
            Here's a work in progress of Sprint 2! {'\n\n'}I have made a good
            progress with the swiping animations and also adding the instagram
            story like feature. {'\n\n'}I have missed out to include the
            Customer Personality Type last Sprint. I added it now for this
            build, kindly test and confirm.
            {'\n\n'}
            Big Sharky Dev, {'\n'}Tanders, Inc
          </Text>
        }
        buttonText="Close"
        onClose={() => isVisible(false)}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        {users.map((user, index) => (
          <Card
            key={`${user.sub}-${index}-`}
            user={user}
            numOfCards={users.length}
            index={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
            mareTranslation={mareTranslations}
            jowaTranslation={jowaTranslations}
            isMare={isMare}
          />
        ))}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: bottomTabHeight * 1.97,
        }}>
        <Swiping
          activeIndex={activeIndex}
          mareTranslation={mareTranslations}
          jowaTranslation={jowaTranslations}
          index={index}
          onResponse={onResponse}
          user={users}
          isMare={isMare}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
