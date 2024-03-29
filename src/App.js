import { useBreakpointValue } from '@chakra-ui/react';
import ComingSoon from 'components/ComingSoon';
import Layout from 'components/Layout';
import SignInModal from 'features/Auth/components/SignInModal';
import PrivateRoute from 'features/Auth/routes/PrivateRoute';
import Dashboard from 'features/Expense/pages/Dashboard';
import EditBudget from 'features/Expense/pages/EditBudget';
import Expense from 'features/Expense/pages/Expense';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { closeModal } from 'store/slices/uiSlice';

function App() {
  const isOpenModal = useSelector((state) => state.ui.isOpenModal);
  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Expense />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/budgets'>
            <Route path=':budgetId' element={<EditBudget />} />
          </Route>
        </Route>
        <Route path='*' element={<ComingSoon />} />
      </Routes>
      <SignInModal isCentered size={modalSize} onClose={handleCloseModal} isOpen={isOpenModal} />
    </Layout>
  );
}

export default App;
