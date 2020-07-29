import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const MyInnerHtmlEditor = ({ strHtml, handleChange }) => {
  const onEditorChange = (value, delta, source, editor) => {
    if (source === "user") {
      let str = editor.getHTML();
      handleChange(str);
    }
  };

  return (
    <ReactQuill
      theme="snow"
      value={strHtml}
      readOnly={false}
      modules={{ toolbar: ["bold", "italic", "underline", "strike"] }}
      onChange={onEditorChange}
      onChangeSelection={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};
