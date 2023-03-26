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
    document.title = 'Edit your budget';
  }, []);

  useEffect(() => {
    const getDoc = async () => {
      const response = await getById(params.budgetId);
      const newData = response.data();
      document.title = newData?.data?.currentTitle;
      const action = updateAll({ ...newData.data, id: newData.id });
      dispatch(action);
    };

    getDoc();

    return () => {
      const action = resetAll();
      dispatch(action);
    };
  }, []);

  return (
    <>
      <Expense isEditing />
    </>
  );
}

export default EditBudget;
