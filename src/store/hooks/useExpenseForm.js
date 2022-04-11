import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { updateBudget, updateCurrency } from "features/Expense/slice/expenseSlice";
import { generateId, slugify } from "utils/main";
import { dbFirestore } from "../../firebase";
import { openModal } from '../slices/uiSlice';
import useCustomToast from "./useCustomToast";
import useFirestore from "./useFirestore";

function useExpenseForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const {add: addDoc} = useFirestore('expenses');
  const expense = useSelector(state => state.expense);
  const {isSignedIn, user} = useSelector(state => state.auth);
  const { success, error: errorToast, info} = useCustomToast();
  const [status, setStatus] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn && !user) {
      return dispatch(openModal());
    }

    if (expense.budget === 0) {
      return info({
        title: 'Tips',
        description: "Don't forget to enter your money.",
      });
    }

    if (title === '') {
      return info({
        title: 'Tips',
        description: "Don't forget to add a title to remind yourself.",
      });
    }

    const id = `${slugify(title)}-${generateId()}`;
    const data = {
      title: title,
      id: id,  
      data: {
        ...expense
      },
      createAt: serverTimestamp()
    }

    try {
      const docRef = doc(dbFirestore ,`expenses/${user.uid}/lists`, data.id);
      await setDoc(docRef,data);

      setTitle('');
      setStatus('reset');
      success({
        title: 'Saved',
        description: "New expense is saved. You can check it later.",
      });
    } catch (error) {
      console.log(error.message);
      errorToast({
        title: 'Failed',
        description: "Cannot add expense. Please try again.",
      });
    }
  }

  return {
    title,
    status,
    currency: expense.currency,
    updateCurrency: handleChangeInfo,
    updateTitle: handleChangeInfo,
    handleSubmit
  };
}

export default useExpenseForm;