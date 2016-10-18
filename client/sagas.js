import { fork } from 'redux-saga/effects';

import app from './containers/App/sagas';
import home from './containers/Home/sagas';
import location from './containers/Location/sagas';
import newLocation from './containers/NewLocation/sagas';
import editLocation from './containers/EditLocation/sagas';
import addEvent from './containers/AddEvent/sagas';
import addPhoto from './containers/AddPhoto/sagas';
import signup from './containers/Signup/sagas';
import login from './containers/Login/sagas';
import logout from './containers/Logout/sagas';

export default function* root() {
  yield [
    fork(app),
    fork(home),
    fork(location),
    fork(newLocation),
    fork(editLocation),
    fork(addEvent),
    fork(addPhoto),
    fork(signup),
    fork(login),
    fork(logout),
  ];
}
