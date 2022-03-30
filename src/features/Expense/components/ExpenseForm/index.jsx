import { Button, FormControl, FormLabel, HStack, Input, Select, VStack } from '@chakra-ui/react';
import { updateBudget, updateCurrency } from 'features/Expense/slice/expenseSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOriginal, formatCurrencies } from 'utils/currency';
import ExpenseInput from '../ExpenseInput';

function ExpenseForm(props) {
  const [budget, setBudget] = useState('');
  const expense = useSelector(state => state.expense);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    title: '',
    currency: 'VND',
  });

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
    }

    setInfo(prevState => ({...prevState, [key]: data}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...info,
      expense
    });
  }
  return (
    <VStack w="full" justify="space-between" align="center" py={6} spacing={40}>
      <VStack w="full" spacing={4}>
        <ExpenseInput value={budget} onChange={handleChangeBudget}/>
        <HStack w="full">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input  size="lg" placeholder="Expense March" value={info.title} name="title" onChange={handleChangeField}/>
          </FormControl>
          <FormControl>
            <FormLabel>Currencies</FormLabel>
            <Select size="lg" name="currency" onChange={handleChangeField} defaultValue={info.currency}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="VND">VND</option>
            </Select>
          </FormControl>
        </HStack>
      </VStack>
      <Button size="lg" w="full" onClick={handleSubmit}>Save</Button>
    </VStack>
  );
}

export default ExpenseForm;