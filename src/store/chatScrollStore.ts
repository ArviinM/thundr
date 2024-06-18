import {create} from 'zustand';

type ChatRoomStore = {
  isScroll: boolean;
  setIsScroll: (isScroll: boolean) => void;
};

const useChatScrollStore = create<ChatRoomStore>(set => ({
  isScroll: true, // Default initial state
  setIsScroll: isScroll => set({isScroll: isScroll}),
}));

export default useChatScrollStore;
