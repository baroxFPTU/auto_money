import { Button } from "@chakra-ui/react";
import Layout from "components/Layout";
import SignInModal from "features/Auth/components/SignInModal";
import PrivateRoute from "features/Auth/routes/PrivateRoute";
import Expense from "features/Expense/pages/Expense";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import useFirestore from "store/hooks/useFirestore";
import { closeModal, openModal } from "store/slices/uiSlice";

function App() {
  const isOpenModal = useSelector(state => state.ui.isOpenModal);
  const dispatch = useDispatch();
  const {snapshot} = useFirestore('expenses');

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleOpenModal = () => {
    dispatch(openModal());
  }

  return (
  <Layout>
    <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Expense/>}/>
        </Route>
    </Routes>
    <SignInModal isCentered  size="xl" onClose={handleCloseModal} isOpen={isOpenModal}/>
  </Layout>
  );
}

export default App;
