import moment from 'moment';
import React, { useState } from 'react';
import { Input, Box, HStack } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRange({ start, end, onChangeStart, onChangeEnd }) {
  return (
    <Box w='full' style={{ marginTop: '-24px' }}>
      <h3>Date</h3>
      <HStack w='full'>
        <ReactDatePicker
          selected={start}
          onChange={onChangeStart}
          selectsStart
          startDate={start}
          endDate={end}
          customInput={<Input />}
        />
        <ReactDatePicker
          selected={end}
          onChange={onChangeEnd}
          selectsEnd
          startDate={start}
          endDate={end}
          minDate={start}
          customInput={<Input />}
        />
      </HStack>
    </Box>
  );
}

export default DateRange;
