import { createSlice } from "@reduxjs/toolkit";
import { BUDGET_CONFIG_DEFAULT } from "constant/global";

const INITIAL_STATE = {
  budget: '',
  currency: 'VND',
  config: [...BUDGET_CONFIG_DEFAULT]
}

const expenseSlice = createSlice({
  name: "expense",
  initialState: INITIAL_STATE,
  reducers: {
    updateBudget: (state, action) => {
      state.budget = action.payload;
    },
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updateConfig: (state, action) => {
      const expenseId = action.payload.id;
      const newPercent = action.payload.percent;
      const expenseTarget = state.config.find(expense => expense.id === expenseId);
      expenseTarget.percent = newPercent;
    },
    updateAll: (state, action) => {
      const data = action.payload;

      state.budget = data.budget;
      state.currency = data.currency;
      state.config = [...data.config];
    },
    addConfig: (state, action) => {
      const newConfig = action.payload;
      state.config.push(newConfig);
    },
    resetAll: (state) => {
      state = {...INITIAL_STATE};
      return state;
    }
  }
});

const { actions, reducer: expenseReducer} = expenseSlice;
export const { updateBudget, updateCurrency, updateConfig, addConfig, updateAll, resetAll} = actions;
export default expenseReducer;
