import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    pending: true,
    isSignedIn: false,
    user: null,
  },
  reducers: {
    startPending: (state) => {
      state.pending = true;
    },
    stopPending: (state) => {
      state.pending = false;
    },
    signIn: (state, action) => {
      state.isSignedIn = true;
      state.pending = false;
      state.user = { ...action.payload };
    },
    signOutLocal: (state) => {
      state.isSignedIn = false;
      state.pending = false;
      state.user = null;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;
export const { signIn, signOutLocal, startPending, stopPending } = actions;
export default authReducer;
