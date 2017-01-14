import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';
import api from '../../api';

function* logout() {
  try {
    yield call(api.logout);
    yield [
      put({ type: LOGOUT_SUCCESS }),
      put(push('/')),
    ];
  } catch (err) {
    yield put({ type: LOGOUT_ERROR, err });
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* () {
  yield [
    fork(watchLogout),
  ];
}
