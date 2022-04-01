import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import React, { forwardRef, memo, useState } from 'react';

function InputPercent({percent, handleChange}, ref) {
  const [value, setValue] = useState(percent);
  const handleChangePercent = (e) => {
    if (!handleChange) return;
    handleChange(ref.current.value, setValue);
  }

  const handleChangeValue = (value) => {setValue(value);}

  return (
    <HStack maxW="100px" >
      <NumberInput value={value} min={0} max={100} step={1} onChange={handleChangeValue} clampValueOnBlur={false}>
        <NumberInputField  onBlur={handleChangePercent} ref={ref}/>
        <NumberInputStepper>
          <NumberIncrementStepper onClick={handleChangePercent}/>
          <NumberDecrementStepper onClick={handleChangePercent}/>
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
}


export default memo(forwardRef(InputPercent));