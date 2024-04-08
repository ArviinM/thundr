import {CustomerDetailsRequest} from '../types/generated.ts';
import {create} from 'zustand';

type CustomerDetailsStore = {
  customerDetails: CustomerDetailsRequest | null; // Initially null
  setCustomerDetails: (profile: CustomerDetailsRequest) => void;
  updateCustomerDetails: (updates: Partial<CustomerDetailsRequest>) => void;
};

// Create the store instance
const useCustomerDetailsStore = create<CustomerDetailsStore>(set => ({
  customerDetails: null,

  setCustomerDetails: profile => set({customerDetails: profile}),

  updateCustomerDetails: updates =>
    set(state => ({
      customerDetails: state.customerDetails
        ? {...state.customerDetails, ...updates}
        : (updates as CustomerDetailsRequest),
    })),
}));

export default useCustomerDetailsStore;
