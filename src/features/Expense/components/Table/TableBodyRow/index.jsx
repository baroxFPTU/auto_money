import { Button, Td, Tr } from '@chakra-ui/react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import React from 'react';
import { formatCurrencies } from 'utils/currency';

const TableBodyRow = ({ id, name, amount, currency, createdAt, onRemove }) => {
  const editRoute = '/budgets/' + id;

  return (
    <>
      <Tr>
        <Td>
          <Link to={editRoute}>{name}</Link>
        </Td>
        <Td isNumeric>{formatCurrencies(amount)}</Td>
        <Td>{currency}</Td>
        <Td>{moment(createdAt).format('MMMM Do YYYY')}</Td>
        <Td>
          <Button variant='ghost' colorScheme='blue' as={Link} to={editRoute}>
            Edit
          </Button>
          <Button variant='ghost' colorScheme='red' onClick={() => onRemove(id)}>
            Remove
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default TableBodyRow;
