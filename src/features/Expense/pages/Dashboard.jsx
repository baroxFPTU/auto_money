import {
  Box,
  LinkBox,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import Alert from 'components/Alert';
import DashboardFilter from 'components/Filter/DashboardFilter';
import DashboardSkeleton from 'components/Skeleton/DashboardSkeleton';
import { collection } from 'firebase/firestore';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { expenseServices } from 'services/expenseServices';
import useCustomToast from 'store/hooks/useCustomToast';
import useFirestore from 'store/hooks/useFirestore';
import { dbFirestore } from '../../../firebase';
import TableBodyRow from '../components/Table/TableBodyRow';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resolveFn, setResolveFn] = useState(() => {});
  const user = useSelector((state) => state.auth.user);
  const { success, error } = useCustomToast();
  const [data, setData] = useState();
  const { getAll, getByKeyword } = useFirestore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const startedAtParams = moment(searchParams.get('startedAt') || '');
    const endedAtParams = moment(searchParams.get('endedAt') || '');

    if (!startDate && startedAtParams.isValid()) {
      setStartDate(startedAtParams.toDate());
    }

    if (!endDate && endedAtParams.isValid()) {
      setEndDate(endedAtParams.toDate());
    }
  }, [searchParams, startDate, endDate]);

  useEffect(() => {
    const params = {};

    if (startDate) {
      params.startedAt = moment(startDate).format('MM-DD-YYYY');
    }

    if (endDate) {
      params.endedAt = moment(endDate).format('MM-DD-YYYY');
    }

    setSearchParams(params);
  }, [startDate, endDate]);

  useEffect(() => {
    getData(user?.uid, startDate, endDate);
  }, [startDate, endDate, user]);

  const getData = async (uid, startAt, endAt) => {
    try {
      const colRef = collection(dbFirestore, `expenses/${uid}/lists`);
      setData(null);
      if (colRef) {
        const promise = getAll(colRef);
        const docData = await promise;
        const filteredDocData = docData.filter((doc) => {
          const createdAtMoment = moment(doc?.createAt?.toDate());
          const startDate = moment(startAt || '2000/04/27');
          const endDate = moment(endAt || Date.now());

          return (
            !doc?.destroy && createdAtMoment.isAfter(startDate) && createdAtMoment.isBefore(endDate)
          );
        });
        setData(filteredDocData);
      }
    } catch (err) {
      console.error({ err });
      setData([]);
      error({
        title: 'Cannot load expenese list',
        description: 'There was an error loading your expensese. Please try again later.',
      });
    }
  };

  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const handleRemoveExpense = async (expenseId) => {
    try {
      const isConfirm = await handleOpenAlertDialog();
      if (!isConfirm) return;
      setLoading(true);
      await expenseServices.delete(user?.uid, expenseId);
      getData(user?.uid);
      success({
        title: 'Expense removed',
        description: 'The expense has been successfully removed from your list.',
        render: () => {
          <div>
            <h2>Cannot remove the expense</h2>
          </div>;
        },
      });
      setLoading(false);
    } catch (error) {
      error({
        title: 'Cannot remove the expense',
        description: 'There was an error removing the expense. Please try again later.',
        render: () => {
          <div>
            <h2>Cannot remove the expense</h2>
          </div>;
        },
      });
      setLoading(false);
    }
  };

  const handleConfirm = (isConfirm) => {
    onClose();
    if (!resolveFn) return;
    resolveFn(isConfirm);
  };

  const handleOpenAlertDialog = () => {
    onOpen();
    const promise = new Promise((resolve) => {
      setResolveFn(() => resolve);
    });
    return promise;
  };

  const handleSearchByTitle = async (title) => {
    if (!title || title.trim().length === 0) return getData(user?.uid);
    await getData(user?.uid, startDate, endDate);
    const filteredData = data?.filter(
      (item) => item?.data?.currentTitle?.toLowerCase()?.indexOf(title?.toLowerCase()) !== -1
    );
    setData(filteredData);
  };

  return (
    <>
      <DashboardFilter
        startDate={startDate}
        endDate={endDate}
        onChangeEndDate={setEndDate}
        onChangeStartDate={setStartDate}
        onSearch={handleSearchByTitle}
      />
      <TableContainer>
        <Table variant='simple'>
          {data?.length === 0 && (
            <TableCaption>
              Nothing here. Let try to add some{' '}
              <LinkBox colorScheme='brandPrimary' as={Link} style={{ color: '#65C9A1' }} to='/'>
                Budget Plan
              </LinkBox>
            </TableCaption>
          )}
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th isNumeric>amount</Th>
              <Th>Currency</Th>
              <Th>create at</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!data && <DashboardSkeleton />}
            {data &&
              data.map((item, index) => (
                <TableBodyRow
                  key={index}
                  id={item.id}
                  name={item.data.currentTitle}
                  amount={item.data.budget}
                  currency={item.data.currency}
                  createdAt={item.createAt.toDate()}
                  onRemove={handleRemoveExpense}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        title={'Remove the expense'}
        description={'Are you sure to remove this expense?'}
        onConfirm={handleConfirm}
      />
      {isLoading && (
        <Box
          position='fixed'
          inset={0}
          display='flex'
          alignItems='center'
          justifyContent='center'
          bg='blackAlpha.300'
          backdropFilter='blur(5px)'
        >
          <Spinner size='lg' />
        </Box>
      )}
    </>
  );
};

export default memo(Dashboard);
