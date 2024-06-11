import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
} from 'react-native';
import Color from 'react-native-gifted-chat/lib/Color';
import {IMessage} from 'react-native-gifted-chat/lib/Models';
import {COLORS} from '../../constants/commons.ts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    // fontWeight: '600',
  },
});

export interface DayProps<TMessage extends IMessage = IMessage> {
  currentMessage?: TMessage;
  nextMessage?: TMessage;
  previousMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
  dateFormat?: string;
  inverted?: boolean;
}

import {format, isSameDay} from 'date-fns';

export function Day<TMessage extends IMessage = IMessage>({
  currentMessage,
  previousMessage,
  containerStyle,
  wrapperStyle,
  textStyle,
}: DayProps<TMessage>) {
  if (
    !currentMessage ||
    !previousMessage ||
    isSameDay(currentMessage.createdAt, previousMessage.createdAt)
  ) {
    return null;
  }

  const messageDate = new Date(currentMessage.createdAt);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // Subtract one day

  let dayLabel;
  if (isSameDay(messageDate, today)) {
    dayLabel = 'Today';
  } else if (isSameDay(messageDate, yesterday)) {
    dayLabel = 'Yesterday';
  } else {
    dayLabel = format(messageDate, 'MMMM dd, cccc');
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={wrapperStyle}>
        <Text style={[styles.text, textStyle]}>{dayLabel}</Text>
      </View>
    </View>
  );
}
