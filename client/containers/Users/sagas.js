import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
} from './constants';
import api from '../../api';

function* fetchUsers() {
  try {
    const users = yield call(api.fetchUsers);
    yield put({ type: FETCH_USERS_SUCCESS, users });
  } catch (err) {
    yield put({ type: FETCH_USERS_ERROR, err });
  }
}

function* putUser(action) {
  try {
    const user = yield call(api.putUser, action.id, action.user);
    yield put({ type: EDIT_USER_SUCCESS, user });
  } catch (err) {
    yield put({ type: EDIT_USER_ERROR, err, id: action.id });
  }
}

function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
}

function* watchPutUser() {
  yield takeLatest(EDIT_USER_REQUEST, putUser);
}

export default function* () {
  yield [
    fork(watchFetchUsers),
    fork(watchPutUser),
  ];
}
