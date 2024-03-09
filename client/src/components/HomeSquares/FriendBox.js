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
      <div className="Username">
        <h4>{collection.user}</h4>
      </div>
      <div className="imgwithtext">
        <img
          src={collection.songs[0].image.url} //Album Cover
          alt="album cover"
          width="200"
          height="200"
        ></img>
        <p> {collection.songs[0].title} </p>
        <p> {collection.songs[0].artist} </p>
      </div>
      <div className="overlay">
        <Overlay
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(!isOverlayOpen)}
          username={collection.user}
          songCollection={collection.songs}
        ></Overlay>
      </div>
    </button>
  );
};

export default FriendBox;
