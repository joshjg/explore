import {
  SET_PHOTO_FIELD,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_ERROR,
} from './constants';

const reducer = (state = { missingField: false }, action) => {
  switch (action.type) {
    case SET_PHOTO_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ADD_PHOTO_SUCCESS:
      return {
        missingField: false,
      };
    case ADD_PHOTO_ERROR:
      return {
        ...state,
        serverError: 'Error processing your request, please try again.',
      };
    default:
      return state;
  }
};

export default reducer;
