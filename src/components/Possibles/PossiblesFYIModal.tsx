import * as React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES, width} from '../../constants/commons.ts';

import {calculateCountdownSwipes, scale} from '../../utils/utils.ts';
import {useEffect, useState} from 'react';
import moment from 'moment';
import GradientButton from '../shared/GradientButton.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';

interface PossiblesModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PossiblesFYIModal: React.FC<PossiblesModalProps> = ({
  isVisible,
  onClose,
}) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  const [animation] = React.useState(new Animated.Value(0));
  const [countdownTime, setCountdownTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const midnight = moment()
    .endOf('day')
    .add(1, 'day')
    .set({hour: 23, minute: 59, second: 0, millisecond: 0})
    .unix();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCountdown = calculateCountdownSwipes(midnight);
      setCountdownTime(newCountdown);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup function
  }, [midnight]);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation, isVisible]);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scaleAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <Animated.View
        style={[styles.container, {opacity, transform: [{scale: scaleAnim}]}]}>
        <View style={[styles.bodyContainer]}>
          <Text style={styles.title}>FYI, sis!</Text>
          <Text style={styles.content}>
            This refreshes every 12 hours. Don’t miss the{'\n'}chance to say hi.
            Keri? {'\n'}
            {'\n'}See all who swiped you when you subscribe.
          </Text>
          <GradientButton
            onPress={() => {
              navigation.navigate('ThundrBoltModal', {isModal: true});
              onClose();
            }}
            text="SUBSCRIBE NOW"
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{paddingVertical: 10}} onPress={onClose}>
              <Text
                style={{color: COLORS.gray, fontFamily: 'Montserrat-Medium'}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  bodyContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: scale(20),
    marginTop: 16,
    marginBottom: 4,
    textAlign: 'center',
    fontFamily: 'ClimateCrisis-Regular',
    color: COLORS.secondary2,
  },
  content: {
    fontSize: scale(12),
    marginVertical: 4,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: COLORS.black,
  },
  buttonStyle: {
    alignItems: 'center',
    width: width - 124,
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

export default PossiblesFYIModal;
