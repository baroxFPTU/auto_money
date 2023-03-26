import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useCustomToast from 'store/hooks/useCustomToast';

function PrivateRoute({ children }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const isPending = useSelector((state) => state.auth.pending);
  const { error } = useCustomToast();

  if (!isSignedIn && !isPending) {
    error({ title: 'Login first', description: 'You need to login to use this function' });
    return <Navigate to='/' />;
  }

  return children ? children : <Outlet />;
}

export default PrivateRoute;
