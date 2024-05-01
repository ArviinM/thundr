import {create} from 'zustand';

type UnreadStore = {
  isUnreads: boolean;
  setIsUnreads: (selected: boolean) => void;
};

const useUnreadStore = create<UnreadStore>(set => ({
  isUnreads: false,
  setIsUnreads: selected => set({isUnreads: selected}),
}));

export default useUnreadStore;
