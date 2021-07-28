import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  addressToEditId: null,
};

export const shippingAddressSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAddressToEdit: (state, action) => {
      state.addressToEditId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAddressToEdit} = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
