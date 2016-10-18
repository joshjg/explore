import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import S3Uploader from 'react-s3-uploader';
import LinearProgress from 'material-ui/LinearProgress';
import ChipInput from 'material-ui-chip-input';
import NoLogo from '../../components/NoLogo';
import LocationPicker from '../../components/LocationPicker';

import { categories } from '../../constants';
import {
  setLocationField,
  addCategory,
  deleteCategory,
  putNewLocation,
} from './actions';
import styles from './NewLocation.css';

const fieldStyle = { display: 'block' };

const NewLocation = props => (
  <Paper className={styles.root}>
    <div className={styles.col}>
      <Subheader>Location info</Subheader>
      <TextField
        value={props.name || ''}
        onChange={e => props.handleChange('name', e.target.value)}
        floatingLabelText="Location name"
        style={fieldStyle}
        errorText={(props.missingField && !props.name) ? 'This field is required' : null}
      />
      <TextField
        value={props.description || ''}
        onChange={e => props.handleChange('description', e.target.value)}
        floatingLabelText="Description"
        style={fieldStyle}
        multiLine
        rows={2}
        rowsMax={4}
      />
      <ChipInput
        value={props.categories}
        onRequestAdd={chip => props.handleAddCategory(chip, props.categories)}
        onRequestDelete={props.handleDeleteCategory}
        dataSource={categories}
        openOnFocus
        listStyle={{ maxHeight: '210px', overflow: 'scroll' }}
        floatingLabelText="Categories (one or more required)"
        errorText={(props.missingField && !props.categories.length) ? 'This field is required' : null}
      />
      <TextField
        value={props.street || ''}
        onChange={e => props.handleChange('street', e.target.value)}
        floatingLabelText="Street address"
        style={fieldStyle}
      />
      <TextField
        value={props.city || ''}
        onChange={e => props.handleChange('city', e.target.value)}
        floatingLabelText="City"
        style={fieldStyle}
      />
      <TextField
        value={props.zip || ''}
        onChange={e => props.handleChange('zip', e.target.value)}
        floatingLabelText="Zip code"
        style={fieldStyle}
      />
      <div style={{ marginTop: '20px' }}>
        {props.logo
          ? <img src={props.logo} alt="logo" className={styles.logoThumb} />
          : <NoLogo />
        }
        <RaisedButton
          containerElement="label"
          secondary
          label={props.logo ? 'Upload successful' : 'Upload a logo'}
          disabled={!!props.logo}
          disabledBackgroundColor="#BDBDBD"
        >
          <S3Uploader
            signingUrl="/api/s3/sign"
            accept="image/*"
            onProgress={(val) => {
              props.handleChange('uploadError', false);
              return props.handleChange('uploadProgress', val);
            }}
            onError={() => props.handleChange('uploadError', true)}
            onFinish={data => props.handleChange('logo', `/api${data.publicUrl}`)}
            uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
            className={styles.fileUpload}
          />
        </RaisedButton>
      </div>
      {props.uploadProgress < 100
        ? <LinearProgress mode="determinate" value={props.uploadProgress} />
        : null
      }
      {props.uploadError
        ? <small className={styles.errorText}>
          Error uploading your image. Please try again.
        </small>
        : null
      }
    </div>
    <div className={styles.col}>
      <Subheader>Contact info</Subheader>
      <TextField
        value={props.email || ''}
        onChange={e => props.handleChange('email', e.target.value)}
        floatingLabelText="Email Address"
        style={fieldStyle}
      />
      <TextField
        value={props.website || ''}
        onChange={e => props.handleChange('website', e.target.value)}
        floatingLabelText="Website URL"
        style={fieldStyle}
      />
      <TextField
        value={props.contactName || ''}
        onChange={e => props.handleChange('contactName', e.target.value)}
        floatingLabelText="Contact's full name"
        style={fieldStyle}
      />
      <TextField
        value={props.phone || ''}
        onChange={e => props.handleChange('phone', e.target.value)}
        floatingLabelText="Phone number"
        style={fieldStyle}
      />
    </div>
    <div className={styles.button}>
      <RaisedButton
        label="Submit"
        onTouchTap={() => (
          (!props.name || !props.categories)
            ? props.handleChange('missingField', true)
            : props.handleChange('locationPickerOpen', true)
        )}
        primary
        style={{ float: 'right' }}
      />
    </div>
    <LocationPicker
      open={props.locationPickerOpen}
      lat={props.lat}
      lng={props.lng}
      firstCategory={props.categories[0]}
      onClickMap={(lat, lng) => {
        props.handleChange('lat', lat);
        props.handleChange('lng', lng);
      }}
      onClickBack={() => props.handleChange('locationPickerOpen', false)}
      onClickSubmit={() => props.handleSubmit(props)}
      errorText={props.serverError}
    />
  </Paper>
);

NewLocation.propTypes = {
  userId: React.PropTypes.number,
  name: React.PropTypes.string,
  description: React.PropTypes.string,
  categories: React.PropTypes.arrayOf(React.PropTypes.string),
  logo: React.PropTypes.string,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  street: React.PropTypes.string,
  city: React.PropTypes.string,
  zip: React.PropTypes.string,
  email: React.PropTypes.string,
  website: React.PropTypes.string,
  contactName: React.PropTypes.string,
  phone: React.PropTypes.string,
  uploadProgress: React.PropTypes.number,
  uploadError: React.PropTypes.bool,
  locationPickerOpen: React.PropTypes.bool,
  missingField: React.PropTypes.bool,
  serverError: React.PropTypes.string,
  handleChange: React.PropTypes.func,
  handleAddCategory: React.PropTypes.func,
  handleDeleteCategory: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({
  userId: state.app.user ? state.app.user.id : null,
  name: state.newLocation.name,
  description: state.newLocation.description,
  categories: state.newLocation.categories,
  logo: state.newLocation.logo,
  lat: state.newLocation.lat,
  lng: state.newLocation.lng,
  street: state.newLocation.street,
  city: state.newLocation.city,
  zip: state.newLocation.zip,
  email: state.newLocation.email,
  website: state.newLocation.website,
  contactName: state.newLocation.contactName,
  phone: state.newLocation.phone,
  uploadProgress: state.newLocation.uploadProgress,
  uploadError: state.newLocation.uploadError,
  locationPickerOpen: state.newLocation.locationPickerOpen,
  missingField: state.newLocation.missingField,
  serverError: state.newLocation.serverError,
});

const mapDispatchToProps = dispatch => ({
  handleChange: (field, value) => dispatch(setLocationField(field, value)),
  handleAddCategory: (value, currentCategories) => {
    if (categories.indexOf(value) !== -1 && currentCategories.indexOf(value) === -1) {
      dispatch(addCategory(value));
    }
  },
  handleDeleteCategory: value => dispatch(deleteCategory(value)),
  handleSubmit: props => dispatch(putNewLocation(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewLocation);
