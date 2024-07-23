import {create} from 'zustand';
import {FacialVerificationState} from '../types/generated.ts';

type FacialVerificationStore = {
  status: FacialVerificationState;
  setStatus: (state: FacialVerificationState) => void;
};

const useFaceVerificationStatus = create<FacialVerificationStore>(set => ({
  status: 'UNVERIFIED',
  setStatus: state => set({status: state}),
}));

export default useFaceVerificationStatus;
