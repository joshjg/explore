import {
  FETCH_USERS_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  SET_USER_FIELD,
} from './constants';

const reducer = (state = { users: [], status: {} }, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
      };
    case SET_USER_FIELD: {
      const index = state.users.findIndex(user => user.id === action.id);
      return index === -1 ? state : {
        ...state,
        users: [
          ...state.users.slice(0, index),
          {
            ...state.users[index],
            [action.field]: action.value,
          },
          ...state.users.slice(index + 1),
        ],
      };
    }
    case EDIT_USER_REQUEST:
      return {
        ...state,
        status: {
          ...state.status,
          [action.id]: '...',
        },
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          [action.user.id]: 'Updated.',
        },
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        status: {
          ...state.status,
          [action.id]: `Error: ${action.err}`,
        },
      };
    default:
      return state;
  }
};

export default reducer;
