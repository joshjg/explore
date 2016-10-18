import { TOGGLE_ACTIVE } from './constants';

export const toggleActive = target => ({
  type: TOGGLE_ACTIVE,
  target,
});
