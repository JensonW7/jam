import React from "react";
//import { Link, Route, Routes } from "react-router-dom";
//import Profile from "./Profile";
//import Search from "./Search";
import { useState } from "react";

import { Overlay } from "../Components/Overlay/Overlay";

function Home({ code }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="container">
      <h1>You've succesfully logged in with Spotify</h1>
      <p>Below is your code</p>
      <p>{code}</p>

      <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>
        Example Overlay
      </button>
      <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(!isOverlayOpen)}>
        <h1>Hello from Overlay</h1>
      </Overlay>
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
