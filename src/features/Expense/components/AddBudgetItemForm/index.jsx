import { HStack, Input, VStack } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import InputPercent from '../InputPercent';


function AddBudgetItemForm(props, ref) {
  const handleChangePercent = (percent, setPercent) => {
    const newPercent = +percent;
    console.log(percent);
  }

  return (
    <VStack w="full" align="flex-start" p={4} spacing={3}>
    <HStack w="full"  justify="space-between">
      <Input placeholder="Name of budget item" ref={ref}/>
      <InputPercent percent={0} handleChange={handleChangePercent}/>
    </HStack>
  </VStack>
  );
}

export default forwardRef(AddBudgetItemForm);