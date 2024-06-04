// chatReplyStore.ts

import {create} from 'zustand';
import {IMessage} from '../types/generated.ts';

type ChatReplyStore = {
  replyMessage: IMessage | undefined;
  setReplyMessage: (message: IMessage | undefined) => void;
  clearReplyMessage: () => void;
};

const useChatReplyStore = create<ChatReplyStore>(set => ({
  replyMessage: undefined,
  setReplyMessage: message => set({replyMessage: message}),
  clearReplyMessage: () => set({replyMessage: undefined}),
}));

export default useChatReplyStore;
