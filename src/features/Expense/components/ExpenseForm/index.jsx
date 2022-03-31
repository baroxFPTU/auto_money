import { Box, Button, FormControl, FormLabel, HStack, Input, Select, VStack } from '@chakra-ui/react';
import { updateBudget, updateCurrency } from 'features/Expense/slice/expenseSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFirestore from 'store/hooks/useFirestore';
import { formatCurrencies, getOriginal } from 'utils/currency';
import { generateId, slugify } from 'utils/main';
import ExpenseInput from '../ExpenseInput';

function ExpenseForm(props) {
  const {add: addDoc} = useFirestore('expenses');
  const [budget, setBudget] = useState('');
  const expense = useSelector(state => state.expense);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const handleChangeBudget = (budget) => {
    const formatedBudget = formatCurrencies(budget);
    const action = updateBudget(getOriginal(budget));
    dispatch(action);
    setBudget(formatedBudget);
  }

  const handleChangeField = (e) => {
    const data = e.target.value;
    const key = e.target.name;

    if (key === 'currency') {
      const action = updateCurrency(data);
      dispatch(action);
      return;
    }
    setTitle(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `${slugify(title)}-${generateId()}`;
    const data = {
      title: title,
      id: id,  
      data: {
        ...expense
      }
    }

    addDoc(data);
  }
  return (
    <VStack w="full" justify="space-between" align="center" py={6} spacing={{base: 6, md: 40}}>
      <VStack w="full" spacing={4}>
        <ExpenseInput value={budget} onChange={handleChangeBudget}/>
        <HStack w="full">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input  size="lg" placeholder="Expense March" value={title} name="title" onChange={handleChangeField}/>
          </FormControl>
          <FormControl>
            <FormLabel>Currencies</FormLabel>
            <Select size="lg" name="currency" onChange={handleChangeField} defaultValue={expense.currency}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="VND">VND</option>
            </Select>
          </FormControl>
        </HStack>
      </VStack>
      <Box  w="full" pos={{base: "fixed", md: "relative"}} bottom="0" p={{base: 5, md: 0}}>
        <Button  size="lg" w="full" onClick={handleSubmit}>Save</Button>
      </Box>
    </VStack>
  );
}

export default ExpenseForm;