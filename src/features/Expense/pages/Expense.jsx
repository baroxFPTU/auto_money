import { Flex } from '@chakra-ui/react';
import React from 'react';
import Form from 'features/Expense/components/Form';
import BudgetCategory from 'features/Expense/components/BudgetCategory';

function Expenses(props) {
  return (
    <>
    <Flex w="full" h="full" py={{base: 0, md: 10}} columnGap={12} direction={{base: "column", md: "row"}}>
      <Form/>
      <BudgetCategory/>
    </Flex>
    </>
  );
}

export default Expenses;