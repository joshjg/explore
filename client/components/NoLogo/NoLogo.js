import React from 'react';
import cssModule from 'react-css-modules';
import styles from './NoLogo.css';

const NoLogo = () => (
  <div styleName="root">
    no logo
  </div>
);

NoLogo.propTypes = {

};

export default cssModule(NoLogo, styles);
