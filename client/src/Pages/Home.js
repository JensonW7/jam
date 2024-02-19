import React from "react";
import { BrowserRouter as Link, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Search from "./Search";
import { useState } from "react";

import { Overlay } from "../Components/Overlay/Overlay";

function Home({ code }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(code);

  const logout = () => {
    window.location.href = "/login"; // Redirect to login page
    setIsLoggedIn(!code);
  }

  return (
    <div className="container">
      <h1>Welcome to Your Home Page</h1>
      <button onClick={logout}>Logout</button>
  
      <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>
        Example Overlay
      </button>
      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}>
        <h1>Hello from Overlay</h1>
      </Overlay>

      <p>Below is your code</p>
      <p>{code}</p>

    </div>

    /*{
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
      </Routes> }*/
  );
}

export default Home;
