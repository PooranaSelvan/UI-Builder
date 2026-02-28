import React, { useRef, useState } from "react";
import axios from "axios";
import "./file-loader.css";

const ImageUpload = ({ selectedComponent, updateComponent, label }) => {
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    const cloudinaryData = await uploadImageToCloud(file);
    const imageURL = cloudinaryData?.secure_url;

    if (!imageURL) return;

    updateComponent(selectedComponent.id, (node) => {
      node.defaultProps ??= {};
      node.defaultProps.style ??= {};

      if (node.tag === "img") {
        node.defaultProps.src = imageURL;
      }
      else {
        node.defaultProps.style.backgroundImage = `url(${imageURL})`;
        node.defaultProps.style.backgroundSize = "cover";
        node.defaultProps.style.backgroundPosition = "center";
        node.defaultProps.style.backgroundRepeat = "no-repeat";
      }
    });
  };


  const uploadImageToCloud = async (file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sirpam ui builder");

    try {
      setLoading(true);
      let res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
      console.log(error.response);
    } finally {
      setLoading(false);
    }

    return null;
  }

  return (
    <div className="background-image">
      <label>{label}</label>

      <div className="image-input">
        <input
          type="text"
          value={
            selectedComponent?.tag === "img"
              ? selectedComponent.defaultProps?.src || ""
              : selectedComponent.defaultProps?.style?.backgroundImage || ""
          }
        />

        {!loading ? (
          <button onClick={() => fileRef.current.click()}>
            Browse
          </button>
        ) : (
          <div className="file-loader"></div>
        )}
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