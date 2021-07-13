import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null,
  userDetails: null,
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, setUserId, setUserDetails} = userSlice.actions;

export default userSlice.reducer;
