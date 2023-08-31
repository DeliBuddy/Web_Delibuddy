'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import your user slice here
import sellerReducer from './sellerSlice'; 
import orderReducer from './orderSlice'; 

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    order:orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
