import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_ERROR,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from './constants';
import api from '../../api';

function* fetchLocation(action) {
  try {
    const [location, events, photos] = yield [
      call(api.fetchLocation, action.id),
      call(api.fetchRelatedEvents, action.id),
      call(api.fetchRelatedPhotos, action.id),
    ];
    yield put({ type: FETCH_LOCATION_SUCCESS, location, events, photos });
  } catch (err) {
    yield put({ type: FETCH_LOCATION_ERROR, err }); // TODO check 404
  }
}

function* deleteContent(action) {
  try {
    switch (action.targetType) {
      case 'event':
        yield call(api.deleteEvent, action.id);
        break;
      case 'photo':
        yield call(api.deletePhoto, action.id);
        break;
      case 'location':
        yield call(api.deleteLocation, action.id);
        break;
      default:
        return;
    }
    yield action.targetType === 'location'
    ? [
      put({ type: DELETE_SUCCESS, targetType: action.targetType }),
      put(push('/')),
    ]
    : put({ type: DELETE_SUCCESS, targetType: action.targetType });
  } catch (err) {
    yield put({ type: DELETE_ERROR, err });
  }
}

function* watchFetchLocation() {
  yield takeLatest(FETCH_LOCATION_REQUEST, fetchLocation);
}

function* watchDelete() {
  yield takeLatest(DELETE_REQUEST, deleteContent);
}

export default function* () {
  yield [
    fork(watchFetchLocation),
    fork(watchDelete),
  ];
}
