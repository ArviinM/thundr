import {create} from 'zustand';

type ChatRoomStore = {
  chatRoom: string | null;
  setChatRoom: (chatRoom: string | null) => void;
};

const useChatRoomIdNotifStore = create<ChatRoomStore>(set => ({
  chatRoom: '',
  setChatRoom: chatId => set({chatRoom: chatId}),
}));

export default useChatRoomIdNotifStore;
