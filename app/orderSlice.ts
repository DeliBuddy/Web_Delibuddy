import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from './userSlice';
import {Seller} from './sellerSlice';


// export interface OrderItem {
//   name:string;
// }

export interface Order {
  _id:string ,
  user: User;
  seller: Seller,
  items: string[],
  status: string,
  total_price:string|null,
}

interface OrderState {
  order: Order ;
}

const initialState: OrderState = {
  order: {
    _id:'',
    user: {
        _id: '',
        name: '',
        email: '',
    },
    seller: {
        _id: '',
        name: '',
        email: '',
        orders: [],
    },
    items: [],
    status: '',
    total_price:null,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = {
        _id:'',
        user: {
            _id: '',
            name: '',
            email: '',
        },
        seller: {
            _id: '',
            name: '',
            email: '',
            orders: [],
        },
        items: [],
        status: '',
        total_price:null,
      };
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;