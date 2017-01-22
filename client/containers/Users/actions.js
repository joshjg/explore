import { SET_USER_FIELD, EDIT_USER_REQUEST } from './constants';

export const setUserField = (id, field, value) => ({
  type: SET_USER_FIELD,
  id,
  field,
  value,
});

export const putUser = (id, email, canCreate) => ({
  type: EDIT_USER_REQUEST,
  id,
  user: {
    email,
    canCreate,
  },
});
