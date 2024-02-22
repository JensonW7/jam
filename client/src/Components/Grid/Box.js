import "./Box.css";
import { Overlay } from "../Overlay/Overlay";
import React from "react";
import { useState } from "react";

export function Box({ image, name }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <button
        className="square"
        onClick={() => setIsOverlayOpen(!isOverlayOpen)}
      >
        <div class="imgwithtext">
          <img src={image} alt="album cover" width="200" height="200"></img>
          <p> {name} </p>
        </div>
      </button>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(!isOverlayOpen)}
        overlayImage={image}
        overlayText={name}
      >
      </Overlay>
    </>
  );
}
export default Box;
