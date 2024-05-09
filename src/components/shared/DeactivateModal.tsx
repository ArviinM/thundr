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
  onDeactivate: () => void;
  onClose: () => void;
}

const DeactivateModal: React.FC<DeactivateModalProps> = ({
  isVisible,
  title,
  content,
  buttonText,
  onDeactivate,
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

          <View style={{gap: 10}}>
            <TouchableOpacity style={styles.button} onPress={onDeactivate}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={onClose}>
              <Text style={styles.buttonText}>Ay di muna!</Text>
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
  button2: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
});

export default DeactivateModal;
