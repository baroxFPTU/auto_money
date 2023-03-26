import { Flex } from '@chakra-ui/react';
import BudgetCategory from 'features/Expense/components/BudgetCategory';
import Form from 'features/Expense/components/Form';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCustomToast from 'store/hooks/useCustomToast';
import { generateId, normalize, slugify } from 'utils/main';
import { addConfig } from '../slice/expenseSlice';
import useExpenseForm from 'store/hooks/useExpenseForm';

function Expenses({ isEditing = false }) {
  const {
    isLoading,
    status,
    title,
    currency,
    updateTitle,
    updateCurrency,
    handleSubmit,
    updateBudget,
  } = useExpenseForm(isEditing);
  const budgetConfig = useSelector((state) => state.expense.config);
  const { info } = useCustomToast();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Auto Money | Plan Money - Plan Life';
  }, []);

  const handleAddOption = useCallback(
    (nameConfig, callback) => {
      if (nameConfig === '') {
        return info({
          title: 'Tips',
          description: "Don't forget to enter name of budget item.",
        });
      }
      const nonAccentName = normalize(nameConfig);
      const id = `${nonAccentName}-${generateId()}`;
      const newConfig = {
        name: nameConfig,
        id: slugify(id),
        percent: 0,
      };

      callback();

      const action = addConfig(newConfig);
      dispatch(action);
    },
    [isEditing]
  );

  return (
    <>
      <Flex
        w='full'
        h='full'
        py={{ base: 0, md: 10 }}
        columnGap={12}
        direction={{ base: 'column', md: 'row' }}
        mb={{ base: '6rem', md: 0 }}
      >
        <Form
          isLoading={isLoading}
          currency={currency}
          handleSubmit={handleSubmit}
          status={status}
          title={title}
          updateBudget={updateBudget}
          updateCurrency={updateCurrency}
          updateTitle={updateTitle}
        />
        <BudgetCategory onAddOption={handleAddOption} categories={budgetConfig} />
      </Flex>
    </>
  );
}

export default Expenses;
