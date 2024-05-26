import React, { useEffect, useRef } from "react";
import diamond from "../assets/diamond.mp4";

const AutoPlayVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Play the video when the component mounts
    videoRef.current.play();
  }, []);

  return (
    <div className="mt-24 md:mt-0 absolute top-0 max-h-[100%] overflow-hidden" >
      <video id="video" ref={videoRef} className="opacity-20 w-full" autoPlay muted loop  >
        <source src={diamond} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default AutoPlayVideo;
