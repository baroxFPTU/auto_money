import{ createSlice } from "@reduxjs/toolkit";
import { generateId, slugify } from "utils/main";

const budgetConfig = [
  {
    name: 'Foods',
    id: 'foods-9421554b',
    percent: 50
  },
  {
    name: 'Save',
    id: 'save-bd26dd82',
    percent: 20
  },
  {
    name: 'Invest',
    id: 'invest-fb9aa208',
    percent: 20
  }
];

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    budget: 0,
    currency: 'VND',
    config: [...budgetConfig]
  },
  reducers: {
    updateBudget: (state, action) => {
      state.budget = +action.payload;
    },
    updateCurrency: (state, action) => {
      state.currency = action.payload;
    },
    updateConfig: (state, action) => {
      const expenseId = action.payload.id;
      const newPercent = action.payload.percent;
      const expenseTarget = state.config.find(expense => expense.id === expenseId);
      expenseTarget.percent = newPercent;
    }
  }
});

const { actions, reducer: expenseReducer} = expenseSlice;
export const { updateBudget, updateCurrency, updateConfig } = actions;
export default expenseReducer;
