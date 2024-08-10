import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/home/About';
import Projects from './components/home/Projects';
import Skills from './components/home/Skills';
import Contact from './components/home/Contact';
import Navbar from './components/home/Navbar';
import './components/styles/backgroundNoise.css';  // Import the background noise CSS
import BackgroundSound from './components/others/BackgroundSound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <BackgroundSound />
        <div className="bg"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
