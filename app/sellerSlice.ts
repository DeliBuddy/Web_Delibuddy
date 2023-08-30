'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    seller: null,
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
