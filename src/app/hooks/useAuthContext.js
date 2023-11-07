import { useContext } from 'react';

import { AuthContext } from '../context/auth/authProvider';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
