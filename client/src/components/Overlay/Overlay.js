import "./Overlay.css";

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
              <h1>{username}</h1>
              <div className="songs">
                {songCollection.map((song) => (
                  <div className="song-info">
                    <img
                    src={song.image.url}
                    alt="album cover"
                    width="75"
                    height="75"
                    ></img>
                    <p> {song.title}</p>
                    <p> {song.artist}</p>

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
