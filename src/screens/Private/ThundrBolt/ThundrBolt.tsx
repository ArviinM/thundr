import React, {useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES, width} from '../../../constants/commons.ts';
import {BoltLogo} from '../../../assets/images/thundrbolt_icons/BoltLogo.tsx';
import {scale} from '../../../utils/utils.ts';
import GradientButton from '../../../components/shared/GradientButton.tsx';
import LinearGradient from 'react-native-linear-gradient';
import FeatureLists from '../../../components/ThundrBolt/FeatureLists.tsx';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {CloseIcon} from '../../../assets/images/CloseIcon.tsx';
import Toast from 'react-native-toast-message';
import GenericModal from '../../../components/shared/GenericModal.tsx';
import Button from '../../../components/shared/Button.tsx';
import {API_PAYMENT_URL} from '@env';
import {useHandoffSession} from '../../../hooks/auth/useHandoffSession.ts';
import {useAuth} from '../../../providers/Auth.tsx';

type ThundrBoltRouteProp = RouteProp<RootNavigationParams, 'ThundrBoltModal'>;

type ThundrBoltProps = {
  route?: ThundrBoltRouteProp;
};

const ThundrBolt = ({route}: ThundrBoltProps) => {
  const {isModal} = route?.params || {};
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const [visible, isVisible] = useState<boolean>(false);

  const {authData} = useAuth();
  const handoffKey = useHandoffSession();

  const [selectedTerm, setSelectedTerm] = useState<'yearly' | 'monthly'>(
    'yearly',
  ); // State to track selection

  return (
    <SafeAreaView
      edges={
        isModal
          ? ['left', 'right', 'bottom', 'top']
          : ['left', 'right', 'bottom']
      }
      style={{flex: 1, backgroundColor: COLORS.white}}>
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
              You're one step away from slaying this purchase, queen!{'\n'}
              You'll be redirected to our secure payment provider to complete
              your transaction.{'\n\n'}Feel free to cancel if you change your
              mind, though. We won't judge! 😉✨
            </Text>
            <View>
              <GradientButton
                onPress={async () => {
                  if (API_PAYMENT_URL && authData) {
                    const result = await handoffKey.mutateAsync({
                      sub: authData?.sub,
                      session: authData.accessToken,
                    });

                    // await Linking.openURL(
                    //   `${API_PAYMENT_URL}/auth/handoff?key=${result.key}`,
                    // );
                    await Linking.openURL(
                      `http://localhost:5173/auth/handoff?key=${result.key}&term=${selectedTerm}`,
                    );
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
      {isModal && (
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingVertical: 20,
          // alignItems: 'center',
        }}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <BoltLogo />
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 10,
              color: COLORS.gray,
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(11),
            }}>
            Paid subscription para sa mga{'\n'}kabog. Unlock exclusive access to
            all features.
          </Text>
        </View>
        <View style={{paddingVertical: 10, alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 4,
              color: COLORS.primary1,
              fontFamily: 'Montserrat-Black',
              fontSize: scale(18),
            }}>
            WHAT'S IN IT FOR YOU?{'\n'}LET ME TELL YOU, MARS!
          </Text>
        </View>
        {/* Gestures Here Swipe */}
        <View style={{paddingBottom: 60, flex: 1}}>
          <FeatureLists />
        </View>
      </ScrollView>
      <View style={{alignItems: 'center', width: '100%'}}>
        {/* Set width to 100% */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          {/*terms pickers*/}
          <TouchableOpacity
            onPress={() => setSelectedTerm('yearly')}
            style={{
              flex: 1,
              borderWidth: selectedTerm === 'yearly' ? 1.5 : 0,
              margin: scale(13),
              paddingHorizontal: scale(18),
              paddingVertical: scale(12),
              borderRadius: 10,
              borderColor:
                selectedTerm === 'yearly' ? COLORS.primary1 : 'transparent',
              backgroundColor:
                selectedTerm === 'yearly' ? COLORS.white : '#F3F4F7',
            }}>
            {/*yearly*/}
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: COLORS.primary1,
                    fontFamily: 'Montserrat-Black',
                    fontSize: scale(16),
                    paddingVertical: 3,
                  }}>
                  Yearly
                </Text>
                <LinearGradient
                  colors={['#ffce69', '#E43C59']}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0.2}}
                  style={{paddingHorizontal: 8, borderRadius: 10}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: scale(10),
                      color: COLORS.white,
                      padding: 3,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    SAVE{'\n'}P600!
                  </Text>
                </LinearGradient>
              </View>
              <Text
                style={{
                  color: COLORS.primary1,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(14),
                  paddingVertical: 3,
                }}>
                ₱3,000
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTerm('monthly')}
            style={{
              flex: 1,
              // borderWidth: 1.5,
              margin: scale(13),
              paddingHorizontal: scale(18),
              paddingVertical: scale(12),
              borderRadius: 10,
              borderColor:
                selectedTerm === 'yearly' ? 'transparent' : COLORS.primary1,
              borderWidth: selectedTerm === 'yearly' ? 0 : 1.5,
              backgroundColor:
                selectedTerm === 'yearly' ? '#F3F4F7' : COLORS.white,
            }}>
            {/*monthly*/}
            <View>
              <Text
                style={{
                  color: COLORS.primary1,
                  fontFamily: 'Montserrat-Black',
                  fontSize: scale(16),
                  paddingVertical: 3,
                }}>
                Monthly
              </Text>

              <Text
                style={{
                  color: COLORS.primary1,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(14),
                  paddingVertical: 3,
                }}>
                ₱300
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {/*Subscribe Button Here*/}
          <GradientButton
            onPress={() => {
              isVisible(true);
              // Toast.show({
              //   type: 'THNRInfo',
              //   props: {
              //     title: 'Wait lang mga mars!',
              //     subtitle: 'Subscribing to ThundrBolt, coming soon na!',
              //   },
              //   position: 'top',
              //   topOffset: 80,
              // });
            }}
            text="SUBSCRIBE"
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ThundrBolt;

const styles = StyleSheet.create({
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
