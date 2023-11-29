import React, {useState} from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import Image from '../../components/Image/Image';
import {MESSAGES_ASSET_URI} from '../../utils/images';
import {scale, verticalScale} from '../../utils/commons';
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../TextInput/TextInput';

const ChatSelection = props => {
  const {setMareChatListActive} = props;
  const [displaySearchContainer, setDisplaySearchContainer] = useState(false);

  const renderSearchContainer = () => {
    return (
      <View style={{top: verticalScale(5)}}>
        <TextInput
          placeholder="Search"
          onBlur={() => {
            setDisplaySearchContainer(false);
          }}
          onEndEditing={() => {
            setDisplaySearchContainer(false);
          }}
        />
        <ImageBackground
          source={MESSAGES_ASSET_URI.SEARCH_CONTAINER}
          style={{
            top: verticalScale(14),
            left: scale(265),
            height: 56,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}>
          <Image
            source={MESSAGES_ASSET_URI.SEARCH_ICON}
            height={20}
            width={20}
          />
        </ImageBackground>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#f2653c', '#fa7d35', '#fe9630', '#ffae2f', '#ffc634']}
      start={{x: 0.5, y: 1}}
      end={{x: 0.5, y: 0}}
      style={{
        flexDirection: 'row',
        width: '100%',
        gap: scale(25),
        paddingLeft: scale(displaySearchContainer ? 10 : 20),
      }}>
      {displaySearchContainer && renderSearchContainer()}
      <TouchableOpacity onPress={() => setMareChatListActive(false)}>
        <Image source={MESSAGES_ASSET_URI.JOWA} height={80} width={80} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMareChatListActive(true)}>
        <Image source={MESSAGES_ASSET_URI.MARE} height={80} width={80} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{top: verticalScale(30), left: scale(70)}}
        onPress={() => setDisplaySearchContainer(true)}>
        <Image source={MESSAGES_ASSET_URI.SEARCH_ICON} height={20} width={20} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ChatSelection;
