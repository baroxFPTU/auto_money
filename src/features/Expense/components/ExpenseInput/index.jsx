import { NumberInput, NumberInputField } from '@chakra-ui/react';
import React from 'react';

function ExpenseInput({ value, onChange, size = 'lg', placeholder }) {
  return (
    <NumberInput
      colorScheme='brandPrimary'
      placeholder={placeholder}
      w='full'
      size={size}
      value={value}
      onChange={onChange}
      clampValueOnBlur={false}
    >
      <NumberInputField />
    </NumberInput>
  );
}

export default ExpenseInput;
