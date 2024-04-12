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

const dummuUsers = [
  {
    id: 1,
    image:
      'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Dani',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Jon',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1570824629069-2de4bcd4345a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'June',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Alice',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Wander',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Mewo',
  },
];

const dummuUsers2 = [
  {
    id: 8,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
    name: 'Dani',
  },
  {
    id: 523,
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg',
    name: 'Jon',
  },
];

// TODO: In Development - Probably will change the card - but this is a preview only but subject to change!
const Home = () => {
  // const auth = useAuth();
  // if (auth.loading) {
  //   console.log('auth is loading');
  // }
  //
  // const match = useGetMatchList(auth.authData?.sub);
  //
  // if (match.isLoading) {
  //   console.log('match is loading');
  // }

  const bottomTabHeight = useBottomTabBarHeight();

  const [users, setUsers] = useState(dummuUsers);
  const [mockData, setMockData] = useState(dummuUsers2);

  const [index, setIndex] = useState(0);

  const activeIndex = useSharedValue(0);
  const mareTranslations = useSharedValue<number[]>(new Array(6).fill(0));

  const [visible, isVisible] = useState(true);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        // console.log('animated reaction', Math.floor(value));
        runOnJS(setIndex)(Math.floor(value));
        // runOnJS(setUsers)(prevState => prevState.slice(0));
      }
    },
  );

  const removeFirstUser = () => {
    setUsers(prevUsers => prevUsers.slice(1)); // Remove the first element
  };

  useEffect(() => {
    if (index > users.length - 3) {
      console.warn('Last 2 cards remaining. Fetch more!');
      // setUsers(prevUser => [...prevUser, ...mockData]);
      mareTranslations.modify(value => {
        'worklet';
        value.push(0, 0, 0, 0);
        return value;
      });
      runOnJS(setUsers)(prevState => [...prevState, ...mockData]);
      // let test = [...users, ...mockData];

      // mareTranslations.value = [...mareTranslations.value, 0];
    }
  }, [
    index,
    mareTranslations,
    mareTranslations.value,
    mockData,
    users,
    users.length,
  ]);

  // useEffect(() => {
  //   if (index > users.length - 7) {
  //     console.warn('Last 2 cards remaining. Fetch more!');
  //     setUsers();
  //     mareTranslations.modify(value => {
  //       'worklet';
  //       value = value.slice(0, users.length);
  //       return value;
  //     });
  //   }
  // }, [users.length]);

  console.log({index});
  const onResponse = (
    res: boolean,
    swipedUser: {
      image: string;
      name: string;
    },
  ) => {
    console.log('on Response: ', res);
    console.log(swipedUser);
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'yellow'}}
      edges={['right', 'left']}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <GenericModal
        isVisible={visible}
        title="Dev Log Sprint #1"
        content={
          <Text style={{fontFamily: 'Montserrat-Regular'}}>
            Rawr Testers! 🦈 {'\n\n'}
            Here's our new build for Sprint 1! If you made it here it means you
            finished signing up or you signed in! {'\n\n'}I hope you saw that
            dang rainbow animations that was not easy to make xD {'\n\n'}
            Do keep testing it out and I, shark awaits for your feedback.
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
            key={`${user.id}-${index}-`}
            user={user}
            numOfCards={users.length}
            index={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
            mareTranslation={mareTranslations}
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
          index={index}
          onResponse={onResponse}
          user={users}
        />
      </View>
      {/*<View style={{backgroundColor: 'black', flex: 0.0}} />*/}
    </SafeAreaView>
  );
};

export default Home;
