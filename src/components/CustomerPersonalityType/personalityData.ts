import {ButtonData} from './SelectableButton.tsx';
import {IMAGES} from '../../constants/images.ts';

export const personalityData: ButtonData[] = [
  {
    title: 'Lion',
    body:
      'Takes charge, Determined,\n' +
      'Assertive, Competitive,\n' +
      'Leader, Goal-driven,\n' +
      'Self-reliant, Adventurous.',
    defaultImage: IMAGES.lion,
    selectedImage: IMAGES.lionSelected,
  },
  {
    title: 'Otter',
    body:
      'Takes risks, Visionary,\n' +
      'Energetic, Promoter, \n' +
      'Fun-loving, Enjoys change,\n' +
      'Creative, Optimistic.',
    defaultImage: IMAGES.otter,
    selectedImage: IMAGES.otterSelected,
  },
  {
    title: 'Dog',
    body:
      'Loyal, Deep relationships,\n' +
      'Adaptable, Sympathetic,\n' +
      'Thoughtful, Nurturing,\n' +
      'Tolerant, Good listener.\n',
    defaultImage: IMAGES.dog,
    selectedImage: IMAGES.dogSelected,
  },
  {
    title: 'Beaver',
    body:
      'Deliberate, Controlled,\n' +
      'Reserved, Practical, Factual,\n' +
      'Analytical, Inquisitive,\n' +
      'Persistent.',
    defaultImage: IMAGES.beaver,
    selectedImage: IMAGES.beaverSelected,
  },
];
