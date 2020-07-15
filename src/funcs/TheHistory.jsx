import SimpleUndo from "simple-undo";

const myObjectSerializer = (done) => {
  done(JSON.stringify(theData));
};

const myObjectUnserializer = (serialized) => {
  theData = JSON.parse(serialized);
};

export let theData = null;

let history = null;

export const initTheData = (_obj) => {
  if (history) {
    history.clear();
  } else {
    history = new SimpleUndo({
      maxLength: 20,
      provider: myObjectSerializer,
    });
  }

  theData = _obj;
  history.save();
};

export const undoTheData = () => {
  if (history.position === 1) return;
  if (history.canUndo()) history.undo(myObjectUnserializer);
};

export const redoTheData = () => {
  if (history.canRedo()) history.redo(myObjectUnserializer);
};

export const saveTheData = (_data = null) => {
  if (_data) theData = _data;
  history.save();
};
