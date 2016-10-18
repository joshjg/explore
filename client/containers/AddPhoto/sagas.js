import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import {
  ADD_PHOTO_REQUEST,
  ADD_PHOTO_SUCCESS,
  ADD_PHOTO_ERROR,
} from './constants';
import api from '../../api';

function* putPhoto(action) {
  try {
    const photo = yield call(api.putPhoto, action.id, action.data);
    yield put({ type: ADD_PHOTO_SUCCESS, photo });
  } catch (err) {
    yield put({ type: ADD_PHOTO_ERROR, err });
  }
}

function* watchPutPhoto() {
  yield takeLatest(ADD_PHOTO_REQUEST, putPhoto);
}

export default function* () {
  yield [
    fork(watchPutPhoto),
  ];
}
