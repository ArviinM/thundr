import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
   return {
      logo: require('./assets/images/logo.png'),
      sparkles: {
         topLeft: require('./assets/images/sparkles-top-left.png'),
         top: require('./assets/images/sparkles-top.png'),
         topRight: require('./assets/images/sparkles-top-right.png'),
         right: require('./assets/images/sparkles-right.png'),
         bottomRight: require('./assets/images/sparkles-bottom-right.png'),
         bottom: require('./assets/images/sparkles-bottom.png'),
         bottomLeft: require('./assets/images/sparkles-bottom-left.png'),
      },
      icons: {
         colors: require('./assets/images/colorswatch.png'),
         send: require('./assets/images/send.png'),
         translate: require('./assets/images/translate.png'),
         phone: require('./assets/images/1x/icon_phone.png'),
         back_arrow: require('./assets/images/1x/icon_back_arrow.png'),
         icon_hold_phone: require('./assets/images/icon_hold_phone.png'),
         icon_lock_password: require('./assets/images/icon_lock_password.png'),
         icon_mobile_otp: require('./assets/images/icon_mobile_otp.png'),
         icon_lock: require('./assets/images/icon_lock.png'),
      },
      key_features: [
         require('./assets/images/key_features/1x/1.png'),
         require('./assets/images/key_features/1x/2.png'),
         require('./assets/images/key_features/1x/3.png'),
         require('./assets/images/key_features/1x/4.png'),
         require('./assets/images/key_features/1x/5.png'),
         require('./assets/images/key_features/1x/6.png'),
      ],
      socials: {
         icon_google: require('./assets/images/1x/icon_google.png'),
         icon_facebook: require('./assets/images/1x/icon_facebook.png'),
      },
   };
}
