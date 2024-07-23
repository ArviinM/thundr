import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Linking, StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, width} from '../../constants/commons.ts';
import {Wip} from '../../assets/images/Wip.tsx';
import {scale} from '../../utils/utils.ts';
import Button from '../../components/shared/Button.tsx';
import GenericModal from '../../components/shared/GenericModal.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {useGetFacialVerificationState} from '../../hooks/faceverification/useGetFacialVerificationState.ts';
import {useAuth} from '../../providers/Auth.tsx';

const WorkingInProgress = () => {
  //Temporary
  const [visible, isVisible] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const {authData} = useAuth();

  const {data} = useGetFacialVerificationState({sub: authData?.sub || ''});

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <GenericModal
        isVisible={visible}
        content={
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Black',
                fontSize: scale(20),
                textAlign: 'center',
                color: COLORS.primary1,
              }}>
              Oops!
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(12),
                textAlign: 'center',
                color: COLORS.black,
              }}>
              Thundr is a safe space.{'\n'}
              Bago ang chika, verify muna.
            </Text>
            <View>
              <Button
                onPress={() => {
                  isVisible(false);
                }}
                text="MAYBE LATER"
                buttonStyle={styles.buttonStyle2}
                textStyle={styles.buttonTextStyle2}
              />
              <Button
                onPress={() => {
                  navigation.navigate('FaceVerificationStack');
                  isVisible(false);
                }}
                text="VERIFY PROFILE"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
              />
            </View>
          </View>
        }
      />
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
            fontSize: 20,
            marginHorizontal: 60,
            marginVertical: 30,
            textAlign: 'center',
          }}>
          Oops! Wait lang, mars. {'\n'} This feature will be available soon
        </Text>
        <Text>Status: {data}</Text>
        <Button onPress={() => isVisible(true)} text={'Open to Verify'} />
      </View>
    </SafeAreaView>
  );
};

export default WorkingInProgress;

const styles = StyleSheet.create({
  viewMain: {
    backgroundColor: '#fff',
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    width: width - 126,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
    backgroundColor: COLORS.black2,
  },
  buttonTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.white,
    fontSize: SIZES.h5,
  },
  buttonStyle2: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 126,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
    color: COLORS.white2,
  },
  buttonTextStyle2: {
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.gray4,
    fontSize: SIZES.h5,
  },
});
