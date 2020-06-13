import React, { useState, useEffect } from 'react';
import FontPicker from "font-picker-react";
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';

import * as common from '../common';
import { MyS3Uploader } from './MyS3Uploader';


export const MyFontPicker = ({ isModal, theItem, handleChange, handleToggle, arrS3Font, handleUploadS3 }) => {
  const changeStyle = (strkey, value) => {
    if (!theItem) return;
    let tmp = JSON.parse(JSON.stringify(theItem));

    if (strkey === "useCustomFont") {
      // tmp.style["fontFamily"] = "";
      tmp.style["customFontURL"] = "";
    }
    else if (strkey === "customFontURL") { //this is the trick, not css
      let url = value;
      let family = common.url2family(url);
      if (!family || family.length === 0) return;
      let junction_font = new FontFace(family, `url(${url})`);
      junction_font
        .load()
        .then((loaded_face) => {
          document.fonts.add(loaded_face);
        })
        .catch((err) => console.log(err));

      tmp.style["fontFamily"] = family;
    }

    tmp.style[strkey] = value;
    handleChange(tmp);
  }

  const onClickUseCustom = () => {
    if (!theItem) return;
    changeStyle("useCustomFont", !theItem.style["useCustomFont"]);
  }

  return (
    <Dialog
      open={isModal}
      onClose={() => {
        handleToggle(false);
      }}
    >
      <DialogTitle>
        Font Picker
        <IconButton
          onClick={(e) => { handleToggle(false); }}
          style={{ position: 'absolute', top: 0, right: 0 }} >
          <CancelIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <div style={{ margin: '10px', height: '300px', width:'200px' }}>
          {theItem &&
            <div>
              <div>
                <Button
                  variant="text"
                  color="default"
                  size="small"
                  startIcon={theItem.style.useCustomFont ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  onClick={onClickUseCustom}
                >
                  Use custom font</Button>
              </div>
            </div>
          }

          <div style={{ display: theItem && !theItem.style.useCustomFont ? 'block' : 'none', marginTop: '10px' }}>
            <strong style={{ fontSize: 'small' }}>Google Font</strong>
            <div style={{marginTop:'20px'}}>
              <FontPicker
                apiKey={common.MY_GOOGLE_API_KEY}
                limit={500}
                activeFontFamily={theItem && !theItem.style.useCustomFont ? theItem.style["fontFamily"] : "Open Sans"}
                onChange={(nextFont) => {
                  changeStyle("fontFamily", nextFont.family);
                }}
              />
            </div>
          </div>

          {theItem && theItem.style.useCustomFont &&
            <div style={{marginTop:'10px'}}>
              <strong style={{ fontSize: 'small' }}>Custom Font on S3 Server</strong>
              <div style={{ height: '200px' }}>

                <Autocomplete
                  size="small"
                  options={arrS3Font}
                  getOptionLabel={(option) => option}
                  disableClearable
                  autoHighlight
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="fontFamily"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                  defaultValue={theItem.style['fontFamily']}
                  onChange={(e, value) => { 
                    changeStyle('customFontURL', value);
                  }}
                  style={{ marginTop:'20px', display: 'inline-block' }}
                  fullWidth
                />

              </div>
              <div>
                <MyS3Uploader handleUploadS3={handleUploadS3} />
              </div>
            </div>
          }
        </div>

      </DialogContent>
    </Dialog>
  )
}
