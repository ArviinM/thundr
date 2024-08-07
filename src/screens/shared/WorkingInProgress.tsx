import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
import {Wip} from '../../assets/images/Wip.tsx';
import {scale} from '../../utils/utils.ts';

const WorkingInProgress = () => {
  //Temporary
  // const [visible, isVisible] = useState<boolean>(true);
  // const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  //
  // const {authData} = useAuth();
  //
  // const {data} = useGetFacialVerificationState({sub: authData?.sub || ''});

  return (
    <View style={{flex: 1}}>
      {/*<GenericModal*/}
      {/*  isVisible={visible}*/}
      {/*  content={*/}
      {/*    <View style={{flexDirection: 'column', gap: 10}}>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontFamily: 'Montserrat-Black',*/}
      {/*          fontSize: scale(20),*/}
      {/*          textAlign: 'center',*/}
      {/*          color: COLORS.primary1,*/}
      {/*        }}>*/}
      {/*        Oops!*/}
      {/*      </Text>*/}
      {/*      <Text*/}
      {/*        style={{*/}
      {/*          fontFamily: 'Montserrat-Medium',*/}
      {/*          fontSize: scale(12),*/}
      {/*          textAlign: 'center',*/}
      {/*          color: COLORS.black,*/}
      {/*        }}>*/}
      {/*        Thundr is a safe space.{'\n'}*/}
      {/*        Bago ang chika, verify muna.*/}
      {/*      </Text>*/}
      {/*      <View>*/}
      {/*        <Button*/}
      {/*          onPress={() => {*/}
      {/*            isVisible(false);*/}
      {/*          }}*/}
      {/*          text="MAYBE LATER"*/}
      {/*          buttonStyle={styles.buttonStyle2}*/}
      {/*          textStyle={styles.buttonTextStyle2}*/}
      {/*        />*/}
      {/*        <Button*/}
      {/*          onPress={() => {*/}
      {/*            navigation.navigate('FaceVerificationStack');*/}
      {/*            isVisible(false);*/}
      {/*          }}*/}
      {/*          text="VERIFY PROFILE"*/}
      {/*          buttonStyle={styles.buttonStyle}*/}
      {/*          textStyle={styles.buttonTextStyle}*/}
      {/*        />*/}
      {/*      </View>*/}
      {/*    </View>*/}
      {/*  }*/}
      {/*/>*/}
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Wip />
        </View>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: COLORS.primary1,
            fontSize: scale(13),
            marginHorizontal: 60,
            marginVertical: 30,
            textAlign: 'center',
          }}>
          Oops! Wait lang, mars. {'\n'} This feature will be available soon
        </Text>
        {/*<Text>Status: {data}</Text>*/}
        {/*<Button onPress={() => isVisible(true)} text={'Open to Verify'} />*/}
      </View>
    </View>
  );
};

export default WorkingInProgress;
