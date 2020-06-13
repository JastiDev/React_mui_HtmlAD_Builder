import React, { useState, useEffect } from 'react';
import { Button,IconButton } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as http from "../http";
import * as common from '../common';

const STATUS_INIT = 0;
const STATUS_LOADING = 1;
const STATUS_SUCCESS = 2;
const STATUS_FAILED = 3;

export const MyS3Uploader = ({handleReadS3}) => {

  const [status, setStatus] = useState(STATUS_INIT);

  useEffect(() => {
    readS3();
  }, []);
  
  const readS3 = () => { 
    setStatus(STATUS_LOADING);
    http.readS3().then(resp => {
      let arr = resp.data;
      arr.splice(0, 1);
      handleReadS3(arr);
      setStatus(STATUS_SUCCESS);
    }).catch(err => {
      console.log(err);
      setStatus(STATUS_FAILED);
    });
  };

  const onClickUpload = (e) => { 
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = async (e) => {
      if (e.target.files.length === 0) return;
      let file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      setStatus(STATUS_LOADING);
      try {
        let resp = await http.uploadToS3(formData);
        setStatus(STATUS_SUCCESS);
      } catch (err) {
        console.log(err);
        setStatus(STATUS_FAILED);
      }
      readS3();
    }
    fileSelector.click();
  }

  return (
      <Button
        variant="outlined"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={onClickUpload}
        disabled={status !== STATUS_SUCCESS}
        fullWidth >
        Upload To S3
      </Button>
  );
}
