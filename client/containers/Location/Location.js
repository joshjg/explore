import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import GoogleMap from 'google-map-react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MediaQuery from 'react-responsive';

import Marker from '../../components/Marker';
import EventList from '../../components/EventList';
import PhotoList from '../../components/PhotoList';
import { toggleActive } from '../App/actions';
import { promptDelete, requestDelete } from './actions';
import { FETCH_LOCATION_REQUEST, HIDE_PROMPT } from './constants';
import styles from './Location.css';

class Location extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
    }),
    user: React.PropTypes.shape({
      id: React.PropTypes.number,
      email: React.PropTypes.string,
      admin: React.PropTypes.number,
      canCreate: React.PropTypes.number,
    }),
    owners: React.PropTypes.arrayOf(React.PropTypes.number),
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
    logo: React.PropTypes.string,
    lat: React.PropTypes.number,
    lng: React.PropTypes.number,
    address: React.PropTypes.shape({
      street: React.PropTypes.string,
      city: React.PropTypes.string,
      zip: React.PropTypes.string,
    }),
    email: React.PropTypes.string,
    website: React.PropTypes.string,
    contactName: React.PropTypes.string,
    phone: React.PropTypes.string,
    events: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      date: React.PropTypes.integer,
      timeStart: React.PropTypes.integer,
      timeEnd: React.PropTypes.integer,
    })),
    photos: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      url: React.PropTypes.string,
      caption: React.PropTypes.string,
    })),
    refresh: React.PropTypes.bool,
    prompt: React.PropTypes.shape({
      open: React.PropTypes.bool,
      targetType: React.PropTypes.string,
      id: React.PropTypes.number,
    }),
    requestLocation: React.PropTypes.func,
    toggleActive: React.PropTypes.func,
    promptDelete: React.PropTypes.func,
    hidePrompt: React.PropTypes.func,
    handleDelete: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    props.requestLocation(props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refresh) nextProps.requestLocation(nextProps.params.id);
  }

  userCanEdit = () => {
    if (!this.props.user) return false;
    if (this.props.user.admin) return true;
    if (this.props.owners && this.props.owners.indexOf(this.props.user.id) !== -1) return true;
    return false;
  };

  render = () => (
    <div className={styles.root}>
      <div className={styles.left}>
        <Paper className={styles.mapContainer}>
          <FloatingActionButton
            className={styles.backButton}
            containerElement={<Link to="/" />}
          >
            <ArrowBack />
          </FloatingActionButton>
          <div className={styles.map}>
            <GoogleMap
            /* options={() => ({ styles: mapStyle })}*/
              center={{ lat: this.props.lat, lng: this.props.lng }}
              zoom={14}
            >
              <Marker
                lat={this.props.lat}
                lng={this.props.lng}
                category={this.props.categories ? this.props.categories[0] : 'produce'}
              />
            </GoogleMap>
          </div>
          {this.props.address && this.props.address.street
            ? <div className={styles.address}>
                {this.props.address.street}<br />
                {this.props.address.city}{', MD  '}{this.props.address.zip}
              </div>
            : null
          }
        </Paper>
        {this.props.events && this.props.events.length > 0
          ? <Paper className={styles.eventList}>
              <EventList
                events={this.props.events}
                canDelete={this.userCanEdit()}
                onClickDelete={id => this.props.promptDelete('event', id)}
              />
            </Paper>
          : null
        }
      </div>

      <div className={styles.right}>
        <div className={styles.header}>
          {this.props.logo
            ? <div className={styles.logoContainer}>
                <img src={this.props.logo} alt="logo" className={styles.logo} />
              </div>
            : null
          }
          <div className={styles.headerText}>
            <h1 className={styles.title}>{this.props.name}</h1>
            <div className={styles.description}>
              <div>{this.props.description}</div>
              <br />
              {this.props.contactName ? `Contact ${this.props.contactName}\n` : null}
              <div><a href={this.props.website}>{this.props.website}</a></div>
              <div><a href={`mailto:${this.props.email}`}>{this.props.email}</a></div>
              <div>{this.props.phone}</div>
            </div>
          </div>
        </div>
        {this.userCanEdit()
          ? <div className={styles.buttons}>
              <RaisedButton
                label="Edit info"
                primary
                containerElement={<Link to={`/locations/${this.props.params.id}/edit`} />}
              />
              <RaisedButton
                label="+ event"
                primary
                onTouchTap={() => this.props.toggleActive('addEvent')}
              />
              <RaisedButton
                label="+ photo"
                primary
                onTouchTap={() => this.props.toggleActive('addPhoto')}
              />
            </div>
          : null
        }
        {this.props.photos && this.props.photos.length > 0
          ? <MediaQuery maxWidth={600}>
              {matches => matches
              ? <PhotoList
                  rows={2}
                  photos={this.props.photos}
                  canDelete={this.userCanEdit()}
                  onClickDelete={id => this.props.promptDelete('photo', id)}
                />
              : <PhotoList
                  rows={3}
                  photos={this.props.photos}
                  canDelete={this.userCanEdit()}
                  onClickDelete={id => this.props.promptDelete('photo', id)}
                />
              }
            </MediaQuery>
          : null
        }
      </div>
      <Dialog
        title="Confirm deletion"
        modal
        open={this.props.prompt.open}
        actions={[
          <FlatButton
            label="Cancel"
            primary
            onTouchTap={this.props.hidePrompt}
          />,
          <FlatButton
            label="Delete"
            primary
            onTouchTap={() => this.props.handleDelete(this.props.prompt)}
          />,
        ]}
      >
        Are you sure you want to delete this {this.props.prompt.targetType}?
      </Dialog>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.app.user,
  owners: state.location.owners,
  name: state.location.name,
  description: state.location.description,
  categories: state.location.categories,
  logo: state.location.logo,
  lat: state.location.lat,
  lng: state.location.lng,
  address: state.location.address,
  email: state.location.email,
  website: state.location.website,
  contactName: state.location.contactName,
  phone: state.location.phone,
  events: state.location.events,
  photos: state.location.photos,
  refresh: state.location.refresh,
  prompt: state.location.prompt,
});

const mapDispatchToProps = dispatch => ({
  requestLocation: id => dispatch({ type: FETCH_LOCATION_REQUEST, id }),
  toggleActive: target => dispatch(toggleActive(target)),
  promptDelete: (targetType, id) => dispatch(promptDelete(targetType, id)),
  hidePrompt: () => dispatch({ type: HIDE_PROMPT }),
  handleDelete: prompt => dispatch(requestDelete(prompt.targetType, prompt.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
