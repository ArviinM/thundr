import Toast from 'react-native-toast-message';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export function showErrorToast(error: any) {
  // const errorMessage = `${error.name} failed with status code ${error.statusCode} and message "${error.errorDetails.message}"`;
  // @ts-ignore
  console.error(error);

  if (
    error.status === 'MAX_SWIPES' ||
    error.status === 'POSSIBLES_COOLDOWN_EXCEPTION'
  ) {
    return;
  }

  const statusBarHeight = initialWindowMetrics?.insets.top || 20; // Get the status bar height
  //TODO: Add Status Code Translations
  Toast.show({
    type: 'THNRError',
    props: {title: error.message},
    position: 'top',
    topOffset: statusBarHeight / 1.8,
  });
}
