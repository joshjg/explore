import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';

import { logoutRequest } from './actions';

const Logout = props => (
  <MenuItem
    primaryText="Logout"
    onTouchTap={props.handleSubmit}
  />
);

Logout.propTypes = {
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => dispatch(logoutRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
