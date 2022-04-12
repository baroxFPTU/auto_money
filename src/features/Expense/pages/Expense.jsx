import { Flex } from '@chakra-ui/react';
import BudgetCategory from 'features/Expense/components/BudgetCategory';
import Form from 'features/Expense/components/Form';
import React from 'react';

function Expenses({isEditing, status}) {
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