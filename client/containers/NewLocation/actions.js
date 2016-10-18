import {
  SET_LOCATION_FIELD,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  NEW_LOCATION_REQUEST,
} from './constants';

export const setLocationField = (field, value) => ({
  type: SET_LOCATION_FIELD,
  field,
  value,
});

export const addCategory = value => ({
  type: ADD_CATEGORY,
  value,
});

export const deleteCategory = value => ({
  type: DELETE_CATEGORY,
  value,
});

export const putNewLocation = props => ({
  type: NEW_LOCATION_REQUEST,
  location: {
    owners: [props.userId],
    name: props.name,
    description: props.description,
    categories: props.categories,
    logo: props.logo,
    lat: props.lat,
    lng: props.lng,
    address: {
      street: props.street,
      city: props.city,
      zip: props.zip,
    },
    email: props.email,
    website: props.website,
    contactName: props.contactName,
    phone: props.phone,
  },
});
