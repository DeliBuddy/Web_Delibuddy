'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your user slice here
import sellerReducer from './sellerSlice'; // Import your seller slice here


export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
