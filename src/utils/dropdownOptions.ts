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
  '0"',
  '1"',
  '2"',
  '3"',
  '4"',
  '5"',
  '6"',
  '7"',
  '8"',
  '9"',
  '10"',
  '11"',
];

// Function to convert array elements to objects with label and value keys
const convertToArrayOfObjects = (
  array: string[],
): {label: string; value: string}[] => {
  return array.map(item => ({label: item, value: item}));
};

// Convert all arrays to array of objects
export const starSignOptions = convertToArrayOfObjects(starSign);
export const educationOptions = convertToArrayOfObjects(education);
export const drinkingAndSmokingOptions =
  convertToArrayOfObjects(drinkingAndSmoking);
export const religionOptions = convertToArrayOfObjects(religion);
export const petsOptions = convertToArrayOfObjects(pets);
export const politicsOptions = convertToArrayOfObjects(politics);
export const feetOptions = convertToArrayOfObjects(feet);
export const inchesOptions = convertToArrayOfObjects(inches);
