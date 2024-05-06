import Toast from 'react-native-toast-message';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {TREStatus} from '../../types/TREStatus.ts';
import getTREsStatusMessage from '../getTREsStatusMessage.ts';

export function showErrorToast(error: any) {
  // @ts-ignore
  console.error(error);

  if (error.status === 'UNAUTHORIZED' || error.statusCode === 401) {
  }

  if (
    error.status === 'MAX_SWIPES' ||
    error.status === 'POSSIBLES_COOLDOWN_EXCEPTION'
  ) {
    return;
  }

  const statusBarHeight = initialWindowMetrics?.insets.top || 20;
  const translatedError = getTREsStatusMessage(error.status as TREStatus);

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
