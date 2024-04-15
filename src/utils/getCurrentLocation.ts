import Geolocation from '@react-native-community/geolocation';

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      error => {
        reject(error);
      },
      {enableHighAccuracy: true},
    );
  });
};
