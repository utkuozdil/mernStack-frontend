import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [fileValidity, setFileValidity] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewURL(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept={".jpg, .png, .jpeg"}
        onChange={event => {
          let tempFile;
          let validity;
          if (event.target.files && event.target.files.length === 1) {
            tempFile = event.target.files[0];
            setFile(tempFile);
            validity = true;
            setFileValidity(validity);
          } else {
            validity = false;
            setFileValidity(validity);
          }
          props.onInput(props.id, tempFile, validity);
        }}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewURL && <img src={previewURL} alt="Preview" />}
          {!previewURL && <p>Pleace pick an image</p>}
        </div>
        <Button
          type="button"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          PICK IMAGE
        </Button>
      </div>
      {!fileValidity && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
