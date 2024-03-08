import "./FriendBox.css";

import Overlay from "../Overlay/Overlay";
import { useState } from "react";

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);  

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
        <p> {"(SONG ARTIST)"} </p>

      </div>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
        username = {collection.user}
        songCollection = {collection.songs}
      ></Overlay>
    </button>
  );
};

export default FriendBox;