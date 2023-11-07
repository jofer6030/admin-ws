import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoutes = () => {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
