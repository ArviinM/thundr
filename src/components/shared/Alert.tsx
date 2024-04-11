import {Alert} from 'react-native';

type ConfirmationAlertParams = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const useConfirmationAlert = () => {
  const showConfirmationAlert = ({
    title,
    message,
    onConfirm,
  }: ConfirmationAlertParams) => {
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: onConfirm,
        style: 'destructive',
      },
    ]);
  };

  return {showConfirmationAlert};
};

export default useConfirmationAlert;
