import {create} from 'zustand';

type MareblesStore = {
  isMare: boolean;
  setIsMare: (selected: boolean) => void;
};

const useMareblesStore = create<MareblesStore>(set => ({
  isMare: false,
  setIsMare: selected => set({isMare: selected}),
}));

export default useMareblesStore;
