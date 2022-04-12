import { HStack, Input, VStack } from '@chakra-ui/react';
import React, { forwardRef } from 'react';


function AddBudgetItemForm(props, ref) {
  return (
    <VStack w="full" align="flex-start" p={4} spacing={3}>
    <HStack w="full"  justify="space-between">
      <Input placeholder="Name of budget item" ref={ref}/>
    </HStack>
  </VStack>
  );
}

export default forwardRef(AddBudgetItemForm);