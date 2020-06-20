import React, { useState, useEffect, useRef } from 'react';
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

  useEffect(() => { 

  }, [theData]);

  const changeWidth = (width) => {
    if (width === 0) return;
    let data = JSON.parse(JSON.stringify(theData));
    data.width = width;

    data.arrItem.forEach((item, i) => {
      let ratio = 0;
      if (theData.width !== 0) {
        ratio = width / theData.width;
      }
      item.style.width = px2num(item.style.width) * ratio + 'px';
      item.style.left = px2num(item.style.left) * ratio + 'px';
      item.style.paddingLeft = px2num(item.style.paddingLeft) * ratio + 'px';
      item.style.paddingRight = px2num(item.style.paddingRight) * ratio + 'px';
    });
    

    handleChangeTheData(data);
  }
  const changeHeight = (height) => {
    if (height === 0) return;
    let data = JSON.parse(JSON.stringify(theData));
    data.height = height;

    data.arrItem.forEach((item, i) => {
      let ratio = 0;
      if (theData.height !== 0) {
        ratio = height / theData.height;
      }
      item.style.height = px2num(item.style.height) * ratio + 'px';
      item.style.top = px2num(item.style.top) * ratio + 'px';
      item.style.paddingTop = px2num(item.style.paddingTop) * ratio + 'px';
      item.style.paddingBottom = px2num(item.style.paddingBottom) * ratio + 'px';
    });


    handleChangeTheData(data);
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
