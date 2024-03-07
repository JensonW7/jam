import { Fragment } from "react";
import "./Overlay.css";

export function Overlay({ isOpen, onClose, children, username, collection }) {
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
              <h1>{username}</h1>
              <div className="songs">
                {collection.map((song) => (
                  <div className="song-info">
                    <img
                      src={collection.img}
                      alt="album cover"
                      width="200"
                      height="200"
                    ></img>
                    <p> Song: {song.title} </p>
                    <p> Artist: {song.artist} </p>
                    <p> Album: {song.album} </p>
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
