import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

import { px2num } from '../common';
import FontPicker from "font-picker-react";
import * as common from '../common';

export const EditTheData = ({ theData, handleChangeTheData, handleSave }) => {
  const [dpiX, setDpiX] = useState(96);
  const [dpiY, setDpiY] = useState(96);

  useEffect(() => { 
    let dpi_x = document.getElementById('testDPI').offsetWidth;
    let dpi_y = document.getElementById('testDPI').offsetHeight;
    setDpiX(dpi_x);
    setDpiY(dpi_y);
  }, []);

  const changeWidth = (width) => {
    handleChangeTheData({ ...theData, width });
  }
  const changeHeight = (height) => {
    handleChangeTheData({ ...theData, height });
  }
  const onChangeTitle = (e) => { 
    let title = e.target.value;
    handleChangeTheData({ ...theData, title });
  };

  return (
    <div>
      <DivTestDPI />
      <TextField
        size="small"
        label="Template title"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "150px", margin: '10px 10px' }}
        value={theData.title}
        onChange={onChangeTitle}
      />

      <TextField
        label={`Width (${dpiX}dpi)`}
        type="number" size="small"
        inputProps={{ min: "0", step: "0.1" }}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "120px", margin: "10px 10px" }}
        defaultValue={Math.floor((theData.width * 10) / dpiX) / 10}
        onChange={(e) => {
          changeWidth(e.target.value * dpiX);
        }}
      />
      <TextField
        label={`Height (${dpiY}dpi)`}
        type="number" size="small"
        inputProps={{ min: "0", step: "0.1" }}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "120px", margin: "10px 10px" }}
        defaultValue={Math.floor((theData.height * 10) / dpiY) / 10}
        onChange={(e) => {
          changeHeight(e.target.value * dpiY);
        }}
      />

      
      {/* <TextField
        label="width"
        type="number"
        variant="outlined"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "120px", margin: "10px 10px" }}
        value={px2num(theData.width)}
        onChange={onChangeWidth}
      />
      <TextField
        label="height"
        type="number"
        variant="outlined"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "120px", margin: "10px 10px" }}
        value={px2num(theData.height)}
        onChange={onChangeHeight}
      /> */}

      {/* <IconButton
        color="primary"
        style={{ marginTop:'5px' }}
        onClick={handleSave}
      >
        <SaveIcon />
      </IconButton>  */}

      <div style={{display:'none'}}>
        <FontPicker
          apiKey={common.MY_GOOGLE_API_KEY}
          limit={500} />
      </div>
    </div>
  );
}



const DivTestDPI = () => (
  <div
    id="testDPI"
    style={{
      height: "1in",
      width: "1in",
      position: "absolute",
      left: "-100%",
      top: "-100%",
    }}
  ></div>
);
