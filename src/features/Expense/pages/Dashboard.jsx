import { LinkBox, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { dbFirestore } from '../../../firebase';
import { collection } from 'firebase/firestore';
import React, { useEffect, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import useFirestore from 'store/hooks/useFirestore';
import TableBodyRow from '../components/Table/TableBodyRow';
import DashboardSkeleton from 'components/Skeleton/DashboardSkeleton';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState();
  const user = useSelector(state => state.auth.user);
  const {getAll} = useFirestore();

  useEffect(() => {
    const getData = async () => {
      const colRef = collection(dbFirestore ,`expenses/${user?.uid}/lists`);
      if (colRef){
        const docData = await getAll(colRef);
        setData(docData);
      };
    }

    getData();
  }, []);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      {<TableContainer>
      <Table variant='simple'>
        {data?.length == 0
          && <TableCaption>Nothing here. Let try to add some <LinkBox colorScheme="brandPrimary" as={Link} style={{color: "#65C9A1"}} to="/">Budget Plan</LinkBox></TableCaption>}
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th isNumeric>amount</Th>
              <Th>Currency</Th>
              <Th>create at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!data && <DashboardSkeleton/>}
            {data && data.map((item, index) =>
              <TableBodyRow
                key={index}
                id={item.id}
                name={item.data.currentTitle}
                amount={item.data.budget}
                currency={item.data.currency}
                createdAt={item.createAt.toDate()}
              />)}
          </Tbody>
        </Table>
      </TableContainer>}
    </>)
};

export default memo(Dashboard);