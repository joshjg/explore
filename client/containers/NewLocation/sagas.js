import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  NEW_LOCATION_REQUEST,
  NEW_LOCATION_SUCCESS,
  NEW_LOCATION_ERROR,
} from './constants';
import api from '../../api';

function* putNewLocation(action) {
  try {
    const location = yield call(api.putNewLocation, action.location);
    yield [
      put({ type: NEW_LOCATION_SUCCESS, location }),
      put(push(`/locations/${location.id}`)),
    ];
  } catch (err) {
    yield put({ type: NEW_LOCATION_ERROR, err });
  }
}

function* watchPutNewLocation() {
  yield takeLatest(NEW_LOCATION_REQUEST, putNewLocation);
}

export default function* () {
  yield [
    fork(watchPutNewLocation),
  ];
}
