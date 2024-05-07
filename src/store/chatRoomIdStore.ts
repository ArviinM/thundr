import {create} from 'zustand';

type ChatRoomStore = {
  chatRoom: string;
  setChatRoom: (chatRoom: string) => void;
};

const useChatRoomIDStore = create<ChatRoomStore>(set => ({
  chatRoom: '', // Default initial state
  setChatRoom: chatId => set({chatRoom: chatId}),
}));

export default useChatRoomIDStore;
