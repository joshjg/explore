import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './constants';
import api from '../../api';

function* login(action) {
  try {
    const user = yield call(api.login, action.data);
    yield put(user.error || user.message
      ? { type: LOGIN_ERROR, err: user.error }
      : { type: LOGIN_SUCCESS, user }
    );
  } catch (err) {
    yield put({ type: LOGIN_ERROR, err });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* () {
  yield [
    fork(watchLogin),
  ];
}
