import logo from "./logo.svg";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <Navbar signedIn={signedIn} setSignedIn={setSignedIn} />
      {!signedIn ? <Login setSignedIn={setSignedIn} /> : <></>}
      <ToastContainer />
    </div>
  );
}

export default App;
