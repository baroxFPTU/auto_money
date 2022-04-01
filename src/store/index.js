import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import expenseReducer from 'features/Expense/slice/expenseSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = {
  expense: expenseReducer,
  ui: uiReducer,
  auth: authReducer,
}

const store = configureStore({
  reducer: rootReducer
});


export default store;