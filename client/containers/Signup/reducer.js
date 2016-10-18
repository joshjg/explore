import { SET_SIGNUP_FIELD, SIGNUP_ERROR } from './constants';

const reducer = (state = { missingField: false }, action) => {
  switch (action.type) {
    case SET_SIGNUP_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.err.status === 403
          ? 'Email already in use.'
          : 'Error processing your request, please try again.',
      };
    default:
      return state;
  }
};

export default reducer;
