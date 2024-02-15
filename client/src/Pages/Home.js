import React from 'react'
// import { Link, Route, Routes } from "react-router-dom";
// import Profile from "./Profile";
// import Search from "./Search";

function Home({ code }) {
  return (
    <div className="container">

      <h1>You've succesfully logged in with Spotify</h1>
      <p>Below is your code</p>
      <p>{ code }</p>

      {/* <nav>
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
      </Routes> */}

    </div>
  );
}

export default Home