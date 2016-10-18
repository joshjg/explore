import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
} from './constants';
import api from '../../api';

function* auth() {
  try {
    const user = yield call(api.auth);
    yield put({ type: AUTH_SUCCESS, user });
  } catch (err) {
    yield put({ type: AUTH_ERROR, err });
  }
}

function* watchAuth() {
  yield takeEvery(AUTH_REQUEST, auth);
}

export default function* () {
  yield [
    fork(watchAuth),
  ];
}
