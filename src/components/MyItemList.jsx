import React from 'react'
import { IconButton, Paper } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export const MyItemList = ({ arrItem, idTheItem, handleAddItem, handleRemoveItem, handleSelectItem}) => {

  return (
    <div style={{display:'flex', width:'100%'}}>
      <div>
        <IconButton
          style={{ color: 'blue', marginTop:'5px' }}
          onClick={handleAddItem}
        >
          <AddIcon />
        </IconButton>

        <IconButton
          color="secondary"
          style={{ marginTop: '5px' }}
          onClick={handleRemoveItem}
          disabled={idTheItem === null}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      
      <List component="nav" aria-label="main mailbox folders" style={{ flex: 1, display: 'flex', flexWrap:'wrap' }}>
        {arrItem.map((item, i) => {
          let isTheItem = idTheItem !== null && i === idTheItem;
          return (
            <Paper elevation={3}
              style={{ borderBottom: isTheItem ? '2px solid grey' : 'none' }}>
              <ListItem
                button key={i}
                selected={isTheItem}
                onClick={(event) => {
                  if (isTheItem) handleSelectItem(null);
                  else handleSelectItem(i);
                }}
              >
                <ListItemText primary={item.idStr} />
              </ListItem>
            </Paper>
          );
        }
        )}
      </List>

    </div>
  )
}
