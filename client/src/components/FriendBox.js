import "../styles/friendBox.css";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import Overlay from "./Overlay";
import { useState } from "react";
import addLike from '../hooks/addLike'
import removeLike from '../hooks/removeLike'

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <>
      <button
        className="friend-box"
        onClick={() => setIsOverlayOpen(!isOverlayOpen)}
      >
        <div className="Username">
          <h4>{collection.user}</h4>
        </div>
        <div className="front-song">
          <img
            src={collection.songs[collection.songs.length - 1].image.url} //Album Cover
            alt="album cover"
          ></img>
          <p> <strong>{collection.songs[collection.songs.length - 1].title}</strong> </p>
          <p> {collection.songs[collection.songs.length - 1].artist} </p>
          <p>
            {formatDistanceToNow(
              new Date(collection.songs[collection.songs.length - 1].timestamp),
              { addSuffix: true }
            )}
          </p>
        </div>
      </button>
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
