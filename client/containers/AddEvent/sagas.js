import { call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_ERROR,
} from './constants';
import api from '../../api';

function* putEvent(action) {
  try {
    const event = yield call(api.putEvent, action.id, action.data);
    yield put({ type: ADD_EVENT_SUCCESS, event });
  } catch (err) {
    yield put({ type: ADD_EVENT_ERROR, err });
  }
}

function* watchPutEvent() {
  yield takeLatest(ADD_EVENT_REQUEST, putEvent);
}

export default function* () {
  yield [
    fork(watchPutEvent),
  ];
}
