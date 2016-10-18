import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import S3Uploader from 'react-s3-uploader';
import LinearProgress from 'material-ui/LinearProgress';

import NoImg from '../../components/NoImg';
import { toggleActive } from '../App/actions';
import { addPhotoRequest, setPhotoField } from './actions';
import styles from './AddPhoto.css';

const AddPhoto = props => (
  <Dialog
    open
    title="Add a photo"
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
          (!props.url || !props.locationId)
            ? props.handleChange('missingField', true)
            : props.handleSubmit(props.url, props.caption, props.locationId)
        )}
      />,
    ]}
  >
    <small className={styles.errorText}>{props.serverError}</small>
    <div>
      {props.url
        ? <img src={props.url} alt="logo" className={styles.imgThumb} />
        : <NoImg />
      }
      <RaisedButton
        containerElement="label"
        secondary
        label={props.url ? 'Upload successful' : 'Upload a photo'}
        disabled={!!props.url}
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
          onFinish={data => props.handleChange('url', `/api${data.publicUrl}`)}
          uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
          className={styles.fileUpload}
        />
      </RaisedButton>
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
      {props.missingField
        ? <small className={styles.errorText}>
          You must upload an image.
        </small>
        : null
      }
    </div>
    <TextField
      value={props.caption || ''}
      onChange={e => props.handleChange('caption', e.target.value)}
      floatingLabelText="Caption"
      style={{ display: 'block' }}
    />
  </Dialog>

);

AddPhoto.propTypes = {
  url: React.PropTypes.string,
  caption: React.PropTypes.string,
  locationId: React.PropTypes.number.isRequired,
  uploadProgress: React.PropTypes.number,
  uploadError: React.PropTypes.bool,
  serverError: React.PropTypes.string,
  missingField: React.PropTypes.bool,
  toggleActive: React.PropTypes.func,
  handleChange: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
};

const mapStateToProps = state => ({
  url: state.addPhoto.url,
  caption: state.addPhoto.caption,
  locationId: state.location.id,
  missingField: state.addPhoto.missingField,
  serverError: state.addPhoto.serverError,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(toggleActive('addPhoto')),
  handleChange: (field, value) => dispatch(setPhotoField(field, value)),
  handleSubmit: (url, caption, locationId) => dispatch(addPhotoRequest(url, caption, locationId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
