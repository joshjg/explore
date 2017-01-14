import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import GoogleMap from 'google-map-react';
import Dialog from 'material-ui/Dialog';
import styles from './LocationPicker.css';
import Marker from '../Marker';

const LocationPicker = props => (
  <Dialog
    title="Select the exact location"
    modal
    open={props.open}
    actions={[
      <FlatButton
        label="Go back"
        primary
        onTouchTap={props.onClickBack}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled={!props.lat || !props.lng}
        onTouchTap={props.onClickSubmit}
      />,
    ]}
  >
    <div>Zoom in and click to place a marker as precisely as you can.</div>
    <small className={styles.errorText}>{props.errorText}</small>
    <div className={styles.map}>
      <GoogleMap
        /* options={() => ({ styles: mapStyle })}*/
        defaultCenter={{ lat: 39.153559, lng: -77.270965 }}
        defaultZoom={11}
        onClick={({ lat, lng }) => props.onClickMap(lat, lng)}
      >
        {props.lat && props.lng
          ? <Marker lat={props.lat} lng={props.lng} category={props.firstCategory} />
          : null
        }
      </GoogleMap>
    </div>
  </Dialog>
);

LocationPicker.propTypes = {
  open: React.PropTypes.bool,
  onClickMap: React.PropTypes.func,
  onClickBack: React.PropTypes.func,
  onClickSubmit: React.PropTypes.func,
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  firstCategory: React.PropTypes.string,
  errorText: React.PropTypes.string,
};

LocationPicker.defaultProps = {
  open: false,
};

export default LocationPicker;
