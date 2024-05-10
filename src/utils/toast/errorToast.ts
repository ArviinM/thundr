import Toast from 'react-native-toast-message';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {TREStatus} from '../../types/TREStatus.ts';
import getTREsStatusMessage from '../getTREsStatusMessage.ts';

export function showErrorToast(error: any) {
  // @ts-ignore
  console.error(error);

  const statusBarHeight = initialWindowMetrics?.insets.top || 20;
  const translatedError = getTREsStatusMessage(error.status as TREStatus);

  if (error.statusCode === 503) {
    // Toast.show({
    //   type: 'THNRInfo',
    //   props: {
    //     title: 'Thundr PH Maintenance',
    //     subtitle: "We'll be right back!",
    //   },
    //   position: 'top',
    //   topOffset: statusBarHeight / 1.8,
    // });
    return;
  }

  if (
    error.status === 'MAX_SWIPES' ||
    error.status === 'POSSIBLES_COOLDOWN_EXCEPTION'
  ) {
    return;
  }

  Toast.show({
    type: 'THNRError',
    props: {
      title: translatedError.title || '',
      subtitle: translatedError.body || error.message,
    },
    position: 'top',
    topOffset: statusBarHeight / 1.8,
  });
}
