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
          src={collection.img}
          alt="album cover"
          width="200"
          height="200"
        ></img>
        <p> {"Song NAME"} </p>
      </div>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
      ></Overlay>
    </button>
  );
};

export default FriendBox;
/*
    <div className="friend-box">
      <h4>{collection.user}</h4>
      <div className="recentSong"></div>
      <button
        className="overlayButton"
        onClick={() => setIsOverlayOpen(!isOverlayOpen)}
      >
        <div className="imgwithtext">
          <img
            src={collection.img}
            alt="album cover"
            width="200"
            height="200"
          ></img>
          <p> {"Song NAME"} </p>
        </div>
      </button>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
      ></Overlay>
    </div>*/
