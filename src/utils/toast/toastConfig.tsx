import {ToastConfigParams} from 'react-native-toast-message';
import {Text, View} from 'react-native';
import * as React from 'react';
import {COLORS} from '../../constants/commons.ts';
import {scale} from '../utils.ts';

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
          fontFamily: 'ClimateCrisis-Regular',
          fontSize: scale(16),
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
          fontFamily: 'Montserrat-Medium',
          fontSize: scale(12),
          color: '#fff',
          textAlign: 'center',
        }}>
        {subtitle}
      </Text>
    )}
  </View>
);

const toastConfig = {
  THNRError: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor={'#E63051'}
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
  THNRSuccess: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor={'#2ECC71'}
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
  THNRWarning: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor="#FBB037"
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
  THNRInfo: ({props}: ToastConfigParams<any>) => (
    <CustomToast
      backgroundColor="#0F77F0"
      title={props.title}
      subtitle={props.subtitle}
    />
  ),
};

export default toastConfig;
