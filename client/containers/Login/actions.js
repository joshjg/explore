import { LOGIN_REQUEST, SET_LOGIN_FIELD } from './constants';

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  data: {
    email,
    password,
  },
});

export const setLoginField = (field, value) => ({
  type: SET_LOGIN_FIELD,
  field,
  value,
});
