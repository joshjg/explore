import React from 'react';
import cssModule from 'react-css-modules';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router';
import styles from './Marker.css';

import animals from '../../assets/markers/animals.svg';
import art from '../../assets/markers/art.svg';
import csa from '../../assets/markers/csa.svg';
import food from '../../assets/markers/food.svg';
import history from '../../assets/markers/history.svg';
import lodging from '../../assets/markers/lodging.svg';
import outdoors from '../../assets/markers/outdoors.svg';
import pickyourown from '../../assets/markers/pick-your-own.svg';
import plants from '../../assets/markers/plants.svg';
import produce from '../../assets/markers/produce.svg';
import shopping from '../../assets/markers/shopping.svg';
import vineyard from '../../assets/markers/vineyard.svg';

const markers = {
  animals,
  art,
  csa,
  food,
  history,
  lodging,
  outdoors,
  'pick-your-own': pickyourown,
  plants,
  produce,
  shopping,
  vineyard,
};

const Marker = props => (
  <div styleName="root">
    {props.tooltip && props.location
      ? <span>
        <Link to={`/locations/${props.location.id}`}>
          <img
            src={markers[props.category]}
            styleName="marker"
            alt="marker"
            data-tip
            data-for={props.location ? props.location.id.toString() : null}
          />
        </Link>
        <ReactTooltip
          id={props.location.id.toString()}
          effect="solid"
        >
          <h3>{props.location.name}</h3>
          <p>{props.location.description}</p>
        </ReactTooltip>
      </span>
      : <img src={markers[props.category]} styleName="marker" alt="marker" />
    }
  </div>
);

Marker.propTypes = {
  category: React.PropTypes.string,
  tooltip: React.PropTypes.bool,
  location: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
  }),
};

Marker.defaultProps = {
  category: 'produce',
  tooltip: false,
};

export default cssModule(Marker, styles);
