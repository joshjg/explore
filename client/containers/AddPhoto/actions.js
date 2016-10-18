import { ADD_PHOTO_REQUEST, SET_PHOTO_FIELD } from './constants';

export const addPhotoRequest = (url, caption, locationId) => ({
  type: ADD_PHOTO_REQUEST,
  data: {
    url,
    caption,
    locationId,
  },
  id: locationId,
});

export const setPhotoField = (field, value) => ({
  type: SET_PHOTO_FIELD,
  field,
  value,
});
