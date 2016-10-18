import { SET_CATEGORY_VISIBILITY } from './constants';

export const setCategoryVisibility = (target, value) => ({
  type: SET_CATEGORY_VISIBILITY,
  target,
  value,
});
