import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../../../constants/images.ts';
import {moderateScale, scale, verticalScale} from '../../../utils/utils.ts';
import {Image} from 'expo-image';

import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {StrokeText} from '@charmy.tech/react-native-stroke-text';
import Button from '../../../components/shared/Button.tsx';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {useQueryClient} from '@tanstack/react-query';
import {queryClient} from '../../../utils/queryClient.ts';
import useChatRoomIdNotifStore from '../../../store/chatRoomIdNotifStore.ts';

const START_DEFAULT = {x: 0, y: 0}; // Updated start position
const END_DEFAULT = {x: 1, y: 1}; // Updated end position
const MARE_GRADIENT_COLORS = ['#FFAC19', '#FFDA6E', '#FFAC19'];
const JOWA_GRADIENT_COLORS = ['#FFE381', '#ff7300', '#BA0A2C'];

const DETAILS = [
  'Friendship alert! Say hi to your \nnew mare bilis!',
  'The wait is over mars! \nLandiin mo na, dali!',
];

type MatchFoundScreenRouteProp = RouteProp<RootNavigationParams, 'MatchFound'>;

type MatchFoundProps = {
  route?: MatchFoundScreenRouteProp;
};

const MatchFound = ({route}: MatchFoundProps) => {
  const {isMare, matchPhoto, chatRoomId} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const insets = useSafeAreaInsets();
  const query = useQueryClient(queryClient);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.primary1}}
      edges={['right', 'left']}>
      <LinearGradient
        colors={isMare ? MARE_GRADIENT_COLORS : JOWA_GRADIENT_COLORS}
        start={START_DEFAULT}
        end={END_DEFAULT}
        style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
        <Image
          source={IMAGES.matchThundr}
          style={[StyleSheet.absoluteFill]}
          transition={1000}
        />
        <View style={styles.container}>
          <View
            style={{
              marginTop: verticalScale(80),
              marginHorizontal: 30,
              alignItems: 'center',
            }}>
            <Image source={{uri: matchPhoto}} style={styles.mainImage} />
            <View style={{marginTop: -66}}>
              <StrokeText
                text={isMare ? 'You got MARE!' : 'You got JOWA!'}
                align={'center'}
                fontSize={moderateScale(42)}
                color="#FFFFFF"
                fontFamily={'ClimateCrisis-Regular'}
                strokeColor={isMare ? '#D24C00' : '#BC1032'}
                strokeWidth={10}
                numberOfLines={2}
                width={width - 80}
              />
            </View>
            <View
              style={{
                marginTop: verticalScale(44),
                marginHorizontal: 30,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontSize: moderateScale(18),
                  textShadowColor: 'rgba(99,65,0,0.68)',
                  textShadowOffset: {width: 6, height: 6},
                  textShadowRadius: 7,
                  // paddingBottom: scale(1),
                  paddingHorizontal: 6,
                }}>
                {isMare ? DETAILS[0] : DETAILS[1]}
              </Text>
            </View>
            <View
              style={{
                marginTop: verticalScale(30),
                marginHorizontal: 30,
                alignItems: 'center',
                flexDirection: 'column',
                gap: 20,
              }}>
              <Button
                onPress={async () => {
                  await query.invalidateQueries({
                    queryKey: ['get-chat-list'],
                  });
                  await query.invalidateQueries({
                    queryKey: ['get-customer-possibles'],
                  });

                  if (chatRoomId) {
                    navigation.reset({
                      index: 0, // Reset to the first screen in the stack
                      routes: [
                        {
                          name: 'Messages',
                          params: {
                            isMare: isMare,
                            chatRoomId: chatRoomId,
                          },
                        },
                      ],
                    });
                  } else {
                    navigation.reset({
                      index: 0, // Reset to the first screen in the stack
                      routes: [
                        {
                          name: 'Messages',
                          params: {
                            isMare: isMare,
                          },
                        },
                      ],
                    });
                  }
                }}
                text="Chat Now"
                buttonStyle={styles.button1}
                textStyle={styles.text1}
              />
              <Button
                onPress={async () => {
                  navigation.navigate('HomeTab');
                  await query.invalidateQueries({queryKey: ['get-chat-list']});
                  await query.invalidateQueries({
                    queryKey: ['get-customer-possibles'],
                  });
                }}
                text="Keep Sighting"
                buttonStyle={styles.button2}
                textStyle={styles.text2}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainImage: {
    width: scale(300),
    height: scale(300),
    borderRadius: 999,
    borderWidth: 10,
    borderColor: '#F8F8F8',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    maxWidth: width,
    width: width - 64,
    height: 60,
    justifyContent: 'center',
    borderRadius: 30,
  },
  text1: {
    letterSpacing: -0.8,
    fontFamily: 'Montserrat-Bold',
    color: '#FB843E',
    fontSize: SIZES.h5,
  },
  button2: {
    alignItems: 'center',
    maxWidth: width,
    width: width - 64,
    height: 60,
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  text2: {
    letterSpacing: -0.8,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
});

export default MatchFound;
