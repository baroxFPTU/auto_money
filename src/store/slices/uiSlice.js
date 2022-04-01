import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isOpenModal: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    }
  }
});

const {actions, reducer: uiReducer} = uiSlice;
export const {openModal, closeModal} = actions;
export default uiReducer;