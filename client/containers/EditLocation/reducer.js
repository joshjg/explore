import {
  SET_LOCATION_FIELD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  EDIT_LOCATION_ERROR,
  EDIT_LOCATION_SUCCESS,
} from './constants';
import { FETCH_LOCATION_SUCCESS } from '../Location/constants';

const reducer = (state = {
  locationPickerOpen: false,
  missingField: false,
  categories: [],
}, action) => {
  switch (action.type) {
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        ...action.location,
        street: action.location.address ? action.location.address.street : null,
        city: action.location.address ? action.location.address.city : null,
        zip: action.location.address ? action.location.address.zip : null,
      };
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
    case EDIT_LOCATION_ERROR:
      return {
        ...state,
        serverError: 'Error processing your request, please make sure you are logged in and try again.',
      };
    case EDIT_LOCATION_SUCCESS:
      return {
        ...state,
        locationPickerOpen: false,
      };
    default:
      return state;
  }
};

export default reducer;
