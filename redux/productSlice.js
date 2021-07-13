import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  productModalVisible: false,
  selectedProduct: null,
  selectedSeller: null,
  sellerList: [],
};

export const productSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },
    setSellerList: (state, action) => {
      state.sellerList = action.payload;
    },
    toggleProductModal: state => {
      state.productModalVisible = !state.productModalVisible;
    },
    incrementQty: state => {
      _.update(state.selectedProduct, 'qty', function (prevVal) {
        return prevVal + 1;
      });
    },
    decrementQty: state => {
      if (state.selectedProduct?.qty > 0) {
        _.update(state.selectedProduct, 'qty', function (prevVal) {
          return prevVal - 1;
        });
      }
    },
    setQty: (state,action) => {
      state.selectedProduct.qty = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedProduct,
  setSelectedSeller,
  setSellerList,
  toggleProductModal,
  incrementQty,
  decrementQty,
  setQty,
} = productSlice.actions;

export default productSlice.reducer;
