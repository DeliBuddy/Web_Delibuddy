'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface Seller {
    _id: string;
    name: string;
    email: string;
    orders: string[];
  }
  
  interface SellerState {
    seller:Seller ;
  }
  
  const initialState: SellerState = {
    seller: {
        _id: '',
        name: '',
        email: '',
        orders: [],
    },
  };

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setSeller: (state, action) => {
            state.seller = action.payload;
        }
    }       
});

export const { setSeller } = sellerSlice.actions;

export default sellerSlice.reducer;
