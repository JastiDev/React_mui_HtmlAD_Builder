import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const EditableItems = ({ arrItem, handleSelect, handleUnSelect, theItem }) => {
  return (
    <List component="nav" aria-label="main mailbox folders">
      {arrItem.map((item, i) => (
        <ListItem
          button key={i}
          selected={theItem && item.id === theItem.id}
          onClick={(event) => { 
            if (theItem && item.id === theItem.id) handleUnSelect(item);
            else handleSelect(item);
          }}
        >
          <ListItemText primary={item.idStr} />
        </ListItem>
      ))}
    </List>
  );
}
