import React from 'react';
import {COLORS} from '../../constants/commons.ts';
import {StyleSheet, Text, View} from 'react-native';

const ErrorView: React.FC<{message: string}> = ({message}) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default ErrorView;
