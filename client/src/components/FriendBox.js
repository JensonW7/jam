import "../styles/friendBox.css";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as unlike} from '@fortawesome/free-solid-svg-icons';
import { faHeart as like } from '@fortawesome/free-regular-svg-icons';

import Overlay from "./Overlay";
import { useState } from "react";
import addLike from "../hooks/addLike";
import removeLike from "../hooks/removeLike";

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    collection.songs[collection.songs.length - 1].likes
  );

  return ( 
    <>
      <div className="friend-box">
        <div className="front-song">
          <h4>{collection.user}</h4>
          <button className="overlay-button">
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
        <div className="reaction-button">
          {!liked && (
            <button
              className="reaction"
              onClick={() => {
                setLiked(!liked);
                setLikeCount(likeCount + 1);
                addLike(collection.user);
              }}
            >
              <FontAwesomeIcon icon={like}/>
              <p>{likeCount}</p>
            </button>
          )}

          {liked && (
            <button
              className="reaction"
              onClick={() => {
                setLiked(!liked);
                setLikeCount(likeCount - 1);
                removeLike(collection.user);
              }}
            >
              <FontAwesomeIcon icon={unlike}/>
              <p>{likeCount}</p>
            </button>
          )}
        </div>
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
