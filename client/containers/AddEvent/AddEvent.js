import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import { toggleActive } from '../App/actions';
import { addEventRequest, setEventField } from './actions';
import styles from './AddEvent.css';

const fieldStyle = { display: 'block' };

const AddPhoto = props => (
  <Dialog
    open
    title="Add an event"
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
          (!props.name || !props.date || !props.locationId)
            ? props.handleChange('missingField', true)
            : props.handleSubmit(
              props.name,
              props.description,
              props.date,
              props.timeStart,
              props.timeEnd,
              props.locationId,
            )
        )}
      />,
    ]}
  >
    <small className={styles.errorText}>{props.serverError}</small>
    <TextField
      value={props.name || ''}
      onChange={e => props.handleChange('name', e.target.value)}
      floatingLabelText="Title"
      style={fieldStyle}
      errorText={(props.missingField && !props.name) ? 'This field is required' : null}
    />
    <TextField
      value={props.description || ''}
      onChange={e => props.handleChange('description', e.target.value)}
      floatingLabelText="Description"
      style={fieldStyle}
    />
    <DatePicker
      hintText="Date"
      value={props.date}
      onChange={(e, date) => props.handleChange('date', date)}
      errorText={(props.missingField && !props.date) ? 'This field is required' : null}
    />
    <TimePicker
      hintText="Start time"
      value={props.timeStart}
      onChange={(e, date) => props.handleChange('timeStart', date)}
    />
    <TimePicker
      hintText="End time"
      value={props.timeEnd}
      onChange={(e, date) => props.handleChange('timeEnd', date)}
    />
  </Dialog>
);

AddPhoto.propTypes = {
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  timeStart: React.PropTypes.instanceOf(Date),
  timeEnd: React.PropTypes.instanceOf(Date),
  locationId: React.PropTypes.number.isRequired,
  serverError: React.PropTypes.string,
  missingField: React.PropTypes.bool,
  toggleActive: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({
  name: state.addEvent.name,
  description: state.addEvent.description,
  date: state.addEvent.date,
  timeStart: state.addEvent.timeStart,
  timeEnd: state.addEvent.timeEnd,
  locationId: state.location.id,
  missingField: state.addEvent.missingField,
  serverError: state.addEvent.serverError,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(toggleActive('addEvent')),
  handleChange: (field, value) => dispatch(setEventField(field, value)),
  handleSubmit: (name, description, date, timeStart, timeEnd, locationId) => (
    dispatch(addEventRequest(name, description, date, timeStart, timeEnd, locationId))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
