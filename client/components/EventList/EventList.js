import React from 'react';
import cssModule from 'react-css-modules';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import styles from './EventList.css';

const EventList = props => (
  <List>
    <Subheader>Upcoming events</Subheader>
    {props.events.map((event) => {
      const date = new Date(event.date);
      const timeStart = event.timeStart ? new Date(event.timeStart) : null;
      const hrStart = timeStart ? timeStart.getHours() : null;
      const minStart = timeStart ? timeStart.getMinutes() : null;
      const timeEnd = event.timeEnd ? new Date(event.timeEnd) : null;
      const hrEnd = timeEnd ? timeEnd.getHours() : null;
      const minEnd = timeEnd ? timeEnd.getMinutes() : null;

      return (
        <ListItem
          key={event.id}
          disabled
          primaryText={event.name}
          secondaryText={
            <p>
              <span style={{ color: 'black' }}>
                {date.toDateString()}
                {(timeStart || timeEnd) ? ' -' : null}
                {hrStart && (hrStart < 12
                  ? ` ${hrStart || 12}:${minStart} am`
                  : ` ${hrStart - 12}:${minStart} pm`)
                }
                {hrEnd && (hrEnd < 12
                  ? ` to ${hrEnd || 12}:${minEnd} am`
                  : ` to ${hrEnd - 12}:${minEnd} pm`)
                }
              </span>
              <span> &mdash; </span>
              {event.description}
            </p>
          }
          secondaryTextLines={2}
          rightIconButton={props.canDelete
            ? <IconButton onTouchTap={() => props.onClickDelete(event.id)}>
              <ActionDelete />
            </IconButton>
            : null
          }
        />
      );
    })}
  </List>
);

EventList.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    date: React.PropTypes.integer,
    timeStart: React.PropTypes.integer,
    timeEnd: React.PropTypes.integer,
  })),
  canDelete: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
};

EventList.defaultProps = {
  canDelete: false,
};

export default cssModule(EventList, styles);
