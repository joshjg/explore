import {
  SET_CATEGORY_VISIBILITY,
  SHOW_FILTER,
  HIDE_FILTER,
} from './constants';

export const setCategoryVisibility = (target, value) => ({
  type: SET_CATEGORY_VISIBILITY,
  target,
  value,
});

export const showFilter = () => ({
  type: SHOW_FILTER,
});

export const hideFilter = () => ({
  type: HIDE_FILTER,
});
