import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/commons.ts';
import {scale} from '../../../utils/utils.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

import Button from '../../../components/shared/Button.tsx';
import {profileCreationStyles} from '../ProfileCreation/styles.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../../constants/navigator.ts';
import {AngHulingRampa} from '../../../assets/images/advocacy/AngHulingRampa.tsx';

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
            padding: scale(18),
            backgroundColor: '#FDF0F0',
            alignItems: 'center',
            marginHorizontal: scale(20),
            marginBottom: scale(20),
            borderRadius: 30,
            overflow: 'hidden',
            gap: scale(10),
          }}>
          {/*  Ang Huling Rampa   */}
          <AngHulingRampa />
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              color: '#534D4E',
              fontSize: scale(12),
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
            “In the end, the sun sets alone. And, they are beautiful.”
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#534D4E',
              fontSize: scale(12),
              textAlign: 'left',
            }}>
            Ang Huling Rampa is Thundr’s advocacy to{'\n'}give passing elder
            members of the LGBTQIA+{'\n'}community the proper burial they
            deserve.{'\n'}As the first ever LGBTQIA+ community app in{'\n'}the
            country, we make it our mission to ensure{'\n'}members face death
            with heads held high.{'\n'}With the help of your subscription and/or
            {'\n'}
            voluntary contribution, we will allot a fund to{'\n'}make their
            burials reflect the colorful lives they led.{'\n'}
            {'\n'}Together in Ang Huling Rampa, let’s give final{'\n'}respects
            to our elders who paved the way{'\n'}before us.
          </Text>
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
