/* eslint-disable react/jsx-indent-props, react/jsx-closing-bracket-location */

import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

import Marker from '../../components/Marker';
import FilterPanel from '../../components/FilterPanel';
import FilterButton from '../../components/FilterButton';
// import mapStyle from './mapStyle.json';
import styles from './Home.css';
import { FETCH_LOCATIONS_REQUEST } from './constants';
import { setCategoryVisibility, showFilter, hideFilter } from './actions';


class Home extends React.Component {
  static propTypes = {
    locations: React.PropTypes.arrayOf(React.PropTypes.object),
    categories: React.PropTypes.objectOf(React.PropTypes.bool),
    filterVisible: React.PropTypes.bool,
    requestLocations: React.PropTypes.func,
    handleCheck: React.PropTypes.func,
    showFilter: React.PropTypes.func,
    hideFilter: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    props.requestLocations();
  }

  locationIsVisible = (location) => {
    for (let i = 0; i < location.categories.length; i++) {
      if (this.props.categories[location.categories[i]]) return true;
    }
    return false;
  }

  render = () => (
    <div>
      <div className={styles.map}>
        <GoogleMap
          /* options={() => ({ styles: mapStyle })}*/
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_KEY }}
          center={{ lat: 39.203255, lng: -77.256038 }}
          defaultZoom={11}
          onGoogleApiLoaded={({ map }) => {
            map.data.loadGeoJson('/api/RDT.json');
            map.data.setStyle({
              fillColor: 'green',
              strokeWeight: 0,
            });
          }}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.props.locations.map(location => (
            location.categories && this.locationIsVisible(location)
            ? <Marker
                key={location.id}
                lat={location.lat}
                lng={location.lng}
                category={location.categories ? location.categories[0] : 'produce'}
                tooltip
                location={location}
              />
            : null
          ))}
        </GoogleMap>
      </div>
      {this.props.filterVisible
        ? <FilterPanel
            className={styles.filterPanel}
            values={this.props.categories}
            onCheck={this.props.handleCheck}
            onClickClose={this.props.hideFilter}
          />
        : <FilterButton onClick={this.props.showFilter} />
      }
    </div>
  );
}

const mapStateToProps = state => ({
  locations: state.home.locations,
  categories: state.home.categories,
  filterVisible: state.home.filterVisible,
});

const mapDispatchToProps = dispatch => ({
  requestLocations: () => dispatch({ type: FETCH_LOCATIONS_REQUEST }),
  handleCheck: (target, value) => dispatch(setCategoryVisibility(target, value)),
  showFilter: () => dispatch(showFilter()),
  hideFilter: () => dispatch(hideFilter()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
