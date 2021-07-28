import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import shippingAddressReducer from './shippingAddressSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    shippingAddress: shippingAddressReducer,
  },
});
