import {ToastConfigParams} from 'react-native-toast-message';
import {Text, View} from 'react-native';
import * as React from 'react';
import {COLORS} from '../../constants/commons.ts';

interface CustomToastProps {
  backgroundColor: string;
  message?: string | object;
  title?: string;
  subtitle?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({
  backgroundColor,
  title,
  subtitle,
  message,
}) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      height: 'auto',
      padding: 20,
      width: '80%',
      borderRadius: 20,
      // borderWidth: 3,
      // borderColor: '#FEBC29',
    }}>
    {title && (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: 16,
          color: '#fff',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    )}
    {subtitle && (
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 12,
          color: '#fff',
        }}>
        {subtitle}
      </Text>
    )}
  </View>
);

const toastConfig = {
  THNRError: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor={COLORS.primary1}
      title={props.title}
      // subtitle={props.subtitle}
    />
  ),
  THNRSuccess: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor={COLORS.inverted}
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
  THNRWarning: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor="#EFA72A"
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
  THNRInfp: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor="#55C9DF"
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
};

export default toastConfig;
