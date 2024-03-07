import Overlay from "./Overlay/Overlay";

const FriendBox = ({ collection }) => {
  return (
    <div className="userContainer">
      <h4>{collection.user}</h4>
      <div className="recentSong">
        <p>
          <span>Song: </span>
        </p>
      </div>
      <button className="overlayButton">
        <Overlay></Overlay>
      </button>
    </div>
  );
};
/*
            <div className="songs">
                {collection.songs.map((song) => (
                    <div className="song-info">
                        <p><span>Song: </span>{song.title}</p>
                        <p><span>Artist: </span>{song.artist}</p>
                        <p><span>Album: </span>{song.album}</p>
                    </div>
                ))}
            </div>
            */
export default FriendBox;
