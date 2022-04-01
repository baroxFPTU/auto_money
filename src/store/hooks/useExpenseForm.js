import { useToast } from "@chakra-ui/react";
import { updateBudget, updateCurrency } from "features/Expense/slice/expenseSlice";
import { collection } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateId, slugify } from "utils/main";
import { dbFirestore } from "../../firebase";
import { openModal } from '../slices/uiSlice';
import useFirestore from "./useFirestore";

function useExpenseForm() {
  const {add: addDoc, status} = useFirestore('expenses');
  const expense = useSelector(state => state.expense);
  const {isSignedIn, user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const toast = useToast();

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

    const id = `${slugify(title)}-${generateId()}`;
    const data = {
      title: title,
      id: id,  
      data: {
        ...expense
      }
    }

    try {
      const colRef = await collection(dbFirestore ,`expenses/${user.uid}/list`);
      addDoc(colRef, data);
      toast({
        title: 'Saved',
        description: "New expense is saved. You can check it later.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      
    }
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