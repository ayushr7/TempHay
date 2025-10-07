import { configureStore, Middleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // Optional: whitelist specific reducers to persist
  // whitelist: ['theme', 'user'],
  // Optional: blacklist reducers you don't want to persist
  // blacklist: ['someReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Middleware[] = [];

// Add the logger middleware only in development
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
