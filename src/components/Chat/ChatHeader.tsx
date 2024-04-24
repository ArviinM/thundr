import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Chat} from '../../types/generated.ts';
import {IMAGES} from '../../constants/images.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigationParams} from '../../constants/navigator.ts';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';
import {calculateAge} from '../Home/utils.ts';
import {ChatReportIcons} from '../../assets/images/report/ChatReportIcons.tsx';

const ChatHeader = ({user, isMare}: {user: Chat; isMare: boolean}) => {
  const navigation = useNavigation<NavigationProp<RootNavigationParams>>();

  return (
    <View
      style={{
        flexDirection: 'row',

        marginHorizontal: 20,
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
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ChatReportIcons isMare={isMare} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {alignItems: 'flex-start'},
  backImage: {alignSelf: 'flex-start', width: 26, height: 26, aspectRatio: 1},
});

export default ChatHeader;
