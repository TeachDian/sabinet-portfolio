import React, { useEffect } from "react";

const BackgroundSound = () => {
  useEffect(() => {
    const audio = new Audio("/static-sound.mp3");
    audio.volume = 0.08;
    audio.loop = true;
    audio
      .play()
      .catch((error) =>
        console.error("Error playing background sound:", error)
      );

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};

export default BackgroundSound;
