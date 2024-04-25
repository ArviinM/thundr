import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
  throttleTime: 1000,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

export const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {},
  // },
  mutationCache: new MutationCache({
    onError: error => console.error(error),
  }),
  queryCache: new QueryCache({
    onError: error => console.error(error),
  }),
});
