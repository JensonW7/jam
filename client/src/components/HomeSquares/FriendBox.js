import "./FriendBox.css";

import Overlay from "../Overlay/Overlay";
import { useState } from "react";
import SongCollectionFinder from "./SongCollectionFinder";

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);  
  //const [songCollection, setSongCollection] = useState(new Map());
/*
  setSongCollection(collection.user)
  collection.songs.map((song) => (
    const {song.title, song.artist, song.album};

  )


  setSongCollection(collection.songs.map((song) => {
    songCollection.title = song.title;
    songCollection.artist = song.artist;
    songCollection.album = song.album;
  }));*/

  return (
    <button
      className="friend-box"
      onClick={() => setIsOverlayOpen(!isOverlayOpen)}
    >
      <h4>{collection.user}</h4>
      <div className="Username"></div>  
      <div className="imgwithtext">
        <img
          src={collection.img} //Album Cover
          alt="album cover"
          width="200"
          height="200"
        ></img>
        <p> {"(RECENT SONG)"} </p>
      </div>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
        username = {collection.user}
      ></Overlay>
    </button>
  );
};

export default FriendBox;