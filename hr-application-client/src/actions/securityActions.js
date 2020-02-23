import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWTToken from '../securityUtils/setJWTToken';

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post('/api/auth/signup', newUser);
    history.push('/login');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.validationErrors || error.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', LoginRequest);
    let { accessToken, roles } = res.data;
    accessToken = 'Bearer ' + accessToken;
    localStorage.setItem('roles', roles);
    localStorage.setItem('jwtToken', accessToken);
    setJWTToken(accessToken);
    const decoded = jwt_decode(accessToken);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
      roles: roles
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data.validationErrors || error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('roles');
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
