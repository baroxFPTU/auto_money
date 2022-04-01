import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false
  }
});

const {actions, reducer: authReducer} = authSlice;

export default authReducer;