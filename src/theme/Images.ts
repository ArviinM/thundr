import { ThemeVariables } from 'types/theme';

export default function ({}: ThemeVariables) {
   return {
      logo: require('./assets/images/logo.png'),
      icons: {
         phone: require('./assets/images/1x/icon_phone.png'),
         back_arrow: require('./assets/images/1x/icon_back_arrow.png'),
         icon_hold_phone: require('./assets/images/icon_hold_phone.png'),
         icon_lock_password: require('./assets/images/icon_lock_password.png'),
         icon_mobile_otp: require('./assets/images/icon_mobile_otp.png'),
         icon_lock: require('./assets/images/icon_lock.png'),
         icon_google: require('./assets/images/social/google.png'),
         icon_facebook: require('./assets/images/social/facebook.png'),
         icon_phone_hold: require('./assets/images/phone_hold.png'),
         icon_plus: require('./assets/images/plus.png'),
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
         icon_apple: require('./assets/images/social/icon_apple.png'),
      },
      forms: {
         lgbtq: require('./assets/images/lgbtqia_plus.png'),
      },
      app_bar: {
         logo: require('./assets/images/app_bar_logo.png'),
      },
   };
}
