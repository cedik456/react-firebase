import React, { useState } from "react";
import { ref } from "firebase/storage";
import { storage } from "../config/firebase";

const Storage = () => {
  const [fileUploads, setFileUploads] = useState([]);

  const uploadFile = () => {
    if (!fileUploads) return;
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFileUploads(e.target.files)} />
      <button onClick={uploadFile}>Submit</button>
    </div>
  );
};

export default Storage;
