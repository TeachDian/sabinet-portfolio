import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/home/About';
import Projects from './components/home/Projects';
import Skills from './components/home/Skills';
import Contact from './components/home/Contact';
import Navbar from './components/home/Navbar';
import './components/styles/backgroundNoise.css';  // Import the background noise CSS
import BackgroundSound from './components/others/BackgroundSound';


// projects
// 2021
import SpaceShooter from './components/projects/2021/SpaceShooter';

// 2023
import Minesweeper from './components/projects/2023/Minesweeper';

// 2024



function App() {
  const [showBootingScreen, setShowBootingScreen] = useState(true);
  const bootSoundRef = useRef(null);

  const restartBootingAnimation = () => {
    setShowBootingScreen(true);
    if (bootSoundRef.current) {
      bootSoundRef.current.currentTime = 0; // Reset to start
      bootSoundRef.current.play().catch((error) => console.error("Error playing boot sound:", error));
    }

    setTimeout(() => {
      setShowBootingScreen(false);
    }, 6200); // 6 seconds duration for booting screen
  };

  useEffect(() => {
    // Initialize the boot sound
    bootSoundRef.current = new Audio("/boot-sound.mp3");
    bootSoundRef.current.volume = 1.0;

    // Try to play the sound immediately
    const playSound = async () => {
      try {
        console.log("Attempting to play boot sound...");
        await bootSoundRef.current.play();
        console.log("Boot sound is playing!");
      } catch (error) {
        console.error("Error playing boot sound:", error);
      }
    };

    playSound();

    // Set timer to hide booting screen after 6 seconds
    const timer = setTimeout(() => {
      setShowBootingScreen(false);
    }, 6000); // 6 seconds duration for booting screen

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <Router>
      <div className="App">
        {showBootingScreen && (
          <div id="booting-screen">
            <div className="screen-content">
              <p>BOOTING...</p>
            </div>
          </div>
        )}
        {!showBootingScreen && (
          <>
            <Navbar restartBootingAnimation={restartBootingAnimation} />
            <BackgroundSound />
            <div className="bg"></div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/space-shooter" element={<SpaceShooter />} /> {/* Add the route */}
              <Route path="/projects/mine-sweeper" element={<Minesweeper />} /> {/* Add the route */}
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
