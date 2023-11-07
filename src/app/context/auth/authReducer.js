import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS } from './types';

export const INITIAL_STATE = {
  isLoading: true,
  error: false,
  isAuth: false,
  user: null,
};

export default (state, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload.user,
      };
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuth: false,
      };
    default:
      return state;
  }
};
