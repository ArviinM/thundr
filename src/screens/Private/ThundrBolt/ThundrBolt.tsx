import React from 'react';
import {
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

const ThundrBolt = () => {
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={{flex: 1, backgroundColor: COLORS.white}}>
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
            style={{
              flex: 1,
              borderWidth: 1.5,
              margin: scale(13),
              paddingHorizontal: scale(18),
              paddingVertical: scale(12),
              borderRadius: 10,
              borderColor: COLORS.primary1,
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
            style={{
              flex: 1,
              // borderWidth: 1.5,
              margin: scale(13),
              paddingHorizontal: scale(18),
              paddingVertical: scale(12),
              borderRadius: 10,
              // borderColor: COLORS.primary1,
              backgroundColor: '#F3F4F7',
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
            onPress={() => console.log('Open navigation')}
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
});
