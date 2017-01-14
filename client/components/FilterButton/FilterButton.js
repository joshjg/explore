import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SvgIcon from 'material-ui/SvgIcon';
import styles from './FilterButton.css';
import filterIcon from '../../assets/filter.svg';

const FilterButton = ({ onClick }) => (
  <FloatingActionButton
    onClick={onClick}
    className={styles.root}
  >
    <img
      src={filterIcon}
      alt="Toggle filter menu"
      className={styles.icon}
    />
  </FloatingActionButton>
);

FilterButton.propTypes = {
  onClick: React.PropTypes.func,
};

export default FilterButton;
