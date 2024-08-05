import React from 'react';
import {Text, TouchableOpacity, Linking, View} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({text}) => {
  // Regular expression to match URLs and hashtags
  const regex = /(https?:\/\/[^\s]+)|(\#\w+)/g;
  const parts = text.split(regex);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {parts.map((part, index) => {
        if (part && part.startsWith('http')) {
          return (
            <TouchableOpacity key={index} onPress={() => handleLinkPress(part)}>
              <Text
                style={{
                  color: COLORS.blue,
                  textDecorationLine: 'underline',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: scale(13),
                }}>
                {part}
              </Text>
            </TouchableOpacity>
          );
        } else if (part && part.startsWith('#')) {
          return (
            <Text
              key={index}
              style={{
                color: COLORS.primary1,
                fontFamily: 'Montserrat-Medium',
                fontSize: scale(13),
              }}>
              {part}
            </Text>
          );
        }
        return (
          <Text
            key={index}
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: scale(13),
              color: COLORS.black,
            }}>
            {part}
          </Text>
        );
      })}
    </View>
  );
};

export default HighlightedText;
