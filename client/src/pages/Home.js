// setup
import { useContext, useEffect, useState } from "react";
import "../index.css";

// components
import FriendBox from "../components/HomeSquares/FriendBox";

import useAuth from "../hooks/useAuth";
import { useUpdateCurrentSong } from "../hooks/useUpdateCurrentSong";

//context
import { useUserContext } from "../hooks/useUserContext";

const Home = ({ code, state }) => {
  const { username, accessToken, dispatch } = useUserContext();
  const [friendBoxes, setFriendBoxes] = useState(null);
  const [friendsArray, setFriendsArray] = useState([]);

  useAuth(code, state);
  useUpdateCurrentSong();

  useEffect(() => {
    const fetchUserFriends = async () => {
      const response = await fetch("/users/" + username);
      const json = await response.json();

      if (response.ok) {
        setFriendsArray(json[0].friends);
      }
    };

    fetchUserFriends();
  }, [username]);
  console.log(friendsArray);

  useEffect(() => {
    const fetchFriendCollections = async () => {
      // map function replaces former for loop to create array of promises
      const promises = friendsArray.map(async (friend) => {
        const response = await fetch("/api/current_songs/" + friend.username);
        const json = await response.json();

        if (response.ok) {
          return json;
        }
      });

      //Promise.all waits for all the prmises to resolve before updating the state
      const friendCollectionsArray = await Promise.all(promises);
      const filteredFriendCollectionsArray = friendCollectionsArray.filter(collection => collection !== undefined);
      setFriendBoxes(filteredFriendCollectionsArray);
    };

    if (friendsArray.length > 0) {
      fetchFriendCollections();
    }

  }, [friendsArray]); // so UseEffect can be triggered whenever friendsArray changes

  console.log(friendBoxes);

  return (
    <div className="home">
      <div className="container">
        <h1>Friend Activity</h1>
        {friendBoxes &&
          friendBoxes.map((collection) => (
            <FriendBox key={collection._id} collection={collection} />
          ))}
      </div>
    </div>
  );
};

export default Home;
