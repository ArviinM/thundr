import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import rootSaga from './rootSaga';
import {persistedReducer} from './persistConfig';
import {persistStore} from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Turned off logger to prevent terminal bottleneck - turn this on if needed for development
// middlewares.push(logger);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
