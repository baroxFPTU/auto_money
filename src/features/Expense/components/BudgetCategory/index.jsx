import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button, Icon, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseItem from '../ExpenseItem';
import { AiOutlinePlus } from "react-icons/ai";
import AddBudgetItemForm from '../AddBudgetItemForm';
import { generateId, normalize, slugify } from 'utils/main';
import useCustomToast from 'store/hooks/useCustomToast';
import { addConfig } from 'features/Expense/slice/expenseSlice';

function BudgetCategory(props) {
  const budgetConfig = useSelector(state => state.expense.config);
  const currency = useSelector(state => state.expense.currency);
  const [isEditing, setIsEditing] = useState(false);
  const { info } = useCustomToast();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleClickAddButton = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const handleSubmitAdd = useCallback(() => {
    const nameConfig = inputRef.current.value;
    if (nameConfig === '') {
      return info({
        title: 'Tips',
        description: 'Don\'t forget to enter name of budget item.'
      });
    };
    const nonAccentName = normalize(nameConfig);
    const id = `${nonAccentName}-${generateId()}`;
    const newConfig = {
      name: nameConfig,
      id: slugify(id),
      percent: 0
    }
    inputRef.current.value = '';

    const action = addConfig(newConfig);
    dispatch(action);
    setIsEditing(false);
  }, [isEditing]);

  const addButton = <Button size="lg" w="full" variant="ghost" onClick={handleClickAddButton}><Icon as={AiOutlinePlus}/> Add more</Button>;
  const submitButton = <Button size="lg" w="full" onClick={handleSubmitAdd}>Submit</Button>

  return (
    <VStack w="full">
      {budgetConfig.map(item => (
        <ExpenseItem
          key={item.id}
          name={item.name}
          id={item.id}
          percent={item.percent}
          currency={currency}
        />))}
        {isEditing && <AddBudgetItemForm ref={inputRef}/>}
        {isEditing ? submitButton : addButton}
    </VStack>
  );
}

export default BudgetCategory;