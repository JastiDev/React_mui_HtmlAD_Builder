import React from "react";
import { px2num } from "../common";

let holding = -1;
let lastDownPos = { x: 0, y: 0 };
let lastMovePos = { x: 0, y: 0 };

export const MyCanvas = ({
  theData,
  idTheItem,
  handleChangeTheItem,
  handleSelectItem,
}) => {
  let { title, width, height, arrItem } = theData;

  let theItem =
    idTheItem !== null && arrItem.length > idTheItem
      ? arrItem[idTheItem]
      : null;

  const onClickSVG = (evt) => {
    let target = document.getElementById("svgRoom");
    var dim = target.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;

    if (lastDownPos.x !== x || lastDownPos.y !== y) return;

    let arrId = [];
    arrItem.forEach((item, i) => {
      let left = px2num(item.style.left);
      let right = px2num(item.style.left) + px2num(item.style.width);
      let top = px2num(item.style.top);
      let bottom = px2num(item.style.top) + px2num(item.style.height);

      if (left < x && x < right && top < y && y < bottom) {
        arrId.push(i);
      }
    });

    if (arrId.length > 0) {
      if (arrId.includes(idTheItem)) handleSelectItem(null);
      else handleSelectItem(arrId[0]);
    } else {
      handleSelectItem(null);
    }
  };

  const onMouseDownSVG = (evt) => {
    let target = document.getElementById("svgRoom");
    var dim = target.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;
    lastDownPos = { x, y };
    lastMovePos = { x, y };

    if (theItem) holding = whichPartOfTheItem(lastDownPos);
  };
  const onMouseUpSVG = (evt) => {
    handleChangeTheItem(theItem, true);
    holding = -1;
  };

  const doTrickOfTextAlignVertical = (item) => {
    let hDiv = px2num(item.style["height"]);
    let hFont = px2num(item.style["fontSize"]);
    if (item.style["textAlignVertical"] === "center")
      item.style["paddingTop"] = Math.max((hDiv - hFont) / 2, 0) + "px";
    else if (item.style["textAlignVertical"] === "bottom")
      item.style["paddingTop"] = Math.max(hDiv - hFont, 0) + "px";
  };

  const onMouseMoveSVG = (evt) => {
    if (!theItem || holding === -1) return;

    let newItem = JSON.parse(JSON.stringify(theItem));

    let target = document.getElementById("svgRoom");
    var dim = target.getBoundingClientRect();
    var x = evt.clientX - dim.left;
    var y = evt.clientY - dim.top;
    let dx = x - lastMovePos.x;
    let dy = y - lastMovePos.y;
    lastMovePos = { x, y };

    if (holding === 8) {
      newItem.style.left = px2num(theItem.style.left) + dx + "px";
      newItem.style.top = px2num(theItem.style.top) + dy + "px";
      handleChangeTheItem(newItem, false);
    } else if (holding === 0) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.left = px2num(theItem.style.left) + dx + "px";
      newItem.style.top = px2num(theItem.style.top) + dy + "px";
      newItem.style.width = px2num(theItem.style.width) - dx + "px";
      newItem.style.height = px2num(theItem.style.height) - dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 1) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.top = px2num(theItem.style.top) + dy + "px";
      newItem.style.width = px2num(theItem.style.width) + dx + "px";
      newItem.style.height = px2num(theItem.style.height) - dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 2) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.width = px2num(theItem.style.width) + dx + "px";
      newItem.style.height = px2num(theItem.style.height) + dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 3) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.left = px2num(theItem.style.left) + dx + "px";
      newItem.style.width = px2num(theItem.style.width) - dx + "px";
      newItem.style.height = px2num(theItem.style.height) + dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 4) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.top = px2num(theItem.style.top) + dy + "px";
      newItem.style.height = px2num(theItem.style.height) - dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 5) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.width = px2num(theItem.style.width) + dx + "px";
      handleChangeTheItem(newItem, false);
    } else if (holding === 6) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.height = px2num(theItem.style.height) + dy + "px";
      doTrickOfTextAlignVertical(newItem);
      handleChangeTheItem(newItem, false);
    } else if (holding === 7) {
      // let newItem = JSON.parse(JSON.stringify(theItem));
      newItem.style.left = px2num(theItem.style.left) + dx + "px";
      newItem.style.width = px2num(theItem.style.width) - dx + "px";
      handleChangeTheItem(newItem, false);
    }
  };

  const whichPartOfTheItem = ({ x, y }) => {
    // -1: outside
    // 0, 1, 2, 3: four corner points
    // 4, 5, 6, 7: four edge center points
    // 8: inside

    let left = px2num(theItem.style.left);
    let top = px2num(theItem.style.top);
    let w = px2num(theItem.style.width);
    let h = px2num(theItem.style.height);

    let ret = -1;
    if (left < x && x < left + w && top < y && y < top + h) ret = 8;

    let eps = eightPos(left, top, w, h);
    for (let i = 0; i < eps.length; i++) {
      let p = eps[i];
      if (
        (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y) <
        Point_Radius * Point_Radius
      ) {
        ret = i;
        break;
      }
    }

    return ret;
  };

  const Point_Radius = 10;

  const eightPos = (left, top, w, h) => [
    { x: left, y: top },
    { x: left + w, y: top },
    { x: left + w, y: top + h },
    { x: left, y: top + h },
    { x: left + w / 2, y: top },
    { x: left + w, y: top + h / 2 },
    { x: left + w / 2, y: top + h },
    { x: left, y: top + h / 2 },
  ];

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        id="exposable_container"
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: "white",
            position: "relative",
          }}
        >
          {arrItem.map((item, i) => (
            <div key={item.id} id={item.idStr} style={item.style}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <svg
        id="svgRoom"
        style={{
          position: "absolute",
          zIndex: "100",
          top: "0",
          left: "0",
          width: width * 3,
          height: height * 3,
        }}
        onClick={onClickSVG}
        onMouseDown={onMouseDownSVG}
        onMouseMove={onMouseMoveSVG}
        onMouseUp={onMouseUpSVG}
      >
        {arrItem.map((item, i) => {
          let left = px2num(item.style.left);
          let top = px2num(item.style.top);

          let w = px2num(item.style.width);
          let h = px2num(item.style.height);
          return (
            <g
              id={"" + item.id}
              key={item.id}
              transform={`translate(${left}, ${top})`}
            >
              <rect
                x={0}
                y={0}
                width={w}
                height={h}
                style={{
                  fill: "blue",
                  fillOpacity: theItem && theItem.id === item.id ? 0.1 : 0,
                  stroke: theItem && theItem.id === item.id ? "blue" : "none",
                  strokeWidth: 1,
                }}
              />

              {eightPos(0, 0, w, h).map(({ x, y }, k) => (
                <circle
                  key={k}
                  cx={x}
                  cy={y}
                  r={Point_Radius}
                  style={{
                    fill: "blue",
                    fillOpacity: theItem && theItem.id === item.id ? 0.5 : 0,
                  }}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
