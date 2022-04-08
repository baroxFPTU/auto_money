import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { dbFirestore } from '../../../firebase';
import { collection } from 'firebase/firestore';
import React, { useEffect, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import useFirestore from 'store/hooks/useFirestore';
import moment from 'moment';
import TableBodyRow from '../components/Table/TableBodyRow';

const Dashboard = () => {
  const [data, setData] = useState();
  const user = useSelector(state => state.auth.user);
  const {getAll} = useFirestore();

  useEffect(() => {
    const getData = async () => {
      const colRef = collection(dbFirestore ,`expenses/${user?.uid}/lists`);
      if (colRef){
        const docData = await getAll(colRef);
        console.log(docData);
        setData(docData);
      };
    }

    getData();
  }, []);

  return (
    <>
      <TableContainer>
      <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th isNumeric>amount</Th>
              <Th>Currency</Th>
              <Th>create at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.map((item, index) =>
              <TableBodyRow
                key={index}
                name={item.title}
                amount={item.data.budget}
                currency={item.data.currency}
                createdAt={item.createAt.toDate()}
              />)}
          </Tbody>
        </Table>
      </TableContainer>
    </>)
};

export default memo(Dashboard);