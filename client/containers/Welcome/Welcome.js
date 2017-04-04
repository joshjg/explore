import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { toggleActive } from '../App/actions';
import logo from '../../assets/explore_logo_alt5.svg';

// WELCOME TEXT v1.0
const Welcome = ({ closeDialog }) => (
  <Dialog
    open
    title="Welcome!"
    autoScrollBodyContent
    modal={false}
    onRequestClose={() => {
      Cookies.set('welcomeRead', '1.0');
      closeDialog();
    }}
    actions={[
      <FlatButton
        label="Continue"
        // primary
        onTouchTap={() => {
          Cookies.set('welcomeRead', '1.0');
          closeDialog();
        }}
      />,
    ]}
  >
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
      <img src={logo} style={{ height: '200px' }} alt="logo" />
    </div>
    <p>
      Have you ever crossed the Potomac on White’s Ferry from Virginia to Maryland? If so, you were crossing into Montgomery County’s Agricultural Reserve. Has your family hiked to the summit of Sugarloaf Mountain and marveled over the patchwork of red barns, farm fields and woodlands down below? You were gazing down on the Agricultural Reserve. Have you visited the historic community of Brookeville, where President James Madison spent the night when the British occupied Washington in 1814? It’s in the Ag Reserve.
    </p>
    <p>
      You may have driven through the countryside to Peach Tree Road near Barnesville for fresh peaches. The peach orchards along the road, with their pink blossoms and irresistible summer fruit, lie within the heart of the Reserve. You may also have visited the pumpkin patch, cut a live Christmas tree, or gone horseback riding on one of the rustic trails winding through the Reserve. And if you have stopped by one of the County’s many farmers markets on a Saturday morning for ripe tomatoes and summer squash, chances are those fresh vegetables were grown by farmers living and working within the Ag Reserve.
    </p>
    <p>
      The Agricultural Reserve is a nationally acclaimed land-use plan that was established in 1980 in response to the rapid disappearance of Montgomery County farms. Learn more: <a href="http://www.mocoalliance.org">mocoalliance.org</a>
    </p>
  </Dialog>
);

Welcome.propTypes = {
  closeDialog: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  closeDialog: () => dispatch(toggleActive('welcome')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
