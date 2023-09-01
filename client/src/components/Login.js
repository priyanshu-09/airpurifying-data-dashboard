import React, { useState } from "react";
import styles from "../styles/Login.module.css";

export const Login = ({ setSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email !== "" && password !== "") {
      setSignedIn(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginBox}>
        <div className={styles.loginHeading}>Login to enter</div>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <div className={styles.loginButton} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};
