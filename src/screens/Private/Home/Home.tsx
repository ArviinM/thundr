import * as React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';

import {useEffect, useState} from 'react';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {
  PERMISSIONS,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {GeolocationResponse} from '@react-native-community/geolocation/js/NativeRNCGeolocation.ts';

import Card, {cardHeight, cardWidth} from '../../../components/Home/Card.tsx';
import Swiping from '../../../components/Home/Swiping.tsx';
import {useAuth} from '../../../providers/Auth.tsx';
import {Loading} from '../../../components/shared/Loading.tsx';

import {getCurrentLocation} from '../../../utils/getCurrentLocation.ts';
import {useCustomerMatchLocation} from '../../../hooks/match/useCustomerMatchLocation.ts';
import {useGetMatchList} from '../../../hooks/match/useGetMatchList.ts';
import {CustomerMatchResponse} from '../../../types/generated.ts';
import {useCustomerMatch} from '../../../hooks/match/useCustomerMatch.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import {scale} from '../../../utils/utils.ts';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {
  getDeviceToken,
  registerDeviceForRemoteMessages,
  unregisterDeviceForRemoteMessages,
} from '../../../utils/notificationUtils.ts';
import {useRegisterToken} from '../../../hooks/notification/useRegisterToken.ts';
import CountdownCooldown from '../../../components/Home/CountdownCooldown.tsx';
import {useGetChatList} from '../../../hooks/chat/useGetChatList.ts';
import {useGetCustomerSubscribed} from '../../../hooks/subscribe/useGetCustomerSubscribed.ts';
import useSubscribeCheck from '../../../store/subscribeStore.ts';
import {RouteProp} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import GenericModal from '../../../components/shared/GenericModal.tsx';
import {BoltLogo} from '../../../assets/images/thundrbolt_icons/BoltLogo.tsx';
import GradientButton from '../../../components/shared/GradientButton.tsx';

type HomeScreenRouteProp = RouteProp<RootNavigationParams, 'Home'>;

type HomeProps = {
  route?: HomeScreenRouteProp;
};

const Home = ({route}: HomeProps) => {
  const {payload} = route?.params || {};
  const auth = useAuth();
  const matchLocation = useCustomerMatchLocation();
  const matchList = useGetMatchList({sub: auth.authData?.sub || ''});

  const swipeMatch = useCustomerMatch();
  const query = useQueryClient(queryClient);

  const [index, setIndex] = useState(0);

  const activeIndex = useSharedValue(0);
  const [previousValue, setPreviousValue] = useState(0);
  const mareTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const jowaTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const isMare = useSharedValue<boolean>(false);
  const [isLoadingNewData, setIsLoadingNewData] = useState(false);

  const registerToken = useRegisterToken();

  const [visible, isVisible] = useState(false);
  const [visible2, isVisible2] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // Explicit type

  const getChatList = useGetChatList({sub: auth.authData?.sub || ''});

  const customerSubscribed = useGetCustomerSubscribed({
    sub: auth.authData?.sub || '',
    productId: 'THDR-BOLT-001',
  });

  const setIsCustomerSubscribed = useSubscribeCheck(
    state => state.setIsCustomerSubscribed,
  );

  const fetchMore = async () => {
    if (matchList.isRefetching) {
      return;
    }

    if (matchList.data) {
      if (index > matchList.data.length - 1) {
        console.log('Fetching Matches 🚀');

        setIsLoadingNewData(true); // Start Loading Indicator
        query.invalidateQueries({queryKey: ['get-match-list']});

        matchList.refetch().finally(() => {
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
  };

  useEffect(() => {
    if (payload) {
      query.refetchQueries({queryKey: ['get-latest-donation']});
      query.refetchQueries({queryKey: ['get-customer-subscribed']});

      customerSubscribed.refetch().then(res => {
        if (res.data) {
          setIsCustomerSubscribed(res.data.hasSubscription);
          isVisible2(res.data.hasSubscription);
        }
      });
    }
  }, [payload, route?.params]);

  useEffect(() => {
    if (matchList.isPending) {
      matchList.refetch();
    }
  }, []);

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
    if (index && matchList.data) {
      fetchMore();
    }
  }, [index]);

  useEffect(() => {
    const newIntervalId = setInterval(() => {
      auth.loadStorageData();
    }, 20 * 60 * 1000);

    setIntervalId(newIntervalId);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const onResponse = async (
    tag: 'Mare' | 'Jowa',
    swipedUser: CustomerMatchResponse,
  ) => {
    try {
      if (auth.authData?.sub) {
        await swipeMatch.mutateAsync({
          sub: auth.authData.sub,
          target: swipedUser.sub,
          tag: tag,
        });
      }
    } catch (error: any) {
      console.warn('Error updating swipe match:', error);
      if (error.status === 'MAX_SWIPES') {
        isVisible(true);
        runOnJS(setIndex)(previousValue); // Revert to the previous card
        activeIndex.value = withSpring(previousValue);

        mareTranslations.modify(value => {
          'worklet';
          value[previousValue] = withSpring(0);
          return value;
        });

        jowaTranslations.modify(value => {
          'worklet';
          value[previousValue] = withSpring(0);
          return value;
        });
      }
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (result === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;

        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else if (result === 'blocked') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on iOS');
      }

      const notificationResult = await requestNotifications(['alert', 'sound']);
      if (notificationResult.status === 'granted') {
        const fcm = await getDeviceToken();

        if (auth.authData?.sub && fcm) {
          await registerToken.mutateAsync({
            subId: auth.authData.sub,
            token: fcm,
          });
        }
      } else {
        await unregisterDeviceForRemoteMessages();
        console.log('user notification is not blocked');
      }
    }

    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const result2 = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

      if (result === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on Android');
      }

      if (result2 === 'granted') {
        const position = (await getCurrentLocation()) as GeolocationResponse;
        if (auth.authData?.sub) {
          await matchLocation.mutateAsync({
            sub: auth.authData.sub,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        }
      } else {
        console.log('Location permission denied on Android');
      }

      const notificationResult = await requestNotifications(['alert', 'sound']);
      if (notificationResult.status === 'granted') {
        await registerDeviceForRemoteMessages();
        const fcm = await getDeviceToken();

        if (auth.authData?.sub && fcm) {
          await registerToken.mutateAsync({
            subId: auth.authData.sub,
            token: fcm,
          });
        }
      } else {
        console.log('user notification is not blocked');
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (getChatList.isPending) {
      getChatList.refetch();
    }
  }, []);

  useEffect(() => {
    if (customerSubscribed.data) {
      setIsCustomerSubscribed(customerSubscribed.data.hasSubscription);
    }
  }, [customerSubscribed.data]);

  useEffect(() => {
    if (matchList.isRefetching) {
      setIsLoadingNewData(true); // Start Loading Indicator

      setIsLoadingNewData(false); // Stop Loading Indicator
      runOnJS(setIndex)(0);
      activeIndex.value = 0;

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
  }, [activeIndex, jowaTranslations, mareTranslations, matchList.isRefetching]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}
      edges={['right', 'left']}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <GenericModal
        isVisible={visible2}
        content={
          <View
            style={{
              padding: scale(10),
              alignItems: 'center',
              justifyContent: 'center',
              gap: scale(10),
            }}>
            <BoltLogo />
            <View>
              <Text
                style={{fontFamily: 'Montserrat-Bold', textAlign: 'center'}}>
                {payload === 'THDR-BOLT-001' &&
                  'Thank you for subscribing to Thundr Bolt! You now have unlimited\n' +
                    'swipes, full access to The Possibles, and use advanced filters!'}
                {payload === 'THDR-ADVC-001' &&
                  'Thank you for donating!\n' +
                    'You now have unlimited swipes, full access to The Possibles, and can use advanced filters for 7 days!'}
              </Text>
            </View>
            <GradientButton
              onPress={() => {
                isVisible2(false);
              }}
              text="CLOSE"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        }
      />

      <CountdownCooldown isVisible={visible} onClose={() => isVisible(false)} />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        {isLoadingNewData ? (
          <Loading />
        ) : (mareTranslations.value.length && jowaTranslations.value.length) ===
          0 ? (
          <Loading />
        ) : matchList.isLoading || matchList.isRefetching || !matchList.data ? (
          // TODO: Temporary Loading Screen - will add lazy loading here
          <Loading />
        ) : (
          matchList.data?.map((user, index) => (
            <Card
              key={`${user.sub}-${index}-${user.customerData.name}`}
              user={user}
              numOfCards={matchList.data?.length}
              index={index}
              activeIndex={activeIndex}
              mareTranslation={mareTranslations}
              jowaTranslation={jowaTranslations}
              isMare={isMare}
            />
          ))
        )}

        {/*TODO: Investigate here why its now being in the buttom */}
        {matchList.data?.length === 0 && !isLoadingNewData && (
          <View style={styles.noMatchesContainer}>
            {/*<Image*/}
            {/*  source={require('../../../assets/empty_matches.png')}*/}
            {/*  style={styles.noMatchesImage}*/}
            {/*/>*/}
            <LottieView
              source={require('../../../assets/animations/looking_test.json')}
              style={{
                width: 200,
                height: 200,
              }}
              autoPlay
              loop
            />
            <Text style={styles.noMatchesTitle}>Looking for Matches...</Text>
            <Text style={styles.noMatchesSubtitle}>
              It seems like there's no one new around you. How about trying
              these?
            </Text>
            <Text style={styles.noMatchesSubtitle}>
              {'\n'}- Try adjusting your filters to discover more people
            </Text>
            <Text style={styles.noMatchesSubtitle}>
              - Complete your profile to increase your visibility
            </Text>
            <Text style={styles.noMatchesSubtitle}>
              - Get more matches by inviting your friends
            </Text>

            {/* Suggestions Section - See Below */}
          </View>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        {matchList.isLoading && !matchList.data ? (
          <Loading />
        ) : (
          <Swiping
            activeIndex={activeIndex}
            mareTranslation={mareTranslations}
            jowaTranslation={jowaTranslations}
            index={index}
            onResponse={onResponse}
            user={matchList?.data || []}
            isMare={isMare}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noMatchesContainer: {
    backgroundColor: '#efe6e6',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1 / 1.32,
    borderRadius: 15,
    margin: 2,
    elevation: 3,
    height: cardHeight / 1.67,
    width: cardWidth,
    paddingHorizontal: scale(30),
    position: 'absolute',
  },
  noMatchesImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noMatchesTitle: {
    fontSize: scale(20),
    fontFamily: 'ClimateCrisis-Regular',
    marginBottom: 10,
    letterSpacing: 0.2,
    color: COLORS.primary2,
    textAlign: 'center',
  },
  noMatchesSubtitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: 'gray',
    letterSpacing: -0.4,
    fontSize: scale(12),
  },
  buttonStyle: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 124,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
  },
  buttonTextStyle: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
});

export default Home;
