import { ADD_EVENT_REQUEST, SET_EVENT_FIELD } from './constants';

export const addEventRequest = (
  name,
  description,
  date,
  timeStart,
  timeEnd,
  locationId,
) => ({
  type: ADD_EVENT_REQUEST,
  data: {
    name,
    description,
    date: date ? date.getTime() : null,
    timeStart: timeStart ? timeStart.getTime() : 0,
    timeEnd: timeEnd ? timeEnd.getTime() : 0,
    locationId,
  },
  id: locationId,
});

export const setEventField = (field, value) => ({
  type: SET_EVENT_FIELD,
  field,
  value,
});
