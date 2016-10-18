import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';
import api from '../../api';

function* signup(action) {
  try {
    const user = yield call(api.signup, action.data);
    yield put(user.error || user.message
      ? { type: SIGNUP_ERROR, err: user.error }
      : { type: SIGNUP_SUCCESS, user }
    );
  } catch (err) {
    yield put({ type: SIGNUP_ERROR, err });
  }
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* () {
  yield [
    fork(watchSignup),
  ];
}
