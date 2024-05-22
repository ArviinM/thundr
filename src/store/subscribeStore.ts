import {create} from 'zustand';

type SubscribeCheckStore = {
  isCustomerSubscribed: boolean;
  setIsCustomerSubscribed: (selected: boolean) => void;
};

const useSubscribeCheck = create<SubscribeCheckStore>(set => ({
  isCustomerSubscribed: false,
  setIsCustomerSubscribed: selected => set({isCustomerSubscribed: selected}),
}));

export default useSubscribeCheck;
