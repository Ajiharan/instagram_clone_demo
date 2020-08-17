import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../Firebase";
import firebase from "firebase";
import "./ImageUpload.css";

const ImageUpload = ({ userName }) => {
  console.log("userName", userName);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercentage);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              ImageUrl: url,
              caption: caption,
              userName: userName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
    setCaption("");
    setImage(null);
    setProgress(0);
  };
  return (
    <div className="imageUpload">
      <progress className="imageUpload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption.."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={(e) => handleChange(e)} />
      <Button onClick={handleUpload}>upload</Button>
    </div>
  );
};

export default ImageUpload;
