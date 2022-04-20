import { NumberInput, NumberInputField } from '@chakra-ui/react';
import React from 'react';
import { formatCurrencies } from 'utils/currency';

function ExpenseInput({value, onChange}) {

  return (
   <NumberInput
    colorScheme="brandPrimary"
    variant="filled"
    placeholder="Amount"
    w="full"
    size="lg"
    value={value}
    onChange={onChange}
    clampValueOnBlur={false}>
     <NumberInputField/>
   </NumberInput>
  );
}

export default ExpenseInput;