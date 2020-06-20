import React, { useState } from 'react'
import { Paper, Button, TextField, IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';

import { MyCanvas } from './MyCanvas';
import * as http from '../http';

export const MyTemplateTile = ({ arrTemplate, handleTryData, handleRemoveTemplate }) => {
  const [theI, setTheI] = useState(null);

  const [isTry, setIsTry] = useState(false);
  const [arrText, setArrText] = useState([]);
  const [arrImg, setArrImg] = useState([]);

  const changeText = (i, text) => {
    setArrText(arrText => {
      let len = arrText.length;
      let newArr = [...arrText.slice(0, i), text, ...arrText.slice(i + 1, len)];

      if (isTry && theI !== null) { 
        let data = JSON.parse(arrTemplate[theI].adContent);;
        let newData = JSON.parse(JSON.stringify(data));
        let k = 0;
        newData.arrItem.forEach((item) => {
          if (item.text && item.text !== "" && k < newArr.length) {
            item.text = newArr[k];
            k++;
          }
        });
        handleTryData(newData);
      }

      return newArr;
    });


  }

  const addText = () => {
    setArrText(arrText => ([...arrText, ""]));
  }

  const removeText = () => {
    setArrText(arrText => ([...arrText.slice(0, arrText.length - 1)]));
  }

  const handleClickPreview = (i, data) => {
    setTheI(i);

    if (isTry) {
      let newData = JSON.parse(JSON.stringify(data));
      let k = 0;
      newData.arrItem.forEach((item) => {
        if (item.text && item.text !== "" && k<arrText.length) {
          item.text = arrText[k];
          k++;
        }
      });
      handleTryData(newData);
    } else { 
      handleTryData(data);
    }

  }

  const toggleTry = () => {
    if (!isTry && theI !== null) { 
      let arrText = [];
      let data = JSON.parse(arrTemplate[theI].adContent); ;

      data.arrItem.forEach((item) => {
        if (item.text && item.text !== "" ) {
          arrText.push(item.text);
        }
      });

      setArrText(arrText);
    }

    setIsTry(isTry => !isTry);
  }

  return (
    <div>
      <div style={{ height: '70vh', overflowY: 'auto' }}>
        {arrTemplate.map((tt, i) => {
          let data = JSON.parse(tt.adContent);
          return (
            <MyPreview key={tt.id}
              data={data}
              handleClick={() => handleClickPreview(i, data)}
              isTheI={theI === i}
              handleRemove={() => handleRemoveTemplate(tt, i)}/>
          );
        })}
      </div>
      <div style={{ height: '30vh', overflowY: 'auto' }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="default"
            size="small"
            startIcon={isTry ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            onClick={(e) => toggleTry()}>
            Try With My Content</Button>
        </div>

        <div style={{ display: isTry ? 'block' : 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => addText()}>+</button>
            <button onClick={() => removeText()}>-</button>
          </div>

          {arrText.map((textTry, i) => {

            return (
              <TextField
                key={i}
                label={""+i} fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginTop: "10px" }}
                value={textTry}
                onChange={(e) => changeText(i, e.target.value)} />);
          })}

          {arrImg.map((imgTry, i) => {
            let url = `url(${imgTry})`;
            return (
              <img key={i} src={url} alt="img" />
            );
          })}
        </div>
      </div>
    </div>
  )
}


const MyPreview = ({ data, handleClick, isTheI, handleRemove }) => { 
  let WH = 150;
  if (data.width === 0 || data.height === 0) return null;
  let zoomRatio = Math.min(WH / data.width, WH / data.height);

  let width = data.width * zoomRatio;
  let height = data.height * zoomRatio;
  let transform = `translate(-${(1 - zoomRatio) * 50}%, -${(1 - zoomRatio) * 50}%) scale(${zoomRatio})`;

  return (
    <div>
      <IconButton style={{ zIndex: 5000, float: 'left', marginTop: height / 4 }}
        color="default"
        onClick={handleRemove}
      >
        <CloseIcon />
      </IconButton>

      <Paper elevation={9} style={{
        width, height,
        margin: '20px 20px', display: 'inline-block',
        border: (isTheI) ? '3px dotted green' : '3px dotted transparent'
      }} >

        <div style={{ transform }}
          onClick={handleClick}>
          <MyCanvas theData={data}
            handleChangeTheItem={() => { }}
            idTheItem={null}
            handleSelectItem={() => { }} />
        </div>
      </Paper>
    
    </div>
  );
}