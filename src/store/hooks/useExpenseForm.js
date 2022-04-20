import { setCurrentTitle, updateCurrency } from "features/Expense/slice/expenseSlice";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateId, slugify } from "utils/main";
import { dbFirestore } from "../../firebase";
import { openModal } from '../slices/uiSlice';
import useCustomToast from "./useCustomToast";
import useFirestore from "./useFirestore";


function useExpenseForm() {
  const dispatch = useDispatch();
  const title = useSelector(state => state.expense.currentTitle);
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
    const action = setCurrentTitle(data);
    dispatch(action);
    document.title = data || '';
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
    const newBudget = {
      id: id,  
      data: {
        ...expense
      },
      createAt: serverTimestamp()
    }

    try {
      const docRef = doc(dbFirestore ,`expenses/${user.uid}/lists`, newBudget.id);
      console.log(docRef);
      await setDoc(docRef, newBudget);
      const action = setCurrentTitle('');
      dispatch(action);
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