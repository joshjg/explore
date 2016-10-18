import { SET_LOGIN_FIELD, LOGIN_ERROR } from './constants';

const reducer = (state = { missingField: false }, action) => {
  switch (action.type) {
    case SET_LOGIN_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.err || 'Error processing your request, please try again.',
      };
    default:
      return state;
  }
};

export default reducer;
