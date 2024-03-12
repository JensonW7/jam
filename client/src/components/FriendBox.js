import "../styles/friendBox.css";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Overlay from "./Overlay";
import { useState } from "react";

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <div className="friend-box">
        <div className="front-song">
          <h4>{collection.user}</h4>
          <button
            className="overlay-button"
          >
            <img
              src={collection.songs[collection.songs.length - 1].image.url} //Album Cover
              alt="album cover"
              onClick={() => setIsOverlayOpen(!isOverlayOpen)}
            ></img>
          </button>
          <p>
            {" "}
            <strong>
              {collection.songs[collection.songs.length - 1].title}
            </strong>{" "}
          </p>
          <p> {collection.songs[collection.songs.length - 1].artist} </p>
          <p>
            {formatDistanceToNow(
              new Date(collection.songs[collection.songs.length - 1].timestamp),
              { addSuffix: true }
            )}
          </p>
        </div>
        <button className="reaction">
          
        </button>
      </div>
      <div className="overlay">
        <Overlay
          isOpen={isOverlayOpen}
          onClose={() => setIsOverlayOpen(!isOverlayOpen)}
          username={collection.user}
          songCollection={collection.songs}
        ></Overlay>
      </div>
    </>
  );
};

export default FriendBox;
