import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { toggleActive } from '../App/actions';
import { signupRequest, setSignupField } from './actions';

const Signup = props => (
  <Dialog
    open
    title="Sign up to manage your location"
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
          (!props.email
            || props.email.search(/@/) < 1 // loosely enforce 'valid' address
            || !props.password
            || props.password.length < 8 // enforce min length of 8
            || props.password !== props.passwordAgain
          )
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
      errorText={(props.missingField && (!props.email || props.email.search(/@/) < 1))
        ? 'Valid email address required'
        : null
      }
    />
    <TextField
      value={props.password || ''}
      onChange={e => props.handleChange('password', e.target.value.trim())}
      floatingLabelText="Password"
      type="password"
      style={{ display: 'block' }}
      errorText={(props.missingField && (!props.password || props.password.length < 8))
        ? 'At least 8 characters required'
        : null
      }
    />
    <TextField
      value={props.passwordAgain || ''}
      onChange={e => props.handleChange('passwordAgain', e.target.value.trim())}
      floatingLabelText="Re-enter password"
      type="password"
      style={{ display: 'block' }}
      errorText={(props.missingField && (props.password !== props.passwordAgain))
        ? 'Password must match'
        : null
      }
    />
  </Dialog>
);

Signup.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  passwordAgain: React.PropTypes.string,
  missingField: React.PropTypes.bool,
  error: React.PropTypes.string, // submission errors
  toggleActive: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({
  email: state.signup.email,
  password: state.signup.password,
  passwordAgain: state.signup.passwordAgain,
  missingField: state.signup.missingField,
  error: state.signup.error,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(toggleActive('signup')),
  handleChange: (field, value) => dispatch(setSignupField(field, value)),
  handleSubmit: (email, password) => dispatch(signupRequest(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
