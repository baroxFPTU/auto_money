import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { updateConfig } from 'features/Expense/slice/expenseSlice';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputPercent from '../InputPercent';

function ExpenseItem({name, id, percent, currency}) {
  const budget = useSelector(state => state.expense.budget);
  const config = useSelector(state => state.expense.config);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleChangePercent = (percent, setPercent) => {
    const newPercent = +percent;
    const expenseTarget = config.find(expense => expense.id === id);
    const totalPercent = config.reduce((acc, curr) => acc + curr.percent,0);
    const rest = newPercent - expenseTarget.percent;

    if (totalPercent + rest > 100) {
      setPercent(expenseTarget.percent);
      return;
    }
    
    const action = updateConfig({id, percent: newPercent});
    dispatch(action);
  }


  const amount = budget ? Math.trunc(budget*percent/100) : 0;
  const formatedAmount = amount.toLocaleString('it-IT', {style : 'currency', currency : currency || 'VND'});

  return (
    <VStack w="full" align="flex-start" p={4} spacing={3}>
    <HStack w="full"  justify="space-between">
      <Text fontSize="xl">{name}</Text>
      <InputPercent ref={inputRef} percent={percent} handleChange={handleChangePercent}/>
    </HStack>
    <Text fontSize="2xl" as="b">{formatedAmount}</Text>
    <Divider/>
  </VStack>
  );
}

export default ExpenseItem;