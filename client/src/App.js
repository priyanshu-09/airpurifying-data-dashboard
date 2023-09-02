import logo from "./logo.svg";

import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BASE_URL } from "./utils/networkConstants";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setSignedIn(false);
      }
      const { data } = await axios.post(
        BASE_URL + "/",
        {},
        { withCredentials: true }
      );
      const { status } = data;
      if (status) {
        setSignedIn(true);
      } else {
        removeCookie("token");
        setSignedIn(false);
      }
    };
    verifyCookie();
  }, [cookies, removeCookie]);

  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
      {!signedIn ? <Login setSignedIn={setSignedIn} /> : <Dashboard />}
      <ToastContainer />
    </div>
  );
}

export default App;
