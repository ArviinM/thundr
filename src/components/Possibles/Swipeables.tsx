import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {scale} from '../../utils/utils.ts';
import Swiping from '../Home/Swiping.tsx';
import Card from '../Home/Card.tsx';
import {CustomerMatchResponse} from '../../types/generated.ts';
import {useGetCustomerPossibles} from '../../hooks/possibles/useGetCustomerPossibles.ts';
import {useAuth} from '../../providers/Auth.tsx';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../utils/queryClient.ts';
import {Loading} from '../shared/Loading.tsx';

const Swipeables = ({isMare}: {isMare: boolean}) => {
  const auth = useAuth();
  const query = useQueryClient(queryClient);

  const [index, setIndex] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);

  const activeIndex = useSharedValue(0);
  const mareTranslations = useSharedValue<number[]>(new Array(20).fill(0));
  const jowaTranslations = useSharedValue<number[]>(new Array(20).fill(0));
  const sharedIsMare = useSharedValue<boolean>(false);
  const bottomHeight = useBottomTabBarHeight();

  const [isLoadingNewData, setIsLoadingNewData] = useState(false);

  const tag = isMare ? 'MARE' : 'JOWA';
  const customerPossibles = useGetCustomerPossibles({
    sub: auth.authData?.sub || '',
    tag: tag,
  });

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.floor(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
      if (prevValue) {
        runOnJS(setPreviousValue)(Math.floor(prevValue));
      }
    },
  );

  useEffect(() => {
    if (index && customerPossibles.data) {
      if (index > customerPossibles.data.profiles.length - 1) {
        console.log('Fetching Matches 🚀');

        setIsLoadingNewData(true); // Start Loading Indicator
        query.invalidateQueries({queryKey: ['get-match-list']});

        customerPossibles.refetch().finally(() => {
          setIsLoadingNewData(false); // Stop Loading Indicator
          runOnJS(setIndex)(0);
          activeIndex.value = 0;
        });

        jowaTranslations.modify(value => {
          'worklet';
          for (let i = 0; i < value.length; i++) {
            value[i] = 0;
          }
          return value;
        });
        mareTranslations.modify(value => {
          'worklet';
          for (let i = 0; i < value.length; i++) {
            value[i] = 0;
          }
          return value;
        });
      }
    }
  }, [index]);

  const onResponse = async (
    tag: 'Mare' | 'Jowa',
    swipedUser: CustomerMatchResponse,
  ) => {
    try {
      console.log({swipedUser});
    } catch (error) {
      console.warn('Error updating swipe match:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          paddingHorizontal: 20,
          color: 'white',
          fontSize: scale(17),
          textAlign: 'center',
          letterSpacing: -0.4,
        }}>
        See the {customerPossibles.data?.count}{' '}
        {(customerPossibles.data?.count === 1 && 'user') || 'users'} who{' '}
        {isMare ? 'MARE' : 'JOWA'} you!
      </Text>

      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          paddingHorizontal: 20,
          color: 'white',
          textAlign: 'center',
          fontSize: scale(12),
          letterSpacing: -0.4,
        }}>
        {isMare
          ? 'Best Mares Forever? Chikahin mo na siya!\nSubscribe to see them all'
          : 'The right 1 may be 1 of them. DM mo na dali!\nSubscribe to see them all'}
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 10,
        }}>
        {isLoadingNewData ? (
          <Loading />
        ) : (mareTranslations.value.length && jowaTranslations.value.length) ===
          0 ? (
          <Loading />
        ) : customerPossibles.isLoading ||
          customerPossibles.isRefetching ||
          !customerPossibles.data ? (
          // TODO: Temporary Loading Screen - will add lazy loading here
          <Loading />
        ) : (
          customerPossibles.data.profiles?.map((user, index) => (
            <Card
              key={`${user.sub}-${index}-${user.customerData.sub}`}
              user={user}
              numOfCards={customerPossibles.data.profiles?.length}
              index={index}
              activeIndex={activeIndex}
              mareTranslation={mareTranslations}
              jowaTranslation={jowaTranslations}
              isMare={sharedIsMare}
              possibles
              nextAction={customerPossibles.data.nextActionTime}
              // isBlurred={customerPossibles.data.isBlurred}
            />
          ))
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        {customerPossibles.isLoading && !customerPossibles.data ? (
          <Loading />
        ) : (
          <Swiping
            activeIndex={activeIndex}
            mareTranslation={mareTranslations}
            jowaTranslation={jowaTranslations}
            index={index}
            onResponse={onResponse}
            user={customerPossibles?.data?.profiles || []}
            isMare={sharedIsMare}
          />
        )}
      </View>
    </View>
  );
};

export default Swipeables;
