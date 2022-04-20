import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { updateConfig } from 'features/Expense/slice/expenseSlice';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calcMoneyFromPercent, formatCurrencies, getOriginal } from 'utils/currency';
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

  const amount = budget ? calcMoneyFromPercent(budget, percent) : 0;
  const formatedAmount = amount.toLocaleString('it-IT', {style : 'currency', currency : currency || 'VND'});

  return (
    <VStack w="full" align="flex-start" p={4} spacing={3}>
    <HStack w="full"  justify="space-between">
      <Box>
        <Text fontSize="xl">{name}</Text>
        <Text fontSize="2xl" as="b">{formatedAmount}</Text>
      </Box>
      <InputPercent ref={inputRef} percent={percent} handleChange={handleChangePercent}/>
    </HStack>
    <Divider/>
  </VStack>
  );
}

export default memo(ExpenseItem);