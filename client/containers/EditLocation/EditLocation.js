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

import { FETCH_LOCATION_REQUEST } from '../Location/constants';
import { categories } from '../../constants';
import {
  setLocationField,
  addCategory,
  deleteCategory,
  putLocation,
} from './actions';
import styles from './EditLocation.css';

const fieldStyle = { display: 'block' };

/**
 *  NOTE: WILL BE REPLACED WITH A DIALOG COMPONENT WITHIN Location
 */

class EditLocation extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
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
    requestLocation: React.PropTypes.func,
    handleChange: React.PropTypes.func,
    handleAddCategory: React.PropTypes.func,
    handleDeleteCategory: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    props.requestLocation(props.params.id);
  }

  render = () => (
    <Paper className={styles.root}>
      <div className={styles.col}>
        <Subheader>Location info</Subheader>
        <TextField
          value={this.props.name || ''}
          onChange={e => this.props.handleChange('name', e.target.value)}
          floatingLabelText="Location name"
          style={fieldStyle}
          errorText={(this.props.missingField && !this.props.name) ? 'This field is required' : null}
        />
        <TextField
          value={this.props.description || ''}
          onChange={e => this.props.handleChange('description', e.target.value)}
          floatingLabelText="Description"
          style={fieldStyle}
          multiLine
          rows={2}
          rowsMax={4}
        />
        <ChipInput
          value={this.props.categories}
          onRequestAdd={chip => this.props.handleAddCategory(chip, this.props.categories)}
          onRequestDelete={this.props.handleDeleteCategory}
          dataSource={categories}
          openOnFocus
          listStyle={{ maxHeight: '210px', overflow: 'scroll' }}
          floatingLabelText="Categories (one or more required)"
          errorText={(this.props.missingField && !this.props.categories.length) ? 'This field is required' : null}
        />
        <TextField
          value={this.props.street || ''}
          onChange={e => this.props.handleChange('street', e.target.value)}
          floatingLabelText="Street address"
          style={fieldStyle}
        />
        <TextField
          value={this.props.city || ''}
          onChange={e => this.props.handleChange('city', e.target.value)}
          floatingLabelText="City"
          style={fieldStyle}
        />
        <TextField
          value={this.props.zip || ''}
          onChange={e => this.props.handleChange('zip', e.target.value)}
          floatingLabelText="Zip code"
          style={fieldStyle}
        />
        <div style={{ marginTop: '20px' }}>
          {this.props.logo
            ? <img src={this.props.logo} alt="logo" className={styles.logoThumb} />
            : <NoLogo />
          }
          <RaisedButton
            containerElement="label"
            secondary
            label={this.props.logo ? 'Upload new logo' : 'Upload a logo'}
          >
            <S3Uploader
              signingUrl="/api/s3/sign"
              accept="image/*"
              onProgress={(val) => {
                this.props.handleChange('uploadError', false);
                return this.props.handleChange('uploadProgress', val);
              }}
              onError={() => this.props.handleChange('uploadError', true)}
              onFinish={data => this.props.handleChange('logo', `/api${data.publicUrl}`)}
              uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
              className={styles.fileUpload}
            />
          </RaisedButton>
        </div>
        {this.props.uploadProgress < 100
          ? <LinearProgress mode="determinate" value={this.props.uploadProgress} />
          : null
        }
        {this.props.uploadError
          ? <small className={styles.errorText}>
            Error uploading your image. Please try again.
          </small>
          : null
        }
      </div>
      <div className={styles.col}>
        <Subheader>Contact info</Subheader>
        <TextField
          value={this.props.email || ''}
          onChange={e => this.props.handleChange('email', e.target.value)}
          floatingLabelText="Email Address"
          style={fieldStyle}
        />
        <TextField
          value={this.props.website || ''}
          onChange={e => this.props.handleChange('website', e.target.value)}
          floatingLabelText="Website URL"
          style={fieldStyle}
        />
        <TextField
          value={this.props.contactName || ''}
          onChange={e => this.props.handleChange('contactName', e.target.value)}
          floatingLabelText="Contact's full name"
          style={fieldStyle}
        />
        <TextField
          value={this.props.phone || ''}
          onChange={e => this.props.handleChange('phone', e.target.value)}
          floatingLabelText="Phone number"
          style={fieldStyle}
        />
      </div>
      <div className={styles.button}>
        <RaisedButton
          label="Submit"
          onTouchTap={() => (
            (!this.props.name || !this.props.categories)
              ? this.props.handleChange('missingField', true)
              : this.props.handleChange('locationPickerOpen', true)
          )}
          primary
          style={{ float: 'right' }}
        />
      </div>
      <LocationPicker
        open={this.props.locationPickerOpen}
        lat={this.props.lat}
        lng={this.props.lng}
        firstCategory={this.props.categories[0]}
        onClickMap={(lat, lng) => {
          this.props.handleChange('lat', lat);
          this.props.handleChange('lng', lng);
        }}
        onClickBack={() => this.props.handleChange('locationPickerOpen', false)}
        onClickSubmit={() => this.props.handleSubmit(this.props)}
        errorText={this.props.serverError}
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  name: state.editLocation.name,
  description: state.editLocation.description,
  categories: state.editLocation.categories,
  logo: state.editLocation.logo,
  lat: state.editLocation.lat,
  lng: state.editLocation.lng,
  street: state.editLocation.street,
  city: state.editLocation.city,
  zip: state.editLocation.zip,
  email: state.editLocation.email,
  website: state.editLocation.website,
  contactName: state.editLocation.contactName,
  phone: state.editLocation.phone,
  uploadProgress: state.editLocation.uploadProgress,
  uploadError: state.editLocation.uploadError,
  locationPickerOpen: state.editLocation.locationPickerOpen,
  missingField: state.editLocation.missingField,
  serverError: state.editLocation.serverError,
});

const mapDispatchToProps = dispatch => ({
  requestLocation: id => dispatch({ type: FETCH_LOCATION_REQUEST, id }),
  handleChange: (field, value) => dispatch(setLocationField(field, value)),
  handleAddCategory: (value, currentCategories) => {
    if (categories.indexOf(value) !== -1 && currentCategories.indexOf(value) === -1) {
      dispatch(addCategory(value));
    }
  },
  handleDeleteCategory: value => dispatch(deleteCategory(value)),
  handleSubmit: props => dispatch(putLocation(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLocation);
