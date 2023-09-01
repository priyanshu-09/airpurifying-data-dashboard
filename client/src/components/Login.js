import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/Login.module.css";
import { BASE_URL, ENDPOINTS } from "../utils/networkConstants";
import { toast } from "react-toastify";

export const Login = ({ setSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        BASE_URL + ENDPOINTS.LOGIN,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        setSignedIn(true);
      } else {
        toast.error(message, {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.log(error);
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
