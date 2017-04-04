import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Snackbar from 'material-ui/Snackbar';
import Navbar from '../Navbar';
import Signup from '../Signup';
import Login from '../Login';
import Welcome from '../Welcome';
import AddEvent from '../AddEvent';
import AddPhoto from '../AddPhoto';

import { toggleActive } from './actions';
import { AUTH_REQUEST, CLOSE_SNACKBAR } from './constants';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    signupActive: React.PropTypes.bool,
    loginActive: React.PropTypes.bool,
    welcomeActive: React.PropTypes.bool,
    addEventActive: React.PropTypes.bool,
    addPhotoActive: React.PropTypes.bool,
    snackbar: React.PropTypes.shape({
      open: React.PropTypes.bool,
      message: React.PropTypes.string,
    }),
    requestAuth: React.PropTypes.func,
    closeSnackbar: React.PropTypes.func,
    toggleActive: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    props.requestAuth();
    if (Cookies.get('welcomeRead') !== '1.0') {
      props.toggleActive('welcome');
    }
  }

  render = () => (
    <div>
      <Navbar />
      {this.props.children}
      {this.props.signupActive ? <Signup /> : null}
      {this.props.loginActive ? <Login /> : null}
      {this.props.welcomeActive ? <Welcome /> : null}
      {this.props.addEventActive ? <AddEvent /> : null}
      {this.props.addPhotoActive ? <AddPhoto /> : null}
      <Snackbar
        open={this.props.snackbar.open}
        message={this.props.snackbar.message}
        autoHideDuration={4000}
        onRequestClose={this.props.closeSnackbar}
        bodyStyle={{ backgroundColor: '#A5D6A7' }}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  signupActive: state.app.signup,
  loginActive: state.app.login,
  welcomeActive: state.app.welcome,
  addEventActive: state.app.addEvent,
  addPhotoActive: state.app.addPhoto,
  snackbar: state.app.snackbar,
});

const mapDispatchToProps = dispatch => ({
  requestAuth: () => dispatch({ type: AUTH_REQUEST }),
  closeSnackbar: () => dispatch({ type: CLOSE_SNACKBAR }),
  toggleActive: target => dispatch(toggleActive(target)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
