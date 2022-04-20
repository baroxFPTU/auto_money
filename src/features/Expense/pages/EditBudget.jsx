import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFirestore from 'store/hooks/useFirestore';
import { resetAll, updateAll } from '../slice/expenseSlice';
import Expense from './Expense';

function EditBudget(props) {
  const { getById } = useFirestore();
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDoc = async () => {
      const response = await getById(params.budgetId);
      const newData = response.data();
      console.log(newData);
      document.title = newData.title;
      const action = updateAll(newData.data);
      dispatch(action);
    }

    getDoc();

    return () => {
      const action = resetAll();
      dispatch(action);
    }
  }, []);

  return (
    <>
      <Expense/>
    </>
  );
}

export default EditBudget;