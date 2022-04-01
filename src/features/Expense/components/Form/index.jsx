import { Box, Button, HStack, Input, VStack } from '@chakra-ui/react';
import { CURRENCY_OPTIONS } from 'constant/global';
import { updateBudget } from 'features/Expense/slice/expenseSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useExpenseForm from 'store/hooks/useExpenseForm';
import { formatCurrencies, getOriginal } from 'utils/currency';
import CustomFormControl from '../CustomFormControl';
import CustomFormSelection from '../CustomFormSelection';
import ExpenseInput from '../ExpenseInput';

function Form(props) {
  const { title, currency, updateTitle, updateCurrency, handleSubmit } = useExpenseForm();
  const [budget, setBudget] = useState('');
  const dispatch = useDispatch();
  const handleChangeBudget = (budget) => {
    const formatedBudget = formatCurrencies(budget);
    const action = updateBudget(getOriginal(budget));
    dispatch(action);
    setBudget(formatedBudget);
  }

  return (
    <VStack w="full" justify="space-between" align="center" py={6} spacing={{base: 6, md: 40}}>
      <VStack w="full" spacing={4}>
        <CustomFormControl label="Your budget">
          <ExpenseInput value={budget} onChange={handleChangeBudget}/>
        </CustomFormControl>
        <HStack w="full">
          <CustomFormControl label="Title">
            <Input
              size="lg"
              placeholder="Expense March"
              value={title} name="title"
              onChange={updateTitle}
            />
          </CustomFormControl>
          <CustomFormSelection
            label="Currencies"
            name="currency"
            onChange={updateCurrency}
            defaultValue={currency}
            options={CURRENCY_OPTIONS}/>
        </HStack>
      </VStack>
      <Box w="full" pos={{base: "fixed", md: "relative"}} bottom="0" p={{base: 5, md: 0}}>
        <Button  size="lg" w="full" onClick={handleSubmit}>Save</Button>
      </Box>
    </VStack>
  );
}

export default Form;