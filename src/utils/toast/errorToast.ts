import Toast from 'react-native-toast-message';

export function showErrorToast(error: any) {
  // const errorMessage = `${error.name} failed with status code ${error.statusCode} and message "${error.errorDetails.message}"`;
  console.log(error.message);
  Toast.show({
    type: 'THNRError',
    props: {title: error.message},
    position: 'top',
    topOffset: 80,
  });
}
