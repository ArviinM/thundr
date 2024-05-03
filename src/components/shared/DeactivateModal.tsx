import * as React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants/commons.ts';
import LottieView from 'lottie-react-native';

interface DeactivateModalProps {
  isVisible: boolean;
  title: string;
  content?: React.ReactNode; // Allow for custom content
  buttonText: string;
  onClose: () => void;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  isVisible,
  title,
  content,
  buttonText,
  onClose,
}) => {
  // const bottomTabBarHeight = useBottomTabBarHeight();

  const [animation] = React.useState(new Animated.Value(0));

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

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  return (
    <Modal transparent animationType="fade" visible={isVisible}>
      <Animated.View
        style={[styles.container, {opacity, transform: [{scale}]}]}>
        <View style={[styles.bodyContainer]}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <LottieView
              source={require('../../assets/animations/sad.json')}
              style={{
                width: 100,
                height: 100,
              }}
              autoPlay
              loop
            />
          </View>

          <Text style={styles.title}>{title}</Text>

          {content && <View style={styles.content}>{content}</View>}

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
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
    padding: 20,
    borderRadius: 25,
    margin: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'ClimateCrisis-Regular',
    color: COLORS.black,
  },
  content: {
    marginBottom: 20,
    padding: 15, // Add some padding around the  content
  },
  button: {
    backgroundColor: COLORS.secondary2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});

export default DeactivateModal;
