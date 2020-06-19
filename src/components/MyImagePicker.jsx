import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import { Autocomplete } from "@material-ui/lab";

import * as common from '../common';
import { MyS3Uploader } from './MyS3Uploader';

const Img_Extensions = ["apng", "png", "bmp", "gif", "ico", "cur", "jpg", "jpeg", "jfif", "pjpeg", "pjp", "svg", "tif", "tiff", "webp"];


export const MyImagePicker = ({ isModal, handleToggle, theItem, handleChange, arrS3Img, handleUploadS3 }) => {
  const changeStyle = (strkey, value) => {
    if (!theItem) return;
    let tmp = JSON.parse(JSON.stringify(theItem));
    tmp.style[strkey] = value;
    handleChange(tmp);
  }

  return (
    <Dialog
      open={isModal}
      onClose={() => {
        handleToggle(false);
      }}
    >
      <DialogTitle>
        Image Picker
        <IconButton
          onClick={(e) => { handleToggle(false); }}
          style={{ position: 'absolute', top: 0, right: 0 }} >
          <CancelIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ margin: '10px 10px', height: '300px', width:'200px' }}>
          <strong style={{ color: "white", imgSize: 'small' }}>Images on S3 Server</strong>
          <div style={{ height:'250px'}}>
            {theItem && <Autocomplete
              size="small"
              options={arrS3Img}
              getOptionLabel={(option) => option}
              disableClearable
              autoHighlight
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="backgroundImage"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              )}
              defaultValue={common.img2url(theItem.style['backgroundImage'])}
              onChange={(e, value) => {
                changeStyle('backgroundImage', common.url2img(value));
              }}
              style={{ marginTop: '20px', display: 'inline-block' }}
              fullWidth
            />}

          </div>
          <div>
            <MyS3Uploader handleUploadS3={handleUploadS3} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
