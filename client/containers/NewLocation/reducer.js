import {
  SET_LOCATION_FIELD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  NEW_LOCATION_ERROR,
} from './constants';

const reducer = (state = {
  locationPickerOpen: false,
  missingField: false,
  categories: [],
}, action) => {
  switch (action.type) {
    case SET_LOCATION_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories,
          action.value,
        ],
      };
    case DELETE_CATEGORY: {
      const index = state.categories.indexOf(action.value);
      return index === -1 ? state : {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          ...state.categories.slice(index + 1),
        ],
      };
    }
    case NEW_LOCATION_ERROR:
      return {
        ...state,
        serverError: 'Error processing your request, please make sure you are logged in and try again.',
      };
    default:
      return state;
  }
};

export default reducer;
