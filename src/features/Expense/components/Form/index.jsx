import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, HStack, Input, Show, useColorModeValue, VStack } from '@chakra-ui/react';

import { basicConfig } from 'theme';
import ExpenseInput from '../ExpenseInput';
import { BUDGET_SIZE, CURRENCY_OPTIONS, globalConstants } from 'constant/global';
import CustomFormControl from '../CustomFormControl';
import useExpenseForm from 'store/hooks/useExpenseForm';
import CustomFormSelection from '../CustomFormSelection';
import SaveMoneySVG from 'assets/illustrators/saveMoney.svg';
import { formatCurrencies, getOriginal } from 'utils/currency';
import { updateBudget } from 'features/Expense/slice/expenseSlice';
import useCustomToast from 'store/hooks/useCustomToast';

function Form({
  isLoading,
  status,
  title,
  currency,
  updateTitle,
  updateCurrency,
  handleSubmit,
  updateBudget,
}) {
  const budget = useSelector((state) => state.expense.budget);

  useEffect(() => {
    if (status === 'reset') {
      updateBudget('');
    }
  });

  return (
    <VStack
      w='full'
      justify='space-between'
      align='center'
      pb={{ base: 3, md: 6 }}
      spacing={{ base: 6, md: 40 }}
    >
      <VStack w='full' spacing={4}>
        <HStack w='full' display='grid' gridTemplateColumns='1fr 150px'>
          <CustomFormControl label='Amount'>
            <ExpenseInput placeholder='Amount' value={budget} onChange={updateBudget} />
          </CustomFormControl>
          <CustomFormSelection
            label='Currencies'
            name='currency'
            onChange={updateCurrency}
            defaultValue={currency}
            options={CURRENCY_OPTIONS}
          />
        </HStack>
        <CustomFormControl label='Title'>
          <Input
            size={basicConfig.input.size}
            placeholder='Expense March'
            value={title}
            name='title'
            onChange={updateTitle}
          />
        </CustomFormControl>
      </VStack>
      <Show above='md'>
        <embed style={{ marginTop: '4rem', maxWidth: '300px' }} width='100%' src={SaveMoneySVG} />
      </Show>
      <Box
        w='full'
        pos={{ base: 'fixed', md: 'relative' }}
        zIndex='9'
        bottom='0'
        p={{ base: 5, md: 0 }}
        style={{ marginTop: '2rem' }}
      >
        <Button
          boxShadow='lg'
          colorScheme='brandPrimary'
          size={basicConfig.input.size}
          w='full'
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Save
        </Button>
      </Box>
    </VStack>
  );
}

export default Form;
