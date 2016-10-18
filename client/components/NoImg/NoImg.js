import React from 'react';
import cssModule from 'react-css-modules';
import styles from './NoImg.css';

const NoImg = () => (
  <div styleName="root">
    no photo
  </div>
);

NoImg.propTypes = {

};

export default cssModule(NoImg, styles);
