import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Initialize the audio element for click sound
    clickSoundRef.current = new Audio("/click-sound.mp3");
    clickSoundRef.current.volume = 1.0; // Set click sound volume to max

    // Check if audio is loaded correctly
    clickSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Click sound is ready to play");
    });

    clickSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading click sound:", e);
    });
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // Reset sound to start
      clickSoundRef.current
        .play()
        .catch((error) => console.error("Error playing click sound:", error));
    } else {
      console.error("Click sound ref is null");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-75 text-gray-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-lg font-bold">My Portfolio</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-white" onClick={playClickSound}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-white"
              onClick={playClickSound}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="hover:text-white"
              onClick={playClickSound}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className="hover:text-white"
              onClick={playClickSound}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-white"
              onClick={playClickSound}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
