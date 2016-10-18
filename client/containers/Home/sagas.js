import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
} from './constants';
import api from '../../api';

function* fetchLocations() {
  try {
    const locations = yield call(api.fetchLocations);
    yield put({ type: FETCH_LOCATIONS_SUCCESS, locations });
  } catch (err) {
    yield put({ type: FETCH_LOCATIONS_ERROR, err });
  }
}

function* watchFetchLocations() {
  yield takeLatest(FETCH_LOCATIONS_REQUEST, fetchLocations);
}

export default function* () {
  yield [
    fork(watchFetchLocations),
  ];
}
