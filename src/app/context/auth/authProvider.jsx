import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST } from './types';

import AuthReducer, { INITIAL_STATE } from './authReducer';
import { checkAuthAdmin, loginAdmin } from '../../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = async (email, password) => {
    const data = await loginAdmin({ email, password });
    dispatch({ type: LOGIN_REQUEST });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: data.token,
        user: data.user,
      },
    });
  };

  const loginFailure = () => {
    dispatch({ type: LOGIN_ERROR });
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      return loginFailure();
    }
    const data = await checkAuthAdmin(token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: data.token,
        user: data.user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        isAuth: state.isAuth,
        user: state.user,
        login,
        checkAuth,
        loginFailure,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
