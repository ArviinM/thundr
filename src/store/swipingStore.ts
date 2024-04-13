import {create} from 'zustand';

type SwipingStore = {
  swiping: {isMare: boolean; activeIndex: number}; // Add activeIndex
  setSwiping: (swiping: {isMare: boolean; activeIndex: number}) => void;
};

// Create the store instance
const useSwipingStore = create<SwipingStore>(set => ({
  swiping: {isMare: false, activeIndex: 0}, // Initialize activeIndex
  setSwiping: swiping => set({swiping}),
}));

export default useSwipingStore;
