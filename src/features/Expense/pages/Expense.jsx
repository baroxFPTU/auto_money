import { Flex } from '@chakra-ui/react';
import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseCategory from '../components/ExpenseCategory';

function Expenses(props) {
  return (
    <>
    <Flex w="full" h="full" py={{base: 0, md: 10}} columnGap={12} direction={{base: "column", md: "row"}}>
      <ExpenseForm/>
      <ExpenseCategory/>
    </Flex>
    </>
  );
}

export default Expenses;