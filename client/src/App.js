import logo from "./logo.svg";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div style={{ width: "100vw", minHeight: "100vh" }}>
      <Navbar signedIn={signedIn} />
      {!signedIn ? <Login setSignedIn={setSignedIn} /> : <></>}
    </div>
  );
}

export default App;
