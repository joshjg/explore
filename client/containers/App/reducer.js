import {
  TOGGLE_ACTIVE,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLOSE_SNACKBAR,
} from './constants';
import { SIGNUP_SUCCESS } from '../Signup/constants';
import { LOGIN_SUCCESS } from '../Login/constants';
import { LOGOUT_SUCCESS } from '../Logout/constants';
import { ADD_EVENT_SUCCESS } from '../AddEvent/constants';
import { ADD_PHOTO_SUCCESS } from '../AddPhoto/constants';
import { NEW_LOCATION_SUCCESS } from '../NewLocation/constants';
import { EDIT_LOCATION_SUCCESS } from '../EditLocation/constants';

const reducer = (state = {
  signup: false,
  login: false,
  welcome: false,
  addEvent: false,
  addPhoto: false,
  snackbar: {
    open: false,
    message: '',
  },
  isLoggedIn: false,
  user: null,
}, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVE:
      return {
        ...state,
        [action.target]: !state[action.target],
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: false,
        isLoggedIn: true,
        user: action.user,
        snackbar: {
          open: true,
          message: 'Signed up',
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: false,
        isLoggedIn: true,
        user: action.user,
        snackbar: {
          open: true,
          message: 'Logged in',
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        snackbar: {
          open: true,
          message: 'Logged out',
        },
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        addEvent: false,
        snackbar: {
          open: true,
          message: 'Added event',
        },
      };
    case ADD_PHOTO_SUCCESS:
      return {
        ...state,
        addPhoto: false,
        snackbar: {
          open: true,
          message: 'Added photo',
        },
      };
    case NEW_LOCATION_SUCCESS:
      return {
        ...state,
        snackbar: {
          open: true,
          message: 'Created location',
        },
      };
    case EDIT_LOCATION_SUCCESS:
      return {
        ...state,
        snackbar: {
          open: true,
          message: 'Modified location',
        },
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: false,
          message: state.snackbar.message,
        },
      };
    default:
      return state;
  }
};

export default reducer;
