import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute, Redirect } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '!style!css!./global.css'; // eslint-disable-line import/no-unresolved
import theme from './theme';
import reducer from './reducer';
import saga from './sagas';
import api from './api';
import App from './containers/App';
import Home from './containers/Home';
import About from './containers/About';
import Login from './containers/Login';
import Location from './containers/Location';
import NewLocation from './containers/NewLocation';
import EditLocation from './containers/EditLocation';
import Users from './containers/Users';

injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    ...reducer,
    routing: routerReducer,
  }),
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware), window.devToolsExtension && window.devToolsExtension())
    : applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(saga);

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="login" component={Login} />
          <Route path="locations/:id/edit" component={EditLocation} />
          <Route path="locations/:id" component={Location} />
          <Route path="newlocation" component={NewLocation} onEnter={api.userCanCreate} />
          <Route path="about" component={About} />
          <Route path="users" component={Users} />
          <Redirect from="*" to="/" />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
