import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from './userSlice';
import {Seller} from './sellerSlice';


// export interface OrderItem {
//   name:string;
// }

//total_price:Map<string,string>[],
//Modify the below interface to tell that total_price will be a list of Map
interface TotalAmountItem{
  item:string,
  amount:number,
}

export interface Order {
  _id:string ,
  user: User;
  seller: Seller,
  partnerOtp:string,
  userOtp:string,
  items: string[],
  status: string,
  total_price:TotalAmountItem[],
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
    partnerOtp:'',
    userOtp:'',
    items: [],
    status: '',
    total_price:[],
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
        partnerOtp:'',
        userOtp:'',
        items: [],
        status: '',
        total_price:[],
      };
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;