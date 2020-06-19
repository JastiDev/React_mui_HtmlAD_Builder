import React, { useState } from 'react'
import { SketchPicker } from "react-color";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import PaletteIcon from "@material-ui/icons/Palette";
import CancelIcon from '@material-ui/icons/Cancel';

import { px2num, url2family } from "../common";

export const EditTheItem = ({ theItem, handleChange, handlePickFont, handlePickImg }) => {

  const [isModal, setIsModal] = useState(false);
  const [editingColor, setEditingColor] = useState('color');

  const changeIdStr = (idStr) => {
    let tmp = JSON.parse(JSON.stringify(theItem));
    tmp.idStr = idStr;
    handleChange(tmp);
  }

  const changeText = (text) => {
    let tmp = JSON.parse(JSON.stringify(theItem));
    tmp.text = text;
    handleChange(tmp);
  }

  const changeStyle = (strkey, value) => {
    let tmp = JSON.parse(JSON.stringify(theItem));

    if (strkey === 'textAlignVertical') {  //this is the trick, not css
      let hDiv = px2num(tmp.style['height']);
      let hFont = px2num(tmp.style['fontSize']);
      if (value === 'none') tmp.style['paddingTop'] = 0 + 'px';
      else if (value === 'top') tmp.style['paddingTop'] = 0 + 'px';
      else if (value === 'center') { tmp.style['paddingTop'] = (hDiv - hFont) / 2 + 'px';}
      else if (value === 'bottom') tmp.style['paddingTop'] = hDiv-hFont + 'px';
    }
    else if (strkey === 'paddingTop' || strkey === 'height') {
      tmp.style['textAlignVertical'] = 'none';
    }
    else if (strkey === "useCustomFont") {
      tmp.style["fontFamily"] = "";
      tmp.style["customFontURL"] = "";
    }
    else if (strkey === "customFontURL") { //this is the trick, not css
      let url = value;
      let family = url2family(url);
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

  // const onChangeImage = (e) => {
  //   if (e.target.files.length > 0) {
  //     let file = e.target.files[0];
  //     const fr = new FileReader();
  //     fr.onloadend = (e) => {
  //       let buf = e.target.result;
  //       changeStyle("backgroundImage", url2img(buf));
  //     };
  //     fr.readAsDataURL(file);
  //   } else {
  //     changeStyle('backgroundImage', "" );
  //   }
  // };

  // const MyInputText = (strkey, width="120px") => (
  //   <TextField
  //     label={strkey}
  //     variant="outlined"
  //     InputLabelProps={{
  //       shrink: true,
  //     }}
  //     style={{ width: width, margin: "10px 10px" }}
  //     value={theItem.style[strkey] || ""}
  //     onChange={(e) => changeStyle(strkey, e.target.value)}
  //   />
  // );

  const MyInputNumber = (strkey) => (
    <TextField
      label={strkey}
      type="number"
      variant="outlined"
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      style={{ width: "120px", margin: "10px 10px" }}
      value={px2num(theItem.style[strkey])}
      onChange={(e) => changeStyle(strkey, e.target.value + "px" )}
    />
  );

  const MyInputSelect = (strkey, width="150px") => (
    <Autocomplete
      size="small"
      options={Arr_Option[strkey]}
      getOptionLabel={(option) => option}
      disableClearable
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label={strkey}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      )}
      value={theItem.style[strkey]}
      onChange={(e, value) => changeStyle(strkey, value)}
      style={{ width: width, margin: "10px 10px",  display:'inline-block'}}
    />
  );

  const MyInputColor = (strkey) => (
    <div style={{ display: "inline-block", margin: "10px 10px" }}>
      <TextField
        size="small"
        label={strkey}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "150px" }}
        value={theItem.style[strkey] || ""}
        onChange={(e) => changeStyle(strkey, e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => { setEditingColor(strkey); setIsModal(true); }}>
                <PaletteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );

  return (
    <div>
      <div style={{display:'flex'}}>
        <TextField
          size="small"
          label="idStr"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          style={{ margin: '10px 10px', width:'100px' }}
          value={theItem.idStr || ""}
          onChange={(e) => changeIdStr(e.target.value)}
        />

        <TextField
          size="small"
          label="text"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ flex: 1, margin: '10px 10px' }}
          value={theItem.text || ""}
          onChange={(e) => changeText(e.target.value)}
        />
      </div>

      <hr />

      <Button
        variant="outlined"
        style={{margin:'15px 10px 10px 10px'}}
        onClick={(e) => {
          handlePickFont(true);
        }}>
        font_Family
      </Button>

      {MyInputNumber("fontSize")}
      {MyInputColor("color")}
      {MyInputSelect("textAlign")}
      {MyInputSelect("textAlignVertical")}
      {MyInputSelect("fontStyle")}
      {MyInputSelect("fontWeight")}
      
      
      <hr />
      {MyInputNumber("width")}
      {MyInputNumber("height")}
      {MyInputNumber("left")}
      {MyInputNumber("top")}
      <hr />
      {MyInputNumber("paddingLeft")}
      {MyInputNumber("paddingRight")}
      {MyInputNumber("paddingTop")}
      {MyInputNumber("paddingBottom")}
      <hr />
      {MyInputSelect("borderStyle")}
      {MyInputNumber("borderWidth")}
      {MyInputNumber("borderRadius")}
      {MyInputColor("borderColor")}
      <hr />

      <Button
        variant="outlined"
        style={{ margin: '10px 10px' }}
        onClick={(e) => {
          handlePickImg(true);
        }}>
        background_Image
      </Button>
      
      {MyInputColor("backgroundColor")}
      {MyInputSelect("backgroundRepeat")}
      {MyInputSelect("backgroundSize")}
      {MyInputSelect("backgroundPosition")}
      <Dialog
        open={isModal}
        onClose={() => {
          setIsModal(false);
        }}
      >
        <DialogTitle>
          {editingColor}
          <IconButton
            onClick={(e) => setIsModal(false)}
            style={{ position:'absolute', top:0, right:0 }}
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SketchPicker
            color={theItem.style[editingColor]}
            onChangeComplete={(color) => {
              changeStyle(editingColor, color.hex);
            }}
          />
        </DialogContent>
      </Dialog>

    </div>
  );
}


const Arr_Option = {
  borderStyle: [
    "none",
    "solid",
    "dotted",
    "dashed",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
  ],
  backgroundRepeat: [
    "no-repeat",
    "repeat-x",
    "repeat-y",
    "repeat",
    "space",
    "round",
  ],
  backgroundSize: ["cover", "contain", "length", "percentage", "auto"],
  backgroundPosition: [
    "left top",
    "left center",
    "left bottom",
    "right top",
    "right center",
    "right bottom",
    "center top",
    "center center",
    "center bottom",
  ],
  fontStyle: ["normal", "italic", "oblique"],
  fontWeight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  textAlign: ["left", "right", "center", "justify"],
  textAlignVertical: ["none", "top", "center", "bottom"], //this is not css, here is the trick
};