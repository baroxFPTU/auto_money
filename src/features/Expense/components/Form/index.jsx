import { Box, Button, HStack, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import { CURRENCY_OPTIONS } from 'constant/global';
import { updateBudget } from 'features/Expense/slice/expenseSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useExpenseForm from 'store/hooks/useExpenseForm';
import { formatCurrencies, getOriginal } from 'utils/currency';
import CustomFormControl from '../CustomFormControl';
import CustomFormSelection from '../CustomFormSelection';
import ExpenseInput from '../ExpenseInput';
import SaveMoneySVG from 'assets/illustrators/saveMoney.svg'

function Form(props) {
  const {
    status,
    title,
    currency,
    updateTitle,
    updateCurrency,
    handleSubmit
  } = useExpenseForm();
  const budget = useSelector(state => state.expense.budget);
  const dispatch = useDispatch();
  const handleChangeBudget = (budget) => {  
    const action = updateBudget(formatCurrencies(budget));
    dispatch(action);
  }

  const bgButton = useColorModeValue()

  useEffect(() => {
    if (status === 'reset') {
      handleChangeBudget('');
    }
  });

  return (
    <VStack w="full" justify="space-between" align="center" py={6} spacing={{base: 6, md: 40}}>
      <VStack w="full" spacing={4}>
        <CustomFormControl label="Your money">
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
        <embed style={{ marginTop: '4rem', maxWidth: '300px'}} width="100%" src={SaveMoneySVG}/>
      <Box w="full" pos={{base: "fixed", md: "relative"}} zIndex="9" bottom="0" p={{base: 5, md: 0}} style={{marginTop: '2rem'}}>
        <Button boxShadow="lg" colorScheme="brandPrimary" size="lg" w="full" onClick={handleSubmit} >Save</Button>
      </Box>
    </VStack>
  );
}

export default Form;