import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  name: string;
  url: string;
  message: string;
  createAt: number;
}

interface InitialState {
  messages: Message[];
}

const initialState: InitialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  initialState: initialState,
  name: "messages",
  reducers: {
    addMessage(state: InitialState, action: PayloadAction<Message>) {
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
