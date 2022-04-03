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
    signOutLocal: (state) => {
      state.isSignedIn = false;
      state.user = null;
    }
  }
});

const {actions, reducer: authReducer} = authSlice;
export const {signIn, signOutLocal} = actions;
export default authReducer;