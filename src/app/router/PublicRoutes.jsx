import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PublicRoutes = () => {
  const { isAuth } = useAuthContext();

  if (isAuth) {
    return <Navigate to='/admin' />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoutes;
