import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton } from "@material-ui/core";

import { DPI0, W0, H0, newId, px2num, make_Item_0, url2family, parseImportedHtmlToJson } from '../common';

import { Base } from './components/Base';
import { EditableItems } from './components/EditableItems';
import { EditTheItem } from './components/EditTheItem';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

export const PageEdit = ({ arrS3File }) => {
  const [width, setWidth] = useState(W0);
  const [height, setHeight] = useState(H0);
  const [dpiX, setDpiX] = useState(DPI0);
  const [dpiY, setDpiY] = useState(DPI0);

  const [arrItem, setArrItem] = useState([]);
  const [theItem, setTheItem] = useState();

  useEffect(() => {
    let dpi_x = document.getElementById('testDPI').offsetWidth;
    let dpi_y = document.getElementById('testDPI').offsetHeight;
    setDpiX(dpi_x);
    setDpiY(dpi_y);
  }, []);

  const onClickImport = (e) => { 
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = (e) => { 
      if (e.target.files.length === 0) return;  
      let file = e.target.files[0];

      const fr = new FileReader();
      fr.onloadend = (event) => {
        let text = event.target.result;
        let arrItem = parseImportedHtmlToJson(text);
        setArrItem(arrItem);
      };
      fr.readAsText(file);
    }
    fileSelector.click();
  }

  const makeExportHtml = () => {
    let strFontLink = "";
    let strStyleSheet = "";
    arrItem.forEach(item => { 
      if (item.style['useCustomFont']) {
        let url = item.style['customFontURL'];
        let family = url2family(url);

        strStyleSheet += `
        <style tyle="text/css">
        @font-face {
          font-family: '${family}';
          src: url('${url}');
        }
        </style>
        `;
      } else {
        let fontFamily = item.style["fontFamily"] || "Droid Sans";
        fontFamily = fontFamily.replace(" ", "+");
        strFontLink += `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=${fontFamily}"></link>`;
      }
    });

    let strContent = document.getElementById("exposable_container").innerHTML;
    let exportHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style type="text/css">
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
              monospace;
          }
        </style>
        ${strStyleSheet}
        ${strFontLink}
      </head>
      <body>
        <div style="display:none;">
          <myprojectjson>
            ${JSON.stringify(arrItem)}
          </myprojectjson>
        </div>
        ${strContent}
      </body>
      </html>`;
    
    return exportHtml;
  }

  const onClickSave = (e) => { 
    let exportHtml = makeExportHtml();

    let dataType = "text/html";
    let filename = "project.html";
    let downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    if (window.navigator.msSaveOrOpenBlob) {
      let blob = new Blob(["\ufeff", exportHtml], {
        type: dataType,
      });
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = "data:" + dataType + ", " + exportHtml;
      downloadLink.download = filename;
      downloadLink.click();
    }

    // saveJSON();
  }

  // const saveJSON = () => { 
  //   let downloadLink = document.createElement('a');
  //   document.body.appendChild(downloadLink);
  //   downloadLink.href = "data:text/plain," + JSON.stringify(arrItem);
  //   downloadLink.download = "project.json";
  //   downloadLink.click();
  // }

  const onClickSaveAsPDF = (event) => { 
    let exportHtml = makeExportHtml();

    let newWindow = window.open("", "", "width=1000, height=600");
    let doc = newWindow.document.open();
    doc.write(exportHtml);
    doc.close();

    let timerId = setInterval(() => {
      newWindow.print();
      clearInterval(timerId);
      newWindow.close();
    }, 1000);
  };

  const onClickAdd = (e) => {
    let newItem;
    if (theItem) {
      newItem = JSON.parse(JSON.stringify(theItem));
      newItem.id = newId();
      newItem.idStr = `div_${newItem.id}`;
      newItem.style.top = (px2num(newItem.style.top) + px2num(newItem.style.height)) + 'px';
    } else {
      newItem = make_Item_0(newId(), width, height / 3, width / 10);
    }

    setArrItem(arrItem => [...arrItem, newItem]);
    setTheItem(newItem);
  }

  const onClickRemove = (e) => { 
    if (theItem && window.confirm("Remove this Div?")) {
      let k = arrItem.findIndex(item => item.id === theItem.id);
      if (k > -1) {
        setTheItem(null);
        setArrItem(arrItem => [...arrItem.slice(0, k), ...arrItem.slice(k + 1, arrItem.length)]);
      }
    }
  }

  const handleChangeTheItem = (newItem) => {

    setTheItem(newItem);

    setArrItem((arrItem) => {
      let k = arrItem.findIndex((item) => item.id === newItem.id);
      if (k === -1) return arrItem;
      let newArr = [...arrItem.slice(0, k), newItem, ...arrItem.slice(k + 1, arrItem.length)];
      return newArr;
    });
  }

  return (
    <div style={{height:'100%', display: 'flex', flexDirection: 'column'}}>
      <DivTestDPI />
{/*       
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          border: '1px solid grey',
          padding:'10px 5px'
        }}
      >


        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<FolderOpenIcon />}
          onClick={onClickImport}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={onClickSave}
          style={{ marginLeft: "50px" }}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={onClickSaveAsPDF}
          style={{ marginLeft: "50px" }}
        >
          PDF
        </Button>

        <div style={{ flex: 1 }}></div>
        
        <div>
          <TextField
            label={`Width (${dpiX}dpi)`}
            type="number"
            inputProps={{ min: "0", step: "0.1" }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "120px", margin: "5px 5px" }}
            defaultValue={Math.floor((width * 10) / dpiX) / 10}
            onChange={(e) => {
              setWidth(e.target.value * dpiX);
            }}
          />
          <TextField
            label={`Height (${dpiY}dpi)`}
            type="number"
            inputProps={{ min: "0", step: "0.1" }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "120px", margin: "5px 5px" }}
            defaultValue={Math.floor((height * 10) / dpiY) / 10}
            onChange={(e) => {
              setHeight(e.target.value * dpiY);
            }}
          />

        </div>

      </div>

      <hr /> */}

      <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>


        <div
          style={{
            flex: 1,
            padding: "20px 20px",
            backgroundColor: "grey",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <Base
            width={width}
            height={height}
            arrItem={arrItem}
            theItem={theItem}
            handleClick={(arrItemClicked) =>
              setTheItem(arrItemClicked.length > 0 ? arrItemClicked[0] : null)
            }
            handleChangeTheItem={handleChangeTheItem}
          />
        </div>

        <div
          style={{
            width: "150px",
            border: "1px dotted grey",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <IconButton aria-label="delete" color="primary" onClick={onClickAdd}>
            <AddIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={onClickRemove}
            disabled={!theItem}
          >
            <DeleteIcon />
          </IconButton>

          <EditableItems
            arrItem={arrItem}
            handleSelect={(item) => setTheItem(item)}
            handleUnSelect={(item) => setTheItem(null)}
            theItem={theItem}
          />
        </div>


        <div
          style={{
            flex: 1,
            padding: "10px 10px",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          {theItem && (
            <EditTheItem theItem={theItem} handleChange={handleChangeTheItem} arrS3File={arrS3File}/>
          )}
        </div>
      
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
