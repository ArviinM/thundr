import * as React from 'react';
import {
  Animated,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../constants/commons.ts';
import LottieView from 'lottie-react-native';
import {scale} from '../../utils/utils.ts';

interface GenericModalProps {
  isVisible: boolean;
  content: React.ReactNode; // Allow for custom content
}

const GenericModal: React.FC<GenericModalProps> = ({isVisible, content}) => {
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
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      statusBarTranslucent>
      <Animated.View
        style={[styles.container, {opacity, transform: [{scale}]}]}>
        <View style={styles.bodyContainer}>
          {content && <View style={styles.content}>{content}</View>}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(74, 0, 18, 0.43)',
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
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  content: {padding: scale(6)},
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

export default GenericModal;
