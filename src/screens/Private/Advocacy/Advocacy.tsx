import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AdvocacyBig} from '../../../assets/images/advocacy/AdvocacyBig.tsx';
import {BatteryIcon} from '../../../assets/images/advocacy/BatteryIcon.tsx';
import Button from '../../../components/shared/Button.tsx';
import {profileCreationStyles} from '../ProfileCreation/styles.tsx';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';

const Advocacy = () => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
      <ScrollView style={styles.scrollViewContainer}>
        <View
          style={{
            padding: scale(24),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
              fontSize: scale(15),
              color: '#534D4E',
            }}>
            Thundr gives back to the community{'\n'}with the help of your
            subscription.{'\n'}Sharing is caring, da va?!
          </Text>
        </View>
        <View
          style={{
            padding: scale(30),
            backgroundColor: '#FDF0F0',
            alignItems: 'center',
            marginHorizontal: scale(20),
            marginBottom: scale(20),
            borderRadius: 30,
            overflow: 'hidden',
            gap: scale(30),
          }}>
          {/*  Advocacy View   */}
          <LinearGradient
            colors={['#FFC128', '#E83C59']} // Gradient colors
            style={{
              padding: 6, // Padding to create border thickness
              borderRadius: 15,
            }}>
            <View
              style={{
                borderRadius: 15,
              }}>
              <View style={{backgroundColor: '#FDF0F0', borderRadius: 8}}>
                <View
                  style={{
                    paddingVertical: 16,
                    flexDirection: 'row',
                    gap: 20,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 16,
                  }}>
                  <AdvocacyBig />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-ExtraBold',
                      color: COLORS.primary1,
                      fontSize: scale(17),
                    }}>
                    Proceeds go to{'\n'}our beshies in{'\n'}chosen LGBTQIA+
                    {'\n'}
                    beneficiaries.
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          {/*  Battery View   */}
          <LinearGradient
            colors={['#FFC128', '#E83C59']} // Gradient colors
            style={{
              padding: 6, // Padding to create border thickness
              borderRadius: 15,
            }}>
            <View
              style={{
                borderRadius: 15,
              }}>
              <View style={{backgroundColor: '#FDF0F0', borderRadius: 8}}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <BatteryIcon />
                  <View style={{maxWidth: '70%'}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-ExtraBold',
                        color: COLORS.primary1,
                        fontSize: scale(26),
                      }}>
                      Donation{'\n'}to date
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        color: '#534D4E',
                        fontSize: scale(10),
                        textAlign: 'left',
                      }}>
                      Free users can donate a minimum of 100Php and get a 7-day
                      trial subscription for your support. Only valid once per
                      month.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
        {/*  Footer Button   */}
        <View style={{paddingHorizontal: scale(30), paddingVertical: scale(4)}}>
          <Button
            onPress={() => navigation.navigate('AdvocacyDonate')}
            text="Give them Thunder!"
            buttonStyle={[
              profileCreationStyles.buttonStyle,
              {backgroundColor: COLORS.primary1},
            ]}
            textStyle={[
              profileCreationStyles.buttonTextStyle,
              {fontSize: scale(17), fontFamily: 'Montserrat-Bold'},
            ]}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: '#534D4E',
              fontSize: scale(10),
              textAlign: 'center',
            }}>
            For updates, check out our website and follow{'\n'}us on our social
            media accounts.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Advocacy;

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    overflow: 'hidden',
  },
});
