import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const MyInnerHtmlEditor = ({ strHtml, handleChange }) => {
  const onEditorChange = (value, delta, source, editor) => {
    let str = editor.getHTML();
    handleChange(str);
  };

  return (
    <ReactQuill
      theme="snow"
      value={strHtml}
      readOnly={false}
      onChange={onEditorChange}
      onChangeSelection={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
};
