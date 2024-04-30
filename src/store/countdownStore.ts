import {create} from 'zustand';

type CountdownStore = {
  isStartTimer: boolean;
  setStartTimer: (selected: boolean) => void;
};

const useCountdownStore = create<CountdownStore>(set => ({
  isStartTimer: false,
  setStartTimer: selected => set({isStartTimer: selected}),
}));

export default useCountdownStore;
