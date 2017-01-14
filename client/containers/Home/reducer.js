import {
  FETCH_LOCATIONS_SUCCESS,
  SET_CATEGORY_VISIBILITY,
  SHOW_FILTER,
  HIDE_FILTER,
} from './constants';

const reducer = (state = {
  locations: [],
  categories: {
    animals: true,
    art: true,
    csa: true,
    food: true,
    history: true,
    lodging: true,
    outdoors: true,
    'pick-your-own': true,
    plants: true,
    produce: true,
    shopping: true,
    vineyard: true,
  },
  filterVisible: false,
}, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
      };
    case SET_CATEGORY_VISIBILITY:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.target]: action.value,
        },
      };
    case SHOW_FILTER:
      return {
        ...state,
        filterVisible: true,
      };
    case HIDE_FILTER:
      return {
        ...state,
        filterVisible: false,
      };
    default:
      return state;
  }
};

export default reducer;
