import { Flex } from '@chakra-ui/react';
import React from 'react';
import Form from '../components/Form';
import ExpenseCategory from '../components/ExpenseCategory';

function Expenses(props) {
  return (
    <>
    <Flex w="full" h="full" py={{base: 0, md: 10}} columnGap={12} direction={{base: "column", md: "row"}}>
      <Form/>
      <ExpenseCategory/>
    </Flex>
    </>
  );
}

export default Expenses;