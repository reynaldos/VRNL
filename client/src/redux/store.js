import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import collectionReducer from "./collectionSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const appReducer = combineReducers({ user: userReducer, video: videoReducer, collection: collectionReducer });

const rootReducer = (state, action) => {

  if (action.type === 'user/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);