import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './MessageAndHistoryContext';

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
// made the context global now the data is 
// available to everyone