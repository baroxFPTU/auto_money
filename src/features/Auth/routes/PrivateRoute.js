import { Outlet } from "react-router-dom"

function PrivateRoute ({children}) {
  return children ? children : <Outlet/>;
}

export default PrivateRoute;