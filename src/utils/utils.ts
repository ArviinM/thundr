import moment from 'moment';

type CustomDropDownData = {
  label: string;
  value: string;
};

export const generateMonthData = (): CustomDropDownData[] => {
  const monthData: CustomDropDownData[] = [];
  for (let i = 1; i <= 12; i++) {
    monthData.push({
      label: moment()
        .month(i - 1)
        .format('MM'), // Zero-padded month number
      value: moment()
        .month(i - 1)
        .format('MM'),
    });
  }
  return monthData;
};

export const generateDayData = (): CustomDropDownData[] => {
  let dayData = [];
  for (let i = 1; i <= 31; i++) {
    dayData.push({
      label: i.toString().padStart(2, '0'),
      value: i.toString().padStart(2, '0'),
    });
  }
  return dayData;
};

export const generateYearData = (
  ageLimit: number = 35,
): CustomDropDownData[] => {
  const startYear = 1989; // Starting year
  const endYear = startYear - ageLimit; // Calculate end year based on age limit
  const yearData: CustomDropDownData[] = [];

  // Generate years starting from 1989 down to endYear
  for (let i = startYear; i >= endYear; i--) {
    yearData.push({
      label: i.toString(),
      value: i.toString(),
    });
  }

  return yearData;
};

const abbreviationToWord: Record<string, string> = {
  L: 'Lesbian',
  G: 'Gay',
  B: 'Bisexual',
  T: 'Transgender',
  Q: 'Queer',
  I: 'Intersex',
  A: 'Asexual',
  '+': 'Plus',
};

export function convertAbbreviationToWord(abbreviation: string): string {
  let words = abbreviation
    .split('')
    .map(letter => abbreviationToWord[letter] || letter);
  return words.join('');
}

export function convertWordToAbbreviation(word: string): string {
  const wordToAbbreviation = Object.keys(abbreviationToWord).reduce(
    (map, key) => {
      map[abbreviationToWord[key].toLowerCase()] = key; // Change here
      return map;
    },
    {} as Record<string, string>,
  );

  return word.toLowerCase() in wordToAbbreviation
    ? wordToAbbreviation[word.toLowerCase()]
    : word;
}

export function convertFullWordsToAbbreviations(fullWords: string): string[] {
  const individualWords = fullWords.split(',');
  return individualWords.map(word => convertWordToAbbreviation(word));
}

export function convertAbbreviationsToFullWords(
  abbreviations: string[],
): string {
  return abbreviations
    .map(abbreviation => convertAbbreviationToWord(abbreviation))
    .join(',');
}

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 680;

export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const scale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

interface FeetAndInches {
  feet: string;
  inches: string;
}

export const parseFeetAndInches = (inputString?: string): FeetAndInches => {
  if (!inputString) {
    return {feet: '', inches: ''};
  }

  const regex = /(\d+)'\s*(\d+)"/;
  const match = inputString.match(regex);

  if (!match) {
    return {feet: '', inches: ''};
  }

  const feet = match[1] + "'";
  const inches = match[2] + '"';

  return {feet, inches};
};

export const formatTimestamp = (timestamp: number | Date) => {
  return moment(timestamp).format('h:mm A');
};

export const calculateCountdown = (nextAction: number | undefined) => {
  if (!nextAction) {
    return null;
  } // Handle if nextAction is not provided

  const now = moment();
  const targetTime = moment(nextAction);
  const duration = moment.duration(targetTime.diff(now));

  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};

export const calculateCountdownSwipes = (nextAction: number | undefined) => {
  if (!nextAction) {
    return null;
  } // Handle if nextAction is not provided

  const now = moment();
  const targetTime = moment.unix(nextAction);
  const duration = moment.duration(targetTime.diff(now));

  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};
