import moment from 'moment';
import * as FileSystem from 'expo-file-system';

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

  const cleanedIndividualWords = individualWords
    .map((word: string) => word.trim()) // Trim each element
    .filter((word: string) => word !== ''); // Filter empty elements

  return cleanedIndividualWords.map(word => convertWordToAbbreviation(word));
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

export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_VIDEO_SIZE_BYTES = 25 * 1024 * 1024; // 25MB
export const MAX_VIDEO_COUNT = 1;
export const MAX_IMAGE_COUNT = 4;

import {Dimensions} from 'react-native';
import {NotificationResponse} from '../types/generated.ts';

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

const now = Date.now();
const twelveHoursInMs = 12 * 60 * 60 * 1000;
export const twelveHoursTime = now + twelveHoursInMs;

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

// type Notification = {
//   id: number;
//   subId: string;
//   title: string;
//   body: string;
//   channelType: string;
//   sentTime: string;
//   matchType: string;
//   notificationMethod: string;
//   chatRoomUuid: string;
//   targetSub: string;
//   matchPhoto: string | null;
//   isRead: boolean;
// };

export type Section = {
  title: string;
  data: NotificationResponse[];
};

export function transformNotifications(
  notifications: NotificationResponse[],
): Section[] {
  const sections: Section[] = [];
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');

  notifications.forEach(notification => {
    const sentDate = moment(notification.sentTime);
    let sectionTitle: string;

    if (sentDate.isSameOrAfter(today)) {
      sectionTitle = 'Today';
    } else if (sentDate.isSameOrAfter(yesterday)) {
      sectionTitle = 'Yesterday';
    } else {
      sectionTitle = 'Last 7 Days';
    }

    // Find existing section
    let section = sections.find(s => s.title === sectionTitle);
    if (!section) {
      section = {title: sectionTitle, data: []};
      sections.push(section);
    }

    section.data.push(notification);
  });

  return sections;
}

export async function checkFileExists(fileUri: string) {
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    return info.exists;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
}

export function isImageOrVideo(mimeType: string) {
  if (mimeType.startsWith('image')) {
    return 'image';
  }

  if (mimeType.startsWith('video')) {
    return 'video';
  }

  return null;
}
