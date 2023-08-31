'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User ;
}

const initialState: UserState = {
  user: {
    _id: '',
    name: '',
    email: '',
  },
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {
        _id: '',
        name: '',
        email: '',
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
