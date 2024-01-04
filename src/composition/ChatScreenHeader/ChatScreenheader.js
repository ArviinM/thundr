// React Modules
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// Third Party Libraries
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// Components
import {BorderLinearGradient} from '../../screens/public/ProfileCreationScreen/Styled';
import ChatActiveIndicator from '../../components/ChatActiveIndicator/ChatActiveIndicator';
import Image from '../../components/Image/Image';
import Text from '../../components/Text/Text';

// Utils
import {calculateAge, scale, verticalScale} from '../../utils/commons';
import {GLOBAL_ASSET_URI} from '../../utils/images';

const ChatScreenHeader = props => {
  const {
    chatCustomerDetails,
    is1MinAgoActive,
    is5MinsAgoActive,
    is30MinsAgoActive,
    compatibilityScore,
  } = props;
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{
        flexDirection: 'row',
        gap: scale(25),
        paddingLeft: scale(20),
        height: verticalScale(60),
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Messages'}],
            })
          }>
          <Image
            source={GLOBAL_ASSET_URI.PROFILE_BACK_ICON}
            height={25}
            width={25}
          />
        </TouchableOpacity>
        <BorderLinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#E72454', '#FFC227']}
          style={{
            marginHorizontal: scale(8),
            height: verticalScale(50),
            width: scale(60),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatmateProfile', {
                chatCustomerDetails,
                compatibilityScore,
              });
            }}>
            <View
              style={{
                height: verticalScale(47),
                backgroundColor: '#9B9DA0',
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: chatCustomerDetails?.customerPhoto?.[0]?.photoUrl,
                }}
                height={47}
                width={58}
                resizeMode="cover"
                customStyle={{
                  borderRadius: 20,
                }}
              />
            </View>
          </TouchableOpacity>
        </BorderLinearGradient>
        <ChatActiveIndicator
          is1MinAgoActive={is1MinAgoActive}
          is5MinsAgoActive={is5MinsAgoActive}
          is30MinsAgoActive={is30MinsAgoActive}
          customStyle={{left: scale(80), top: verticalScale(43)}}
        />
        <View>
          <Text
            fontFamily="Montserrat-Medium"
            color="#fff"
            size={20}
            weight="700">
            {chatCustomerDetails?.name},{' '}
            {calculateAge(chatCustomerDetails?.birthday)}
          </Text>
          <Text fontFamily="Montserrat-Medium" color="#fff" size={15}>
            {`Compatibility Score: ${compatibilityScore || 0}%`}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChatScreenHeader;
