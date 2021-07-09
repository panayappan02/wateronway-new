import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  productModalVisible: false,
  selectedProduct: null,
};

export const productSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedProduct,
  toggleProductModal,
  incrementQty,
  decrementQty,
} = productSlice.actions;

export default productSlice.reducer;
