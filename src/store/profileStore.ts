import {CustomerCreateProfileRequest} from '../types/generated.ts';
import {create} from 'zustand';

type CustomerStore = {
  customerProfile: CustomerCreateProfileRequest | null; // Initially null
  setCustomerProfile: (profile: CustomerCreateProfileRequest) => void;
  updateCustomerProfile: (
    updates: Partial<CustomerCreateProfileRequest>,
  ) => void;
};

// Create the store instance
const useCustomerProfileStore = create<CustomerStore>(set => ({
  customerProfile: null,

  setCustomerProfile: profile => set({customerProfile: profile}),

  updateCustomerProfile: updates =>
    set(state => ({
      customerProfile: state.customerProfile
        ? {...state.customerProfile, ...updates}
        : (updates as CustomerCreateProfileRequest),
    })),
}));

export default useCustomerProfileStore;
