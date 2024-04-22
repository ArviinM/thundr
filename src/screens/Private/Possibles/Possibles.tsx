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

const Possibles = () => {
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const [isMare, setIsMare] = useState<boolean>(true);

  const [index, setIndex] = useState(0);

  const activeIndex = useSharedValue(0);
  const mareTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const jowaTranslations = useSharedValue<number[]>(new Array(10).fill(0));
  const sharedIsMare = useSharedValue<boolean>(false);

  const [users, setUsers] = useState<MockDataItem[]>(MockData);

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
        <View
          style={{
            flex: 1,
            marginTop: headerHeight,
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              paddingHorizontal: 20,
              color: 'white',
              textAlign: 'center',
              fontSize: scale(12),
              letterSpacing: -0.4,
            }}>
            When we say "Walang tapon", we are serious about it.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: 10,
            }}>
            <Button
              onPress={() => setIsMare(false)}
              text="JOWABLES"
              buttonStyle={{
                paddingVertical: 12,
                paddingHorizontal: 24,
                backgroundColor: COLORS.white,
                borderRadius: 10,
              }}
              textStyle={{
                fontFamily: 'Montserrat-Black',
                fontSize: scale(19),
                color: COLORS.primary1,
              }}
            />
            <Button
              onPress={() => setIsMare(true)}
              text="MAREBLES"
              buttonStyle={{
                paddingVertical: 12,
                paddingHorizontal: 24,
                backgroundColor: COLORS.white,
                borderRadius: 10,
              }}
              textStyle={{
                fontFamily: 'Montserrat-Black',
                fontSize: scale(19),
                color: COLORS.secondary2,
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              paddingHorizontal: 20,
              color: 'white',
              fontSize: scale(17),
              textAlign: 'center',
              letterSpacing: -0.4,
            }}>
            See the {isMare ? '8' : '69'} users who {isMare ? 'MARE' : 'JOWA'}{' '}
            you!
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
            {users?.map((user, index) => (
              <Card
                key={`${user.sub}-${index}-${user.customerData.name}`}
                user={user}
                numOfCards={users?.length}
                index={index}
                activeIndex={activeIndex}
                mareTranslation={mareTranslations}
                jowaTranslation={jowaTranslations}
                isMare={sharedIsMare}
                possibles
              />
            ))}
          </View>
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
