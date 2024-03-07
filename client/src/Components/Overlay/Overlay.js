import { Fragment } from "react";
import "./Overlay.css";

export function Overlay({ isOpen, onClose, children, username}) {
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
              <p>{username}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Overlay;