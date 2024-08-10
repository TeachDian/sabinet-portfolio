import React, { useRef, useEffect } from "react";
import {
  FaJsSquare,
  FaReact,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaJava,
  FaPenFancy,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiCsharp,
  SiKotlin,
  SiAndroidstudio,
  SiNextdotjs,
  SiReact,
} from "react-icons/si";
import { LuBrainCircuit } from "react-icons/lu";

const Skills = () => {
  const hoverSoundRef = useRef(null);

  useEffect(() => {
    // Initialize the audio elements for hover sounds
    hoverSoundRef.current = new Audio("/hover-sound.mp3");
    hoverSoundRef.current.volume = 1.0; // Set hover sound volume

    // Check if audio is loaded correctly
    hoverSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Hover sound is ready to play");
    });

    hoverSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading hover sound:", e);
    });
  }, []);

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

  const skills = [
    { name: "Machine Learning", icon: <LuBrainCircuit /> },
    { name: "C#", icon: <SiCsharp /> },
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "Kotlin", icon: <SiKotlin /> },
    { name: "Android Development", icon: <SiAndroidstudio /> },
    { name: "React Native", icon: <SiReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "React.js", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "JavaScript", icon: <FaJsSquare /> },
    { name: "UX/UI Design", icon: <FaPenFancy /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "HTML5", icon: <FaHtml5 /> },
  ];

  return (
    <div className="skills flex items-center justify-center h-screen text-gray-300">
      <div className="max-w-4xl w-full px-6">
        <h2 className="text-4xl font-semibold mb-6 text-center">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 border border-gray-700 rounded-lg shadow-lg transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-gray-700 flex items-center space-x-4"
              onMouseEnter={playHoverSound}
            >
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-lg font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
