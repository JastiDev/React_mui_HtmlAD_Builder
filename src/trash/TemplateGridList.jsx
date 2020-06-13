import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';

import "./Grid.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
    height: '90vh',
    overflowY: 'auto'
  },
  gridList: {
    overflowY: 'auto'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export const TemplateGridList = ({ arrTemplate, handleClickTemplate }) => {
  const classes = useStyles();
  
  let scale = 0.25;



  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList}>
        {arrTemplate.map((tUrl, k) => (
          <GridListTile key={k}>
            <div className="wrap">
              <iframe src={tUrl}
                style={{'--myscale':scale}}
                className="frame" title="Preview"

              ></iframe>
              <button className="overlay" onClick={(e)=>handleClickTemplate(tUrl)}></button>
            </div>
          </GridListTile>
        ))}
      </GridList>
    
    </div>
  )
}
