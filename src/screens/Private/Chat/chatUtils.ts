import {ChatMessage} from '../../../types/generated.ts';
import moment from 'moment';

type OrganizedMessages = {
  [dateKey: string]: ChatMessage[];
};

export const organizeMessagesByDay = (
  messages: ChatMessage[],
): ChatMessage[][] => {
  const organizedMessages: OrganizedMessages = {}; // Use defined type
  for (const message of messages) {
    const dateKey = moment(message.created).format('YYYY-MM-DD');
    organizedMessages[dateKey] = organizedMessages[dateKey] || [];
    organizedMessages[dateKey].push(message);
  }
  return Object.values(organizedMessages);
};
