import { Td, Tr } from '@chakra-ui/react';
import moment from 'moment';

import React from 'react';
import { formatCurrencies } from 'utils/currency';

const TableBodyRow = ({name, amount, currency, createdAt}) => {
  return (
   <>
    <Tr>
    <Td>{name}</Td>
    <Td isNumeric>{formatCurrencies(amount)}</Td>
    <Td>{currency}</Td>
    <Td>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Td>
  </Tr>
   </>
  );
};

export default TableBodyRow;