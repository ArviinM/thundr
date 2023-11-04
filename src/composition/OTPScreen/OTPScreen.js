// React modules
import React from 'react';

// Third party libraries
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

// Utils
import {
  isIosDevice,
  moderateScale,
  scale,
  verticalScale,
} from '../../utils/commons';

const OTPScreen = props => {
  const {otp, setOtp, password = false, keyboardType = 'numeric'} = props;
  return (
    <SmoothPinCodeInput
      codeLength={6}
      keyboardType={keyboardType}
      restrictToNumbers
      password={password}
      mask="*"
      animationFocused={null}
      value={otp}
      cellStyleFocused={{borderColor: 'transparent', borderWidth: 2}}
      cellSize={scale(50)}
      maskDelay={0}
      cellSpacing={scale(10)}
      cellStyle={{
        flex: 1,
        borderRadius: 8,
        borderWidth: 2,
        height: verticalScale(isIosDevice() ? 40 : 50),
        width: scale(42),
        borderColor: 'transparent',
        backgroundColor: '#fff',
      }}
      textStyle={{
        fontSize: moderateScale(18),
        color: '#E33051',
        fontWeight: 700,
      }}
      onTextChange={text => {
        setOtp(text);
      }}
    />
  );
};

export default OTPScreen;
