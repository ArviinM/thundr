// chatReplyStore.ts

import {create} from 'zustand';
import {IMessage} from '../types/generated.ts';

type ChatReplyStore = {
  replyMessage: IMessage | null;
  setReplyMessage: (message: IMessage | null) => void;
  clearReplyMessage: () => void;
};

const useChatReplyStore = create<ChatReplyStore>(set => ({
  replyMessage: null,
  setReplyMessage: message => set({replyMessage: message}),
  clearReplyMessage: () => set({replyMessage: null}),
}));

export default useChatReplyStore;
