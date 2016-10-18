import {
  SET_EVENT_FIELD,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
} from './constants';

const reducer = (state = { missingField: false }, action) => {
  switch (action.type) {
    case SET_EVENT_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ADD_EVENT_SUCCESS:
      return {
        missingField: false,
      };
    case ADD_EVENT_ERROR:
      return {
        ...state,
        serverError: 'Error processing your request, please make sure you are logged in and try again.',
      };
    default:
      return state;
  }
};

export default reducer;
