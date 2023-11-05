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

export const listOfCountries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'The Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo, Democratic Republic of the',
  'Congo, Republic of the',
  'Costa Rica',
  'Côte d’Ivoire',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor (Timor-Leste)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'The Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, North',
  'Korea, South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia, Federated States of',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Sudan, South',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

export const GENERIC_ERROR =
  'There could be an error. Please restart Thundr and try again.';

export const capitalizeFirstLetter = str => {
  return str?.replace(/^\w/, match => match?.toUpperCase());
};

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);

export const MONTHS = [
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
].map(month => ({label: month, value: month}));

export const DAYS = Array.from({length: 31}, (_, i) => i + 1).map(day => ({
  label: day.toString(),
  value: day.toString(),
}));

export const YEARS = range(currentYear, currentYear - 50, -1).map(year => ({
  label: year.toString(),
  value: year.toString(),
}));
