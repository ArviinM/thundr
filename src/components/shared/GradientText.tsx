import React from 'react';
import {Text, StyleSheet} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from '../../utils/utils.ts';
import {COLORS} from '../../constants/commons.ts';

interface GradientTextProps {
  text: string;
  style?: any;
}

const GradientText = ({text, style}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text style={[styles.text, style]}>{text} </Text>}>
      <LinearGradient
        colors={[COLORS.primary1, COLORS.secondary2]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1}}>
        <Text style={[styles.text, {opacity: 0}]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: scale(13),
    color: COLORS.black,
  },
});

export default GradientText;
