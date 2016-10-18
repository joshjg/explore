import {
  FETCH_LOCATION_SUCCESS,
  PROMPT_DELETE,
  HIDE_PROMPT,
  DELETE_SUCCESS,
} from './constants';
import { ADD_EVENT_SUCCESS } from '../AddEvent/constants';
import { ADD_PHOTO_SUCCESS } from '../AddPhoto/constants';

const reducer = (state = {
  refresh: false,
  prompt: {
    open: false,
    targetType: null,
    id: null,
  },
}, action) => {
  switch (action.type) {
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        refresh: false,
        ...action.location,
        events: action.events.sort((a, b) => a.date - b.date), // TODO compare with Date.now()
        photos: action.photos,
      };
    case PROMPT_DELETE:
      return {
        ...state,
        prompt: {
          open: true,
          targetType: action.targetType,
          id: action.id,
        },
      };
    case HIDE_PROMPT:
      return {
        ...state,
        prompt: {
          open: false,
          targetType: null,
          id: null,
        },
      };
    case ADD_EVENT_SUCCESS:
    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        refresh: true,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        refresh: true,
        prompt: {
          open: false,
          targetType: null,
          id: null,
        },
      };
    default:
      return state;
  }
};

export default reducer;
