import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import styles from './PhotoList.css';

const PhotoList = props => (
  <GridList
    cellHeight={200}
    cols={props.rows}
    padding={8}
  >
    {props.photos.map(photo => (
      <GridTile
        key={photo.id}
        title={photo.caption}
        actionIcon={props.canDelete
          ? <IconButton onTouchTap={() => props.onClickDelete(photo.id)}>
            <ActionDelete color="white" />
          </IconButton>
          : null
        }
      >
        <img src={photo.url} role="presentation" />
      </GridTile>
    ))}
  </GridList>
);

PhotoList.propTypes = {
  photos: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    url: React.PropTypes.string,
    caption: React.PropTypes.string,
  })),
  rows: React.PropTypes.number,
  canDelete: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
};

PhotoList.defaultProps = {
  canDelete: false,
  rows: 3,
};

export default PhotoList;
