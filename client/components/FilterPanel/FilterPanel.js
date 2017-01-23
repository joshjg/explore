import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MediaQuery from 'react-responsive';

import styles from './FilterPanel.css';
import { categories } from '../../constants';

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

const FilterPanel = ({ values, onCheck, onClickClose, ...others }) => (
  <Paper {...others}>
    <div
      onClick={onClickClose}
      className={styles.close}
    >
      &times;
    </div>
    <List>
      <Subheader>Filter by category</Subheader>
      {categories.map(cat => (
        <ListItem
          key={cat}
          primaryText={cat}
          leftCheckbox={
            <Checkbox
              checked={values[cat]}
              onCheck={(e, isChecked) => onCheck(cat, isChecked)}
            />
          }
          rightIcon={
            <img
              src={markers[cat]}
              alt=""
            />
          }
        />
      ))}
    </List>
  </Paper>
);

// TODO
const ResponsiveFilterPanel = props => (
  <div>
    <MediaQuery minWidth={768}>
      <FilterPanel {...props} />
    </MediaQuery>
    <MediaQuery maxWidth={768}>
      <FloatingActionButton>
        <ActionSettings />
      </FloatingActionButton>
    </MediaQuery>
  </div>
);

FilterPanel.propTypes = {
  values: React.PropTypes.objectOf(React.PropTypes.bool),
  onCheck: React.PropTypes.func,
  onClickClose: React.PropTypes.func,
};

export default FilterPanel;
