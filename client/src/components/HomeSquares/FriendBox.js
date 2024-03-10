import "./FriendBox.css";

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Overlay from "../Overlay/Overlay";
import { useState } from "react";
import useUpdateLikes from '../../hooks/useUpdateLikes';

const FriendBox = ({ collection }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { updateLikes} = useUpdateLikes();

  const handleLikeClick = async () => {
    try {
      await updateLikes(collection.user, collection.songs[collection.songs.length - 1]._id);
      console.log('Likes updated successfully!');
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  
  return (
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
          width="200"
          height="200"
        ></img>
        <button onClick={handleLikeClick}>❤️</button>
        <p> {collection.songs[collection.songs.length - 1].title} </p>
        <p> {collection.songs[collection.songs.length - 1].artist} </p>
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
