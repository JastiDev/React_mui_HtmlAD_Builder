import React, { useState, useEffect } from "react";
import { Paper, Button, TextField, IconButton } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CloseIcon from "@material-ui/icons/Close";

import { MyCanvas } from "./MyCanvas";
import * as common from "../funcs/common";

export const MyTemplateTile = ({
  arrTemplate,
  selAdContent,
  handleTryData,
  handleRemoveTemplate,
}) => {
  const [theI, setTheI] = useState(null);

  const [isTry, setIsTry] = useState(false);
  const [arrText, setArrText] = useState([]);

  // const [arrImg, setArrImg] = useState([]);

  const [selH, setSelH] = useState(0);
  const [selW, setSelW] = useState(0);

  const handleSelectTemplate = () => {
    if (selAdContent) {
      console.log("selAdContent height : " + selAdContent.height);
      console.log("selAdContent width : " + selAdContent.width);
      let adTextContent = selAdContent.adContent;
      setArrText(adTextContent);
      setSelH(selAdContent.height);
      setSelW(selAdContent.width);

      let newData = common.make_the_data(
        selAdContent.width * common.dpiX,
        selAdContent.height * common.dpiY
      );

      handleTryData(newData);

      setIsTry(true);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(handleSelectTemplate, [selAdContent]);

  const changeWidth = (data, width) => {
    if (width === 0) return;

    data.arrItem.forEach((item, i) => {
      let ratio = 0;
      if (data.width !== 0) {
        ratio = width / data.width;
      }

      item.style.width = common.px2num(item.style.width) * ratio + "px";
      item.style.left = common.px2num(item.style.left) * ratio + "px";
      item.style.paddingLeft =
        common.px2num(item.style.paddingLeft) * ratio + "px";
      item.style.paddingRight =
        common.px2num(item.style.paddingRight) * ratio + "px";
      item.style.fontSize = common.px2num(item.style.fontSize) * ratio + "px";
    });
    data.width = width;
  };
  const changeHeight = (data, height) => {
    if (height === 0) return;

    data.arrItem.forEach((item, i) => {
      let ratio = 0;
      if (data.height !== 0) {
        ratio = height / data.height;
      }

      item.style.height = common.px2num(item.style.height) * ratio + "px";
      item.style.top = common.px2num(item.style.top) * ratio + "px";
      item.style.paddingTop =
        common.px2num(item.style.paddingTop) * ratio + "px";
      item.style.paddingBottom =
        common.px2num(item.style.paddingBottom) * ratio + "px";
    });

    data.height = height;
  };

  const changeText = (i, text) => {
    setArrText((arrText) => {
      let len = arrText.length;
      let newArr = [...arrText.slice(0, i), text, ...arrText.slice(i + 1, len)];

      if (isTry && theI !== null) {
        let data = JSON.parse(arrTemplate[theI].adContent);
        let newData = JSON.parse(JSON.stringify(data));
        let k = 0;
        newData.arrItem.forEach((item) => {
          if (item.text && item.text !== "" && k < newArr.length) {
            item.text = newArr[k];
            k++;
          }
        });

        changeWidth(newData, selW * common.dpiX);
        changeHeight(newData, selH * common.dpiY);

        handleTryData(newData);
      }

      return newArr;
    });
  };

  const addText = () => {
    setArrText((arrText) => [...arrText, ""]);
  };

  const removeText = () => {
    setArrText((arrText) => [...arrText.slice(0, arrText.length - 1)]);
  };

  const handleClickPreview = (i, data) => {
    setTheI(i);

    if (isTry) {
      let newData = JSON.parse(JSON.stringify(data));

      let k = 0;
      newData.arrItem.forEach((item) => {
        if (item.text && item.text !== "" && k < arrText.length) {
          item.text = arrText[k];
          k++;
        }
      });

      changeWidth(newData, selW * common.dpiX);
      changeHeight(newData, selH * common.dpiY);

      //changeFontSize(newData, selW * common.dpiX, selH * common.dpiY);

      handleTryData(newData);
    } else {
      handleTryData(data);
    }
  };

  const toggleTry = () => {
    if (!isTry && theI !== null) {
      let arrText = [];
      let data = JSON.parse(arrTemplate[theI].adContent);

      data.arrItem.forEach((item) => {
        if (item.text && item.text !== "") {
          arrText.push(item.text);
        }
      });

      setArrText(arrText);
    }

    setIsTry((isTry) => !isTry);
  };

  return (
    <div>
      <div style={{ height: "60vh", overflowY: "auto" }}>
        {arrTemplate.map((tt, i) => {
          let data = JSON.parse(tt.adContent);
          return (
            <MyPreview
              key={tt.id}
              data={data}
              handleClick={() => handleClickPreview(i, data)}
              isTheI={theI === i}
              handleRemove={() => handleRemoveTemplate(tt, i)}
            />
          );
        })}
      </div>
      <div style={{ height: "40vh", overflowY: "auto", margin: "5px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="default"
            size="small"
            startIcon={isTry ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            onClick={(e) => toggleTry()}
          >
            Try With My Content
          </Button>
        </div>

        <div style={{ display: isTry ? "block" : "none" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => addText()}>+</button>
            <button onClick={() => removeText()}>-</button>
          </div>

          {arrText.map((textTry, i) => {
            return (
              <TextField
                key={i}
                label={"" + i}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginTop: "10px" }}
                value={textTry}
                onChange={(e) => changeText(i, e.target.value)}
              />
            );
          })}

          {/* {arrImg.map((imgTry, i) => {
            let url = `url(${imgTry})`;
            return <img key={i} src={url} alt="img" />;
          })} */}
        </div>
      </div>
    </div>
  );
};

const MyPreview = ({ data, handleClick, isTheI, handleRemove }) => {
  let WH = 150;
  if (data.width === 0 || data.height === 0) return null;
  let zoomRatio = Math.min(WH / data.width, WH / data.height);

  let width = data.width * zoomRatio;
  let height = data.height * zoomRatio;
  let transform = `translate(-${(1 - zoomRatio) * 50}%, -${
    (1 - zoomRatio) * 50
  }%) scale(${zoomRatio})`;

  return (
    <div style={{ margin: "5px auto" }}>
      <IconButton
        style={{
          zIndex: 5000,
          float: "left",
          marginTop: 0,
          position: "relative",
          top: "4px",
        }}
        color="default"
        onClick={handleRemove}
      >
        <CloseIcon />
      </IconButton>

      <Paper
        elevation={9}
        style={{
          width,
          height,
          margin: "0px 20px",
          display: "inline-block",
          border: isTheI ? "3px dotted green" : "3px dotted transparent",
        }}
      >
        <div style={{ transform }} onClick={handleClick}>
          <MyCanvas
            theData={data}
            handleChangeTheItem={() => {}}
            idTheItem={null}
            handleSelectItem={() => {}}
          />
        </div>
      </Paper>
    </div>
  );
};
