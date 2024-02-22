import "./Overlay.css";

export function Overlay({ isOpen, onClose, children, overlayImage, overlayText }) {
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="overlay__background" onClick={onClose} />
          <div className="overlay_container">
            <div className="overlay__controls">
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </div>
            {children}
            <div className="overlayImage">
              <img
                src={overlayImage}
                alt="overlay album cover"
                width="200"
                height="200"
              ></img>
              <p>{overlayText}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overlay;
