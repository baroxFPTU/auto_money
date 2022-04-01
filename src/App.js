import { useBreakpointValue } from "@chakra-ui/react";
import Layout from "components/Layout";
import SignInModal from "features/Auth/components/SignInModal";
import PrivateRoute from "features/Auth/routes/PrivateRoute";
import Expense from "features/Expense/pages/Expense";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { closeModal } from "store/slices/uiSlice";

function App() {
  const isOpenModal = useSelector(state => state.ui.isOpenModal);
  const modalSize = useBreakpointValue({base: 'full', md: 'xl'});
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return (
  <Layout>
    <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Expense/>}/>
        </Route>
    </Routes>
    <SignInModal isCentered size={modalSize} onClose={handleCloseModal} isOpen={isOpenModal}/>
  </Layout>
  );
}

export default App;
