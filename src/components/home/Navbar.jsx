import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ restartBootingAnimation }) => {
  const clickSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState("My Portfolio");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    clickSoundRef.current = new Audio("/click-sound.mp3");
    clickSoundRef.current.volume = 1.0;

    hoverSoundRef.current = new Audio("/hover-sound.mp3");
    hoverSoundRef.current.volume = 1.0;
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current
        .play()
        .catch((error) => console.error("Error:", error));
    }
  };

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current
        .play()
        .catch((error) => console.error("Error:", error));
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

  const handleRestartClick = () => {
    playClickSound();
    restartBootingAnimation();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-75 text-gray-300 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Desktop Logo / Title */}
        <div
          className="text-lg font-bold cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleRestartClick}
        >
          {text}
        </div>

        {/* Desktop Menu (Unchanged) */}
        <ul className="hidden lg:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-white">
              About
            </Link>
          </li>
          <li>
            <Link to="/projects" className="hover:text-white">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/skills" className="hover:text-white">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Full-Screen with X Button) */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-black bg-opacity-90 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden flex flex-col items-center justify-center`}
      >
        {/* X Button (Aligned with Navbar) */}
        <button
          className="absolute top-4 right-6 text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Mobile Menu Links (Centered) */}
        <ul className="space-y-6 text-xl text-white text-center">
          <li>
            <Link to="/" className="hover:text-gray-400" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="/skills"
              className="hover:text-gray-400"
              onClick={toggleMenu}
            >
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-400"
              onClick={toggleMenu}
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
