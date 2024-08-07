import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GenericModal from '../../../components/shared/GenericModal.tsx';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import Button from '../../../components/shared/Button.tsx';
import {useCommunity} from '../../../providers/Community.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';

const FaceVerificationModal = () => {
  const {isModalVisible, hideModal} = useCommunity();
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <GenericModal
      isVisible={isModalVisible}
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
                hideModal();
              }}
              text="MAYBE LATER"
              buttonStyle={styles.buttonStyle2}
              textStyle={styles.buttonTextStyle2}
            />
            <Button
              onPress={() => {
                navigation.navigate('FaceVerificationStack');
                hideModal();
              }}
              text="VERIFY PROFILE"
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
      }
    />
  );
};

export default FaceVerificationModal;

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
    backgroundColor: COLORS.white2,
  },
  buttonTextStyle2: {
    fontFamily: 'Montserrat-SemiBold',
    color: COLORS.gray4,
    fontSize: SIZES.h5,
  },
});
