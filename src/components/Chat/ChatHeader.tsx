import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Chat} from '../../types/generated.ts';
import {IMAGES} from '../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {calculateAge} from '../Home/utils.ts';
import {ChatReportIcons} from '../../assets/images/report/ChatReportIcons.tsx';
import ReportBottomSheetModal from '../Report/ReportBottomSheet.tsx';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const ChatHeader = ({user, isMare}: {user: Chat; isMare: boolean}) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = () => bottomSheetRef.current?.present();

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
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={IMAGES.back}
            style={styles.backImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Image
          source={{uri: user.profile.customerPhoto[0].photoUrl}}
          style={{width: scale(42), height: scale(42), borderRadius: 8}}
          resizeMode="cover"
        />
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
        sub={user.sub}
        category={'CHAT'}
        name={user.profile.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {alignItems: 'flex-start'},
  backImage: {alignSelf: 'flex-start', width: 26, height: 26, aspectRatio: 1},
});

export default ChatHeader;
