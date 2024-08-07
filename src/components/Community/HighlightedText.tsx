import React, {useState} from 'react';
import {Text, TouchableOpacity, Linking, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../../utils/utils.ts';

interface HighlightedTextProps {
  text: string;
  maxLength?: number;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const regex = /(https?:\/\/[^\s]+)|(\#\w+)/g;
  const parts = text.split(regex);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderText = () => {
    let currentLength = 0;
    const truncatedParts = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] || '';
      if (currentLength + part.length <= maxLength || isExpanded) {
        truncatedParts.push(part);
        currentLength += part.length;
      } else {
        const remainingLength = maxLength - currentLength;
        truncatedParts.push(part.slice(0, remainingLength));
        break;
      }
    }

    return truncatedParts.map((part, index) => {
      if (!part) {
        return null;
      }
      if (part.startsWith('http')) {
        return (
          <TouchableOpacity key={index} onPress={() => handleLinkPress(part)}>
            <Text style={styles.link}>{part}</Text>
          </TouchableOpacity>
        );
      } else if (part.startsWith('#')) {
        return (
          <Text key={index} style={styles.hashtag}>
            {part}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.text}>
          {part}
        </Text>
      );
    });
  };

  return (
    <>
      <View style={styles.container}>{renderText()}</View>
      {text.length > maxLength && (
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.seeMoreLess}>
            {isExpanded ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    color: COLORS.black,
  },
  link: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
  },
  hashtag: {
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
  },
  seeMoreLess: {
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
  },
});

export default HighlightedText;
