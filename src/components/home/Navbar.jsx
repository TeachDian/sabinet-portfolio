import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ restartBootingAnimation }) => {
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("My Portfolio");

  useEffect(() => {
    // Initialize the audio elements for click and hover sounds
    clickSoundRef.current = new Audio("/click-sound.mp3");
    clickSoundRef.current.volume = 1.0; // Set click sound volume to max

    hoverSoundRef.current = new Audio("/hover-sound.mp3");
    hoverSoundRef.current.volume = 1.0; // Set hover sound volume

    // Check if audio is loaded correctly
    clickSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Click sound is ready to play");
    });

    clickSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading click sound:", e);
    });

    hoverSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Hover sound is ready to play");
    });

    hoverSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading hover sound:", e);
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

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0; // Reset sound to start
      hoverSoundRef.current
        .play()
        .catch((error) => console.error("Error playing hover sound:", error));
    } else {
      console.error("Hover sound ref is null");
    }
  };

  useEffect(() => {
    let timer;
    if (hovered) {
      timer = setTimeout(() => setText("Restart"), 500);
    } else {
      setText("My Portfolio");
    }
    return () => clearTimeout(timer);
  }, [hovered]);

  const handleMouseEnter = () => {
    setHovered(true);
    playHoverSound();
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleRestartClick = () => {
    playClickSound();
    restartBootingAnimation();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-75 text-gray-300 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
          className="text-lg font-bold cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleRestartClick}
        >
          {text}
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-white"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-white"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="hover:text-white"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className="hover:text-white"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-white"
              onMouseEnter={playHoverSound}
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
