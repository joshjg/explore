import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  EDIT_LOCATION_REQUEST,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_ERROR,
} from './constants';
import api from '../../api';

function* putLocation(action) {
  try {
    const location = yield call(api.putLocation, action.id, action.location);
    yield [
      put({ type: EDIT_LOCATION_SUCCESS, location }),
      put(push(`/locations/${action.id}`)),
    ];
  } catch (err) {
    yield put({ type: EDIT_LOCATION_ERROR, err });
  }
}

function* watchPutLocation() {
  yield takeLatest(EDIT_LOCATION_REQUEST, putLocation);
}

export default function* () {
  yield [
    fork(watchPutLocation),
  ];
}
