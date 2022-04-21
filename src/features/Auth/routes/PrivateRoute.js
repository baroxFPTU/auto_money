import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


function PrivateRoute ({children}) {
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const navigate = useNavigate();

  if (!isSignedIn) {
    return <Navigate to="/"/>;
  }
  return children ? children : <Outlet/>;
}

export default PrivateRoute;