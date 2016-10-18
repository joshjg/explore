import { SIGNUP_REQUEST, SET_SIGNUP_FIELD } from './constants';

export const signupRequest = (email, password) => ({
  type: SIGNUP_REQUEST,
  data: {
    email,
    password,
  },
});

export const setSignupField = (field, value) => ({
  type: SET_SIGNUP_FIELD,
  field,
  value,
});
