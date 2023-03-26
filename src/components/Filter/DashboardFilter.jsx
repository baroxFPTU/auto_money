import { HStack, IconButton, Input, InputGroup, InputLeftAddon, Select } from '@chakra-ui/react';
import LayoutSwitch from 'components/LayoutSwitch';
import React from 'react';
import { basicConfig } from 'theme';

import { RiSearch2Line } from 'react-icons/ri';
import DateRange from './DateRange';
import { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';

function DashboardFilter({ startDate, endDate, onChangeStartDate, onChangeEndDate, onSearch }) {
  const [keyword, setKeyword] = useState();
  const statusOptions = [
    {
      key: 'oldest',
      label: 'Oldest',
    },
    {
      key: 'latest',
      label: 'Latest',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  return (
    <HStack w='full' mb={4} justifyContent='space-between'>
      <HStack>
        <InputGroup>
          <InputLeftAddon>
            <RiSearch2Line />
          </InputLeftAddon>
          <Input
            placeholder='Search for saved expense'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </InputGroup>
        <Select defaultValue='latest'>
          {statusOptions.map((item) => (
            <option key={item?.key} value={item?.key} about={item?.label}>
              {item?.label}
            </option>
          ))}
        </Select>
        <DateRange
          start={startDate}
          onChangeStart={onChangeStartDate}
          end={endDate}
          onChangeEnd={onChangeEndDate}
        />
      </HStack>
      <LayoutSwitch />
    </HStack>
  );
}

export default DashboardFilter;
