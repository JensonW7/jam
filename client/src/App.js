import "./App.css";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Home from "../src/Pages/Home";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";

import Login from "./Components/Login";

function App() {
  return (
    <div className="container">
      <nav>
        <ul>
          <Link to="/" class="list">
            Home
          </Link>

          <Link to="/search" class="list">
            Search
          </Link>

          <Link to="/profile" class="list">
            Profile
          </Link>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Login />
    </div>
  );
}

export default App;