import { globalConstants } from 'constant/global';
import { setCurrentTitle, updateBudget, updateCurrency } from 'features/Expense/slice/expenseSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrencies, getOriginal } from 'utils/currency';
import { generateId, slugify } from 'utils/main';
import { openModal } from '../slices/uiSlice';
import useCustomToast from './useCustomToast';
import { expenseServices } from 'services/expenseServices';

function useExpenseForm(isEditing) {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.expense.currentTitle);
  const expense = useSelector((state) => state.expense);
  const { isSignedIn, user } = useSelector((state) => state.auth);
  const { success, error: errorToast, info, warning } = useCustomToast();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInfo = (e) => {
    const data = e.target.value;
    const key = e.target.name;
    if (key === 'currency') {
      const action = updateCurrency(data);
      dispatch(action);
      return;
    }

    if (data.length >= 100) {
      return warning({
        id: 'title-warning',
        title: 'Title exceeded limit',
      });
    }

    const action = setCurrentTitle(data);
    dispatch(action);
    document.title = data || '';
  };

  const handleChangeBudget = (budget) => {
    const original = getOriginal(budget);

    if (original >= globalConstants.BUDGET_SIZE)
      return warning({
        id: 'budget-warning-toast',
        title: 'Budget is exceeded',
        description:
          'Your budget has exceeded the maximum limit. Please update your maximum budget in the settings.',
      });

    const action = updateBudget(formatCurrencies(budget));
    dispatch(action);
  };

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
    setIsLoading(true);

    const id = isEditing ? expense?.id : `${slugify(title)}-${generateId()}`;
    const newBudget = {
      id: id,
      data: {
        ...expense,
      },
    };

    const descriptions = {
      editing: {
        success: 'Expense is saved. Check it in dashboard.',
      },
      normal: {
        success: 'New expense is saved. Check it in dashboard.',
      },
    };

    try {
      if (isEditing) {
        await expenseServices.update(user?.uid, id, newBudget);
      } else {
        await expenseServices.create(user?.uid, newBudget);
      }
      const action = setCurrentTitle('');
      dispatch(action);
      setStatus('reset');
      success({
        id: 'save-success',
        title: 'Saved',
        description: isEditing ? descriptions.editing.success : descriptions.normal.success,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
      errorToast({
        id: 'error',
        title: 'Failed',
        description: 'Cannot add expense. Please try again.',
      });
    }
  };

  return {
    isLoading,
    title,
    status,
    currency: expense.currency,
    updateCurrency: handleChangeInfo,
    updateTitle: handleChangeInfo,
    updateBudget: handleChangeBudget,
    handleSubmit,
  };
}

export default useExpenseForm;
