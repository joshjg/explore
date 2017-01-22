import React from 'react';
import { connect } from 'react-redux';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import { FETCH_USERS_REQUEST } from './constants';
import { setUserField, putUser } from './actions';

class Users extends React.Component {
  static propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.object),
    status: React.PropTypes.object,
    requestUsers: React.PropTypes.func,
    editUser: React.PropTypes.func,
    handleChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    props.requestUsers();
  }

  render = () => (
    <Table selectable={false}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Permission</TableHeaderColumn>
        <TableHeaderColumn>Submit</TableHeaderColumn>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {this.props.users.map(user => (
          <TableRow key={user.id}>
            <TableRowColumn>{user.id}</TableRowColumn>
            <TableRowColumn>
              <TextField
                id={user.id.toString()}
                value={user.email || ''}
                onChange={e => this.props.handleChange(user.id, 'email', e.target.value)}
              />
            </TableRowColumn>
            <TableRowColumn>
              <Checkbox
                checked={!!user.canCreate}
                onCheck={(e, checked) => this.props.handleChange(user.id, 'canCreate', checked)}
              />
            </TableRowColumn>
            <TableRowColumn>
              <RaisedButton
                label="Submit"
                primary
                onTouchTap={() => this.props.editUser(user.id, user.email, user.canCreate)}
              />
              {this.props.status[user.id] ? this.props.status[user.id] : ''}
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const mapStateToProps = state => ({
  users: state.users.users,
  status: state.users.status,
});

const mapDispatchToProps = dispatch => ({
  requestUsers: () => dispatch({ type: FETCH_USERS_REQUEST }),
  handleChange: (id, field, value) => dispatch(setUserField(id, field, value)),
  editUser: (id, email, canCreate) => dispatch(putUser(id, email, !!canCreate)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
