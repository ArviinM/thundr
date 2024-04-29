import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AdvocacyBig} from '../../../assets/images/advocacy/AdvocacyBig.tsx';
import {BatteryIcon} from '../../../assets/images/advocacy/BatteryIcon.tsx';
import Button from '../../../components/shared/Button.tsx';

const Advocacy = () => {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <ScrollView style={styles.scrollViewContainer}>
        <View
          style={{
            padding: 20,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 0.2,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            Thundr gives back to the community{'\n'}with the help of your
            subscription.{'\n'}Sharing is caring, da va?!
          </Text>
        </View>
        <View
          style={{paddingHorizontal: scale(30), paddingVertical: scale(20)}}>
          <View style={{backgroundColor: '#FDF0F0', borderRadius: 20}}>
            <View style={{padding: 20, flexDirection: 'row', gap: 20}}>
              <AdvocacyBig />
              <Text
                style={{
                  fontFamily: 'Montserrat-ExtraBold',
                  color: COLORS.primary1,
                  fontSize: scale(18),
                }}>
                Proceeds go to{'\n'}our beshies in{'\n'}chosen LGBTQIA+{'\n'}
                beneficiaries.
              </Text>
            </View>
            <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.gray,
                  fontSize: scale(10),
                  textAlign: 'center',
                }}>
                For updates, check out our website and follow{'\n'}us on our
                social media accounts.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{paddingHorizontal: scale(30), paddingVertical: scale(20)}}>
          <View style={{backgroundColor: '#FDF0F0', borderRadius: 20}}>
            <View
              style={{
                padding: 20,
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <BatteryIcon />
              <View>
                <Text
                  style={{
                    fontFamily: 'Montserrat-ExtraBold',
                    color: COLORS.primary1,
                    fontSize: scale(26),
                  }}>
                  Donation{'\n'}to date
                </Text>
                <Button
                  onPress={() => console.log('give them thundr ')}
                  text="Give them Thunder!"
                  buttonStyle={{
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    backgroundColor: COLORS.primary1,
                    marginVertical: 10,
                    borderRadius: 20,
                  }}
                  textStyle={{
                    fontFamily: 'Montserrat-Bold',
                    fontSize: scale(12),
                    color: COLORS.white,
                  }}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  color: COLORS.gray,
                  fontSize: scale(10),
                  textAlign: 'center',
                }}>
                Free users can donate a minimum of 100Php{'\n'}and get a 7-day
                trial subscription for your{'\n'}support. Only valid once per
                month.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Advocacy;

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: COLORS.white,
  },
});
