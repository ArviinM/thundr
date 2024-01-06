import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['persistedState', 'filters'],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
