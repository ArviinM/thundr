import React, {useState} from 'react';
import {Text, TouchableOpacity, Linking, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/commons';
import {scale} from '../../utils/utils';

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
          <Text key={index} style={styles.text}>
            <Text style={styles.link} onPress={() => handleLinkPress(part)}>
              {part}
            </Text>
          </Text>
        );
      } else if (part.startsWith('#')) {
        return (
          <Text key={index} style={styles.text}>
            <Text style={styles.hashtag}>{part}</Text>
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
    alignItems: 'flex-start', // Align items to the top to avoid extra padding
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    color: COLORS.black,
    lineHeight: scale(18), // Ensure consistent line height
  },
  link: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    lineHeight: scale(18),
  },
  hashtag: {
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    lineHeight: scale(18),
  },
  seeMoreLess: {
    color: COLORS.primary1,
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(13),
    marginTop: scale(5), // Add a little margin to separate the See More/Less text
  },
});

export default HighlightedText;
