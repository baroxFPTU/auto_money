import { Button, HStack, Input, VStack } from '@chakra-ui/react';
import React, { forwardRef } from 'react';


function AddBudgetItemForm(props, ref) {
  return (
    <VStack w="full" align="flex-start" p={4} spacing={3}>
        <Input placeholder="Name of budget item" ref={ref}/>
        <Button size="lg" w="full" onClick={props.onSubmit}>Submit</Button>
  </VStack>
  );
}

export default forwardRef(AddBudgetItemForm);