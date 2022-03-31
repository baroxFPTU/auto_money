import Layout from "components/Layout";
import Expense from "features/Expense/pages/Expense";
import useFirestore from "store/hooks/useFirestore";
import { generateId } from "utils/main";

function App() {
  const {snapshot} = useFirestore('expenses');
  console.log(snapshot);
  return (
  <Layout>
    <Expense/>
  </Layout>
  );
}

export default App;
