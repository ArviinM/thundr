import {create} from 'zustand';

type DrawerStore = {
  isSelected: boolean | string;
  setIsSelected: (selected: boolean | string) => void;
};

const useDrawerStore = create<DrawerStore>(set => ({
  isSelected: 'Home',
  setIsSelected: selected => set({isSelected: selected}),
}));

export default useDrawerStore;
