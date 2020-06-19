import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

import { px2num } from '../common';
import FontPicker from "font-picker-react";
import * as common from '../common';

export const EditTheData = ({ theData, handleChangeTheData, handleSave }) => {
  const [dpiX, setDpiX] = useState(96);
  const [dpiY, setDpiY] = useState(96);

  const [winch, setWinch] = useState(2);
  const [hinch, setHinch] = useState(2);



  useEffect(() => { 
    let dpi_x = document.getElementById('testDPI').offsetWidth;
    let dpi_y = document.getElementById('testDPI').offsetHeight;
    setDpiX(dpi_x);
    setDpiY(dpi_y);
  }, []);

  useEffect(() => { 

  }, [theData]);

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
        value={theData.width/dpiX}
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
        value={theData.height/dpiY}
        onChange={(e) => {
          changeHeight(e.target.value * dpiY);
        }}
      />

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
