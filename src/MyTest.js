import React, { useState, useEffect } from "react";
import {
  initTheData,
  saveTheData,
  undoTheData,
  redoTheData,
  theData,
} from "./funcs/TheHistory";

export const MyTest = () => {
  const [n, setN] = useState(1);

  useEffect(() => {
    initTheData({ text: "hello", id: "123" });
    setN((n) => -n);

    document.addEventListener("keydown", onCtrlZY);
  }, []);

  const onCtrlZY = (e) => {
    var evtobj = window.event ? window.event : e;
    if (e.keyCode == 90 && e.ctrlKey) {
      doUndo();
    } else if (e.keyCode == 89 && e.ctrlKey) {
      doRedo();
    }
  };

  const onChangeText = (event) => {
    theData.text = event.target.value;
    saveTheData();
    setN((n) => -n);
  };

  const doUndo = () => {
    undoTheData();
    setN((n) => -n);
  };

  const doRedo = () => {
    redoTheData();
    setN((n) => -n);
  };

  if (!theData) return null;
  return (
    <div>
      <input type="text" value={theData.text} onChange={onChangeText}></input>
      <button onClick={(e) => doUndo()}>Undo</button>
      <button onClick={(e) => doRedo()}>Redo</button>
    </div>
  );
};
