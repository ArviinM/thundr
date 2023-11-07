// React modules
import {Platform, Dimensions, StatusBar} from 'react-native';

// Third party libraries
import {getDeviceId, isTablet} from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

/* The purpose of these functions is to be able to take one design (from a standard mobile phone) and apply it to other display sizes.

 * scale - is pretty straight forward and will return the same linear result as using viewport.
 * verticalScale - is like scale, but based on height instead of width, which can be useful.
 * moderateScale - you can control the resize factor (default is 0.5), basically it is good for font sizes.
 
 */

export const scale = size => (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const isAndroidDevice = () => {
  return Platform.OS === 'android';
};
export const isIosDevice = () => {
  return Platform.OS === 'ios';
};

// IOS devices without notch in the upper part of the screen

const flatHeaderIphones = [
  'iPhone7,1',
  'iPhone7,2',
  'iPhone8,1',
  'iPhone8,2',
  'iPhone8,4',
  'iPhone9,1',
  'iPhone9,2',
  'iPhone9,3',
  'iPhone9,4',
  'iPhone10,1',
  'iPhone10,2',
  'iPhone10,3',
  'iPhone10,4',
  'iPhone10,5',
  'iPhone12,8',
];

const iPhoneMinis = ['iPhone13,1', 'iPhone14,4'];

// Static height used for headers
const getStaticHeaderHeight = () => {
  const deviceId = getDeviceId();
  if (flatHeaderIphones.includes(deviceId)) {
    return 98;
  } else if (iPhoneMinis.includes(deviceId)) {
    return 108;
  } else if (deviceId?.includes('iPhone')) {
    return 118;
  } else if (deviceId?.includes('iPad')) {
    return 50;
  } else {
    return 0;
  }
};

const TABLET_HEADER_HEIGHT = 88;
const HEADER_HEIGHT_FOR_OFFSET = 72;

const offsetHeight = (StatusBar?.currentHeight || 0) > 24 ? 22 : 0;

const ANDROID_HEADER_HEIGHT = isTablet()
  ? TABLET_HEADER_HEIGHT
  : HEADER_HEIGHT_FOR_OFFSET + offsetHeight;
const IOS_HEADER_HEIGHT = verticalScale(getStaticHeaderHeight());

export const HEADER_HEIGHT = isAndroidDevice()
  ? ANDROID_HEADER_HEIGHT
  : IOS_HEADER_HEIGHT;

export const GENERIC_ERROR =
  'There could be an error. Please restart Thundr and try again.';

export const capitalizeFirstLetter = str => {
  return str?.replace(/^\w/, match => match?.toUpperCase());
};

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const days = [];
for (let i = 1; i <= 31; i++) {
  const formattedDay = i < 10 ? `0${i}` : `${i}`;
  days.push(formattedDay);
}

const currYear = new Date().getFullYear();
export const years = [];
for (let i = currYear; i >= currYear - 100; i--) {
  years.push(i);
}

export const starSign = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const education = [
  'Highschool',
  'Bachelor',
  'Masters',
  'Doctorate',
  'Vocational',
  'Others',
];

export const drinkingAndSmoking = ['Regular', 'Occasional', 'Never '];

export const religion = [
  'Christian',
  'Catholic',
  'Muslim',
  'Buddhist',
  'Others',
];

export const pets = ['Dog', 'Cat', 'Bird', 'Fish', 'Exotic', 'None'];

export const politics = [
  'Apolitical',
  'Moderate',
  'Liberal',
  'Conservative',
  'Rather not say',
];

export const feet = ["4'", "5'", "6'", "7'"];
export const inches = [
  "1'",
  "2'",
  "3'",
  "4'",
  "5'",
  "6'",
  "7'",
  "8'",
  "9'",
  "10'",
  "11'",
];
