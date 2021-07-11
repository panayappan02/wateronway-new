import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: null,
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
  },
});

// Action creators are generated for each case reducer function
export const {setUser, setUserId} = userSlice.actions;

export default userSlice.reducer;
