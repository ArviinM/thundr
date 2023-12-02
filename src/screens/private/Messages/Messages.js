// React modules
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

// Third party libraries
import {useNavigation} from '@react-navigation/native';

// Components
import Text from '../../../components/Text/Text';
import ChatSelection from '../../../composition/ChatSelection/ChatSelection';
import Separator from '../../../components/Separator/Separator';
import Image from '../../../components/Image/Image';

// Utils
import {isIosDevice, scale, verticalScale} from '../../../utils/commons';
import {MESSAGES_ASSET_URI, SAMPLE_IMAGE} from '../../../utils/images';

// Styles
import {BorderLinearGradient} from '../PersonalityType/Styled';

const dummyData = [
  {
    name: 'Cholo',
    age: '39',
    work: 'CEO at Business Inc.',
    compatibilityScore: '89%',
  },
  {
    name: 'John Mark',
    age: '42',
    work: 'Creative Director',
    compatibilityScore: '65%',
  },
  {
    name: 'Jethro',
    age: '46',
    work: 'Account Specialist',
    compatibilityScore: '55%',
  },
];

const JowaChatList = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}
      data={dummyData}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen')}
            key={index}
            style={{
              top: verticalScale(15),
              flexDirection: 'row',
              marginBottom: verticalScale(10),
              alignItems: 'center',
            }}>
            <Separator space={10} />
            <BorderLinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#E72454', '#FFC227']}
              style={{marginHorizontal: scale(8), height: verticalScale(60)}}>
              <View
                style={{
                  height: verticalScale(57),
                  backgroundColor: '#9B9DA0',
                  borderRadius: 15,
                  alignItems: 'center',
                }}>
                <Image source={SAMPLE_IMAGE.SAMPLE_1} height={60} width={60} />
              </View>
            </BorderLinearGradient>
            <View style={{left: scale(5)}}>
              <Text
                size={25}
                color="#E33C59"
                fontFamily="Montserrat-Bold"
                weight="700">
                {item.name}, {item.age}
              </Text>
              <Text size={15} color="#808080" fontFamily="Montserrat-Medium">
                {item.work}
              </Text>
              <Text color="#808080" fontFamily="Montserrat-Medium" size={15}>
                {`Compatibility Score: ${item.compatibilityScore}`}
              </Text>
            </View>
            <View
              style={{
                top: verticalScale(5),
                left: scale(isIosDevice() ? 20 : 10),
              }}>
              <Image
                source={MESSAGES_ASSET_URI.THUNDR_1}
                height={65}
                width={65}
              />
            </View>
          </TouchableOpacity>
        );
      }}
      ListEmptyComponent={() => {
        return (
          <View style={{alignContent: 'center', justifyContent: 'center'}}>
            <Text>No recent messages</Text>
          </View>
        );
      }}
    />
  );
};

const MareChatList = () => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={() => {
        return (
          <View style={{alignItems: 'center'}}>
            <Text>CHAT LIST IS EMPTY</Text>
          </View>
        );
      }}
    />
  );
};

const Messages = () => {
  const [isMareChatListActive, setMareChatListActive] = useState(false);
  return (
    <View
      style={{
        backgroundColor: '#ECE7E4',
        flex: 1,
      }}>
      <ChatSelection
        setMareChatListActive={setMareChatListActive}
        isMareChatListActive={isMareChatListActive}
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        {isMareChatListActive ? <MareChatList /> : <JowaChatList />}
      </View>
    </View>
  );
};

export default Messages;
