import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Chat} from '../../types/generated.ts';
import {IMAGES} from '../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS, width} from '../../constants/commons.ts';
import {calculateAge} from '../Home/utils.ts';
import {ChatReportIcons} from '../../assets/images/report/ChatReportIcons.tsx';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import ProfileCard from '../Home/ProfileCard.tsx';

import {Image as ImageExpo} from 'expo-image';

const ChatHeader = ({user, isMare}: {user: Chat; isMare: boolean}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

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

  const scaleAnim = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const profileCardModal = () => {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onRequestClose={() => setIsVisible(false)}>
        <Animated.View
          style={[
            styles.container,
            {opacity, transform: [{scale: scaleAnim}]},
          ]}>
          <View style={[styles.bodyContainer, {marginBottom: 20}]}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isMare ? COLORS.secondary2 : COLORS.primary1,
                },
              ]}
              onPress={() => setIsVisible(false)}>
              <Text style={[styles.buttonText]}>Close</Text>
            </TouchableOpacity>
            <ProfileCard
              user={{
                sub: '',
                percent: '',
                customerData: user.profile,
              }}
              possibles={false}
            />
          </View>
        </Animated.View>
      </Modal>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: COLORS.gray2,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        gap: 20,
      }}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Messages', {isMare: isMare})}
          style={styles.backButton}>
          <Image
            source={IMAGES.back}
            style={styles.backImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <ImageExpo
            source={{uri: user.profile.customerPhoto[0].photoUrl}}
            style={{width: scale(42), height: scale(42), borderRadius: 8}}
            transition={1000}
            placeholder={user.profile.customerPhoto[0].blurHash}
          />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-ExtraBold',
              color: isMare ? COLORS.secondary2 : COLORS.primary1,
              letterSpacing: -0.4,
              fontSize: scale(16),
            }}>
            {user.profile.name.split(' ')[0] || '👻'},{' '}
            {calculateAge(user.profile.birthday)}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: COLORS.black,
              letterSpacing: -0.4,
              fontSize: scale(12),
            }}>
            Compatibility Score: 80%
          </Text>
        </View>
      </View>
      <View style={{flex: 1}} />
      <View>
        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={styles.backButton}>
          <ChatReportIcons isMare={isMare} />
        </TouchableOpacity>
      </View>
      <ReportBottomSheetModal
        ref={bottomSheetRef}
        sub={user.target}
        category={'CHAT'}
        name={user.profile.name}
      />
      {profileCardModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {alignItems: 'flex-start'},
  backImage: {alignSelf: 'flex-start', width: 26, height: 26, aspectRatio: 1},
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
  },
  bodyContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: width / 1.07,
    height: '66%',
  },
  button: {
    position: 'absolute',
    top: scale(-46),
    right: 0,
    zIndex: 10,
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

export default ChatHeader;
