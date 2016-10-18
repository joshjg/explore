import React from 'react';
import cssModule from 'react-css-modules';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MediaQuery from 'react-responsive';

import styles from './FilterPanel.css';
import { categories } from '../../constants';

const FilterPanel = ({ values, onCheck, ...others }) => (
  <Paper {...others}>
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
};

export default FilterPanel; // cssModule(FilterPanel, styles);
