import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFirestore from 'store/hooks/useFirestore';
import { updateAll } from '../slice/expenseSlice';
import Expense from './Expense';

function EditBudget(props) {
  const { getById } = useFirestore();
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params);
  console.log(params.budgetId);

  useEffect(() => {
    const getDoc = async () => {
      const response = await getById(params.budgetId);
      const newData = response.data();

      const action = updateAll(newData.data);
      dispatch(action);
    }

    getDoc();
  }, []);

  return (
    <>
      <Expense/>
    </>
  );
}

export default EditBudget;