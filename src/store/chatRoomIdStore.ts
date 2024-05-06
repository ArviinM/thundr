import {create} from 'zustand';

type ChatRoomStore = {
  chatRoom: string;
  setChatRoom: (selected: string) => void;
};

const useChatRoomIDStore = create<ChatRoomStore>(set => ({
  chatRoom: '',
  setChatRoom: chatId => set({chatRoom: chatId}),
}));

export default useChatRoomIDStore;
