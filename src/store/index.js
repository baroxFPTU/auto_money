import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from 'features/Expense/slice/expenseSlice';

const rootReducer = {
  expense: expenseReducer
}

const store = configureStore({
  reducer: rootReducer
});


export default store;