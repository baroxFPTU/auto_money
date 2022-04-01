import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false,
    user: null
  },
  reducers: {
    signIn: (state, action) => {
      state.user = {};
      state.isSignedIn = true;
      state.user = {...action.payload};
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    }
  }
});

const {actions, reducer: authReducer} = authSlice;
export const {signIn, signOut} = actions;
export default authReducer;