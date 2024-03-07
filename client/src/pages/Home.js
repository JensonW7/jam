// setup
import { useContext, useEffect, useState } from "react";
import "../index.css";

// components
<<<<<<< HEAD
import FriendBox from "../components/HomeSquares/FriendBox";
import useAuth from "../hooks/useAuth";
=======
<<<<<<<< HEAD:client/src/Pages/Home.js
import FriendBox from "../components/HomeSquares/FriendBox";
import useAuth from "../hooks/useAuth";
========
import SongCollection from '../components/SongCollection'
import SearchForm from '../components/SearchForm'
import useAuth from '../hooks/useAuth'
>>>>>>>> main:client/src/pages/Home.js
>>>>>>> main

//context
import { useUserContext } from "../hooks/useUserContext";

const Home = ({ code, state }) => {
  const { username, accessToken, dispatch } = useUserContext();
  const [friendBoxes, setFriendBoxes] = useState(null);

  useAuth(code, state);

  console.log("username from home:", username);
  console.log("access token from home:", accessToken);

  useEffect(() => {
    const fetchCurrentSongCollections = async () => {
      const response = await fetch("/api/current_songs");
      const json = await response.json();

      if (response.ok) {
        setFriendBoxes(json);
      }
    };

    fetchCurrentSongCollections();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <h1>Friend Activity</h1>
        <div className="friendCollection">
          {friendBoxes &&
            friendBoxes.map((collection) => (
              <FriendBox key={collection._id} collection={collection} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
