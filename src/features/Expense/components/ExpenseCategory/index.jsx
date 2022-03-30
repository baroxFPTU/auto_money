import React from 'react';
import { VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ExpenseItem from '../ExpenseItem';

function ExpenseCategory(props) {
  const budgetConfig = useSelector(state => state.expense.config);
  const currency = useSelector(state => state.expense.currency);
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
    </VStack>
  );
}

export default ExpenseCategory;