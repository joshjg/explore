import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Logout from '../Logout';
import { toggleActive } from '../App/actions';
import logo from '../../assets/explore_logo_alt5.png';

const Navbar = props => (
  <AppBar
    title=""
    iconElementLeft={(
      <Link to="/">
        <div style={{ height: '50px' }}>
          <img src={logo} style={{ height: '100%', maxHeight: '100%' }} alt="logo" />
        </div>
      </Link>
    )}
    iconStyleLeft={{ marginLeft: '30px' }}
    iconElementRight={(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Welcome"
          onTouchTap={() => props.toggleActive('welcome')}
        />
        {props.isLoggedIn
          ? <MenuItem
            primaryText="New location"
            containerElement={<Link to="/newlocation" />}
          />
          : <MenuItem
            primaryText="Sign up"
            onTouchTap={() => props.toggleActive('signup')}
          />
        }
        {props.isLoggedIn
          ? <Logout />
          : <MenuItem
            primaryText="Log in"
            onTouchTap={() => props.toggleActive('login')}
          />
        }
      </IconMenu>
    )}
  />
);

Navbar.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  toggleActive: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.app.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: target => dispatch(toggleActive(target)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
