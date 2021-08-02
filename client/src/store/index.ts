import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { messagesReducer } from "./slices/messages";

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type Store = typeof store;
