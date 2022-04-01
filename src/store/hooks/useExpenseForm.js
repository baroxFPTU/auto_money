import { updateBudget, updateCurrency } from "features/Expense/slice/expenseSlice";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrencies, getOriginal } from "utils/currency";
import { generateId, slugify } from "utils/main";
import useFirestore from "./useFirestore";
import {openModal} from '../slices/uiSlice';

function useExpenseForm() {
  const {add: addDoc} = useFirestore('expenses');
  const expense = useSelector(state => state.expense);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const handleChangeInfo = (e) => {
    const data = e.target.value;
    const key = e.target.name;

    if (key === 'currency') {
      const action = updateCurrency(data);
      dispatch(action);
      return;
    }
    setTitle(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      return dispatch(openModal());
    }

    const id = `${slugify(title)}-${generateId()}`;
    const data = {
      title: title,
      id: id,  
      data: {
        ...expense
      }
    }

    addDoc(data);
  }

  return {
    title,
    currency: expense.currency,
    updateBudget,
    updateCurrency: handleChangeInfo,
    updateTitle: handleChangeInfo,
    handleSubmit
  };
}

export default useExpenseForm;