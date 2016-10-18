import { PROMPT_DELETE, DELETE_REQUEST } from './constants';

export const promptDelete = (targetType, id) => ({
  type: PROMPT_DELETE,
  targetType,
  id,
});

export const requestDelete = (targetType, id) => ({
  type: DELETE_REQUEST,
  targetType,
  id,
});
