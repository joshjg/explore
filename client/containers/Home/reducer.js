import { FETCH_LOCATIONS_SUCCESS, SET_CATEGORY_VISIBILITY } from './constants';

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
    default:
      return state;
  }
};

export default reducer;
