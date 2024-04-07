"use client";
import React from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = React.useState();
  const imageInputRef = React.useRef();

  function handlePickImage() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {pickedImage && <Image src={pickedImage} alt="Picked" fill />}
          {!pickedImage && <p>No image picked yet.</p>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
