import React, {useState} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../../components/shared/Button.tsx';
import {profileCreationStyles} from '../ProfileCreation/styles.tsx';

import {AdvocacyDonateIcon} from '../../../assets/images/advocacy/AdvocacyDonateIcon.tsx';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import {API_PAYMENT_URL} from '@env';
import Toast from 'react-native-toast-message';
import {useAuth} from '../../../providers/Auth.tsx';
import {useHandoffSession} from '../../../hooks/auth/useHandoffSession.ts';
import GenericModal from '../../../components/shared/GenericModal.tsx';

const AdvocacyDonate = () => {
  const {authData} = useAuth();
  const handoffKey = useHandoffSession();
  const [visible, isVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <GenericModal
        isVisible={visible}
        content={
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                fontFamily: 'ClimateCrisis-Regular',
                fontSize: scale(20),
                textAlign: 'center',
                color: COLORS.primary1,
              }}>
              Proceed to Payment, Marsha!
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(12),
                textAlign: 'center',
                color: COLORS.black,
              }}>
              You're one step away from slaying this donation, queen!{'\n'}
              You'll be redirected to our secure payment provider to complete
              your transaction.{'\n\n'}Feel free to cancel if you change your
              mind, though. We won't judge! 😉✨
            </Text>
            <View>
              <GradientButton
                onPress={async () => {
                  if (API_PAYMENT_URL && authData) {
                    // const result = await handoffKey.mutateAsync({
                    //   sub: authData?.sub,
                    //   session: authData.accessToken,
                    // });

                    Toast.show({
                      type: 'THNRInfo',
                      props: {
                        title: 'Wait lang mga mars!',
                        subtitle:
                          'Donating to our Advocacy is still on the works!',
                      },
                      position: 'top',
                      topOffset: 80,
                    });

                    // await Linking.openURL(
                    //   `${API_PAYMENT_URL}/auth/handoff?key=${result.key}&product=THDR-ADVC-001`,
                    //   // `http://localhost:5173/auth/handoff?key=${result.key}&product=THDR-ADVC-001`,
                    // );
                    isVisible(false);
                  } else {
                    Toast.show({
                      type: 'THNRInfo',
                      props: {
                        title: 'Wait lang mga mars!',
                        subtitle: 'Donating to our Advocacy, coming soon na!',
                      },
                      position: 'top',
                      topOffset: 80,
                    });
                    isVisible(false);
                  }
                }}
                text="Proceed"
                buttonStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                loading={handoffKey.isPending}
              />
              <Button
                onPress={() => {
                  isVisible(false);
                }}
                text="Cancel"
                buttonStyle={styles.buttonStyle2}
                textStyle={styles.buttonTextStyle2}
              />
            </View>
          </View>
        }
      />
      <View style={styles.viewMain}>
        <View style={{alignItems: 'center', gap: 30}}>
          <View>
            <AdvocacyDonateIcon />
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              color: COLORS.primary1,
              fontSize: scale(26),
              textAlign: 'center',
            }}>
            Donate to date
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#534D4E',
              fontSize: scale(10),
              textAlign: 'center',
            }}>
            Thundr gives back to the community with the help of{'\n'}your
            subscription. Sharing is caring, da va?!{'\n'}Proceeds go to our
            beshies in chosen LGBTQIA+{'\n'}beneficiaries.
          </Text>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: COLORS.white,
              // paddingTop: scale(60),
            }}>
            <GradientButton
              onPress={async () => {
                if (API_PAYMENT_URL && authData) {
                  isVisible(true);
                } else {
                  Toast.show({
                    type: 'THNRInfo',
                    props: {
                      title: 'Wait lang mga mars!',
                      subtitle: 'Subscribing to ThundrBolt, coming soon na!',
                    },
                    position: 'top',
                    topOffset: 80,
                  });
                }
              }}
              text="DONATE"
              buttonStyle={profileCreationStyles.buttonStyle}
              textStyle={[
                profileCreationStyles.buttonTextStyle,
                {fontSize: scale(17), fontFamily: 'Montserrat-Bold'},
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdvocacyDonate;

const styles = StyleSheet.create({
  viewMain: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 64,
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
  buttonStyle2: {
    alignItems: 'center',
    // maxWidth: width,
    width: width - 64,
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 12,
    backgroundColor: COLORS.gray2,
  },
  buttonTextStyle2: {
    letterSpacing: -0.4,
    fontFamily: 'Montserrat-Bold',
    color: COLORS.gray4,
    fontSize: SIZES.h5,
  },
});
