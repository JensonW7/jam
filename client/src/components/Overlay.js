import "../styles/overlay.css";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//heart
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heart } from "@fortawesome/free-solid-svg-icons";

export function Overlay({
  isOpen,
  onClose,
  children,
  username,
  songCollection,
}) {
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay_box">
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
            <div className="overlay_content">
              <div className="user">
                <p>
                  <div className="username">
                    <h1>{username}</h1>
                  </div>
                  <div className="islisteningto">is listening to</div>
                </p>
              </div>
              <div className="songs">
                {songCollection.map((song) => (
                  <div className="song-info">
                    <img
                      src={song.image.url}
                      alt="album cover"
                      width="75"
                      height="75"
                    ></img>
                    <div className="overflow">
                      <p>
                        {" "}
                        <strong>{song.title}</strong>
                      </p>
                    </div>
                    <p> {song.artist}</p>
                    <div className="horizontally">
                      <p>
                        {formatDistanceToNow(new Date(song.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                      <div className="likes">
                        <FontAwesomeIcon icon={heart} />
                        <p>{song.likes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overlay;
