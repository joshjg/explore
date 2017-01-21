import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { toggleActive } from '../App/actions';
import { loginRequest, setLoginField } from './actions';

const Login = props => (
  <Dialog
    open
    title="Log in"
    autoScrollBodyContent
    actions={[
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={props.toggleActive}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={() => (
          (!props.email || !props.password)
            ? props.handleChange('missingField', true)
            : props.handleSubmit(props.email, props.password)
        )}
      />,
    ]}
  >
    <small style={{ color: '#C00' }}>{props.error}</small>
    <TextField
      value={props.email || ''}
      onChange={e => props.handleChange('email', e.target.value.trim())}
      floatingLabelText="Email address"
      style={{ display: 'block' }}
      errorText={(props.missingField && !props.email) ? 'This field is required' : null}
    />
    <TextField
      value={props.password || ''}
      onChange={e => props.handleChange('password', e.target.value.trim())}
      floatingLabelText="Password"
      type="password"
      style={{ display: 'block' }}
      errorText={(props.missingField && !props.password) ? 'This field is required' : null}
    />
  </Dialog>

);

Login.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  missingField: React.PropTypes.bool,
  error: React.PropTypes.string, // submission errors
  toggleActive: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({
  email: state.login.email,
  password: state.login.password,
  missingField: state.login.missingField,
  error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(toggleActive('login')),
  handleChange: (field, value) => dispatch(setLoginField(field, value)),
  handleSubmit: (email, password) => dispatch(loginRequest(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
