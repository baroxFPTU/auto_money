import { Flex } from '@chakra-ui/react';
import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseCategory from '../components/ExpenseCategory';

function Expenses(props) {
  return (
    <>
    <Flex w="full" h="full" py={10} columnGap={12}>
      <ExpenseForm/>
      <ExpenseCategory/>
    </Flex>
    </>
  );
}

export default Expenses;