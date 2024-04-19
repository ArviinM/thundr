import {Dimensions} from 'react-native';
import {moderateScale} from '../utils/utils.ts';

export const {width, height} = Dimensions.get('window');

export const COLORS = {
  white: '#FEFAF8',
  white2: '#F8F8F8',
  gray: '#A29597',
  gray2: '#D9D9D9',
  gray3: '#968789',
  gray4: '#534D4E',
  gray5: '#DADADA',
  black: '#121111',
  primary1: '#E33051',
  primary2: '#EF9D47',
  secondary1: '#F05570',
  secondary2: '#FFBD28',
  inverted: '#a7e330',
};

export const SIZES = {
  h1: moderateScale(36),
  h2: moderateScale(28),
  h3: moderateScale(22),
  h4: moderateScale(18),
  h5: moderateScale(13),
  h6: moderateScale(12),
};
