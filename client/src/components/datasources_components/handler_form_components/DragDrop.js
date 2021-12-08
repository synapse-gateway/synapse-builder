import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JavaScript"];

function DragDrop({ setFileBtnDisabled, setFile, fileTypes }) {
  // const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setFile(file);
    setFileBtnDisabled(false);
  };

  return (
    <FileUploader
      onTypeError={(err) => console.error(err)}
      handleChange={handleChange}
      name='file'
      types={fileTypes}
    />
  );
}

export default DragDrop;
