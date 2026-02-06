import React, { useRef } from "react";

const ImageUpload = ({ selectedComponent, updateComponent }) => {
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    updateComponent(selectedComponent.id, (node) => {
      node.defaultProps ??= {};
      node.defaultProps.style ??= {};

      if (node.tag === "img") {
        node.defaultProps.src = imageURL;
      } else {
        node.defaultProps.style.backgroundImage = `url(${imageURL})`;
      }
    });
  };

  return (
    <div className="background-image">
      <label>Background Image</label>

      <div className="image-input">
        <input
          type="text"
          value={
            selectedComponent?.tag === "img"
              ? selectedComponent.defaultProps?.src || ""
              : selectedComponent.defaultProps?.style?.backgroundImage || ""
          }
          readOnly
        />

        <button onClick={() => fileRef.current.click()}>
          Browse
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default ImageUpload;