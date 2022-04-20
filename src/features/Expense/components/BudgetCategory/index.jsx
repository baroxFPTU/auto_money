import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Button, Icon, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseItem from '../ExpenseItem';
import { AiOutlinePlus } from "react-icons/ai";
import AddBudgetItemForm from '../AddBudgetItemForm';
import { generateId, normalize, slugify } from 'utils/main';
import useCustomToast from 'store/hooks/useCustomToast';
import { addConfig } from 'features/Expense/slice/expenseSlice';

function BudgetCategory({isEditing,onEditing , onAddOption}) {
  const budgetConfig = useSelector(state => state.expense.config);
  const currency = useSelector(state => state.expense.currency);
  const inputRef = useRef();

  const handleClickAddButton = useCallback(() => {
    onEditing(true);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleSubmitAdd = useCallback(() => {
    const nameConfig = inputRef.current.value;
    onAddOption(nameConfig, () => {
      inputRef.current.value = '';
    });
  }, []);

  const addButton = <Button size="lg" w="full" variant="ghost" onClick={handleClickAddButton}><Icon as={AiOutlinePlus}/> Add more</Button>;
  const submitButton = (
    <Box w="full" pos={{base: "fixed", md: "relative"}} bottom="0" p={{base: 5, md: 0}}>
      <Button size="lg" w="full" onClick={handleSubmitAdd}>Submit</Button>
    </Box>
  )

  return (
    <VStack w="full">
      <VStack w="full" >
        {budgetConfig.map(item => (
          <ExpenseItem
            key={item.id}
            name={item.name}
            id={item.id}
            percent={item.percent}
            currency={currency}
          />))}
      </VStack>
      {/* {isEditing && <AddBudgetItemForm ref={inputRef} onSubmit={handleSubmitAdd}/>} */}
      {/* {isEditing || addButton} */}
    </VStack>
  );
}

export default BudgetCategory;