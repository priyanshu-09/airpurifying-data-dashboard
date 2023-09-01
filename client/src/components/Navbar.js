import React, { useState } from "react";
import "../styles/global.css";
import styles from "../styles/Navbar.module.css";
import { ChangeEventHandler } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL, ENDPOINTS } from "../utils/networkConstants";

export const Navbar = ({ signedIn, setSignedIn }) => {
  const [lightTheme, setLightTheme] = useState(true);
  const [cookies, removeCookie] = useCookies([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(BASE_URL + ENDPOINTS.BULK_UPDATE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      alert("Please select a file before uploading.");
    }
  };

  const onLogout = () => {
    removeCookie("token");
    setSignedIn(false);
  };
  const toggleTheme = () => {
    if (lightTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
      setLightTheme(false);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setLightTheme(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Praan Task Website</div>
      <div className={styles.iconsContainer}>
        <div className={styles.toggleWrapper} onClick={toggleTheme}>
          {lightTheme ? <span>☀️</span> : <span>🌒</span>}
        </div>
        {/* {signedIn && (
          <div>
            <input type="file" onChange={handleFileChange} />
            <img onClick={handleUpload} src="/upload.png" alt="Upload" />
          </div>
        )} */}
        {signedIn && (
          <div>
            <img src="/logout.png" alt="Logout" onClick={onLogout} />
          </div>
        )}
      </div>
    </div>
  );
};
