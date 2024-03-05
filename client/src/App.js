import "./App.css";
import React from "react";

import Home from "./Pages/Home";
import Login from "./Pages/Login";

  const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Home code={code} /> : <Login />;
}

export default App;