import React, { useState } from "react";
import "../styles/global.css";
import styles from "../styles/Navbar.module.css";
import { ChangeEventHandler } from "react";

export const Navbar = ({ signedIn }) => {
  const [lightTheme, setLightTheme] = useState(true);
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
      <div>
        <div className={styles.toggleWrapper} onClick={toggleTheme}>
          {lightTheme ? <span>☀️</span> : <span>🌒</span>}
        </div>
      </div>
    </div>
  );
};
