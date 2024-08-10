import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component

const Projects = () => {
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);

  useEffect(() => {
    // Initialize the audio elements for hover and click sounds
    hoverSoundRef.current = new Audio("/hover-sound.mp3");
    hoverSoundRef.current.volume = 1.0; // Set hover sound volume

    clickSoundRef.current = new Audio("/click-sound.mp3");
    clickSoundRef.current.volume = 1.0; // Set click sound volume

    // Check if audio is loaded correctly
    hoverSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Hover sound is ready to play");
    });

    hoverSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading hover sound:", e);
    });

    clickSoundRef.current.addEventListener("canplaythrough", () => {
      console.log("Click sound is ready to play");
    });

    clickSoundRef.current.addEventListener("error", (e) => {
      console.error("Error loading click sound:", e);
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

  const isExternalLink = (url) => {
    return url.startsWith("http");
  };

  return (
    <div className="projects flex flex-col items-center justify-center h-screen text-gray-300">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-6 text-center">My Projects</h2>
        <div className="project-list overflow-y-scroll max-h-[70vh] space-y-8 scrollbar-hide">
          {[
            {
              year: 2024,
              projects: [
                {
                  name: "CPU PSS",
                  description: "CPU Process Scheduling Simulator.",
                  link: "https://teachdian.github.io/process-scheduling-simulator/",
                },
                {
                  name: "Password Generator App",
                  description:
                    "Password generator web application built with Flask..",
                  link: "https://github.com/TeachDian/Password-Generator",
                },
                {
                  name: "AquaScan System",
                  description:
                    "Drone Technology and Computer Vision for a Cleaner Tomorrow",
                  link: "https://fishlens.netlify.app/",
                },
                {
                  name: "FishLens System",
                  description: "Transforming Aquaculture with FishLens.",
                  link: "https://fishlens.netlify.app/",
                },
                {
                  name: "FishLens App",
                  description: "Co-Author - Transforming Aquaculture with FishLens.",
                  link: "https://drive.google.com/drive/u/8/folders/1xoHnJszKdpd_kWaa_Vcrdqf40r7sjVhg",
                },
              ],
            },
            {
              year: 2023,
              projects: [
                {
                  name: "Minesweeper",
                  description: "A classic Minesweeper game implementation.",
                  link: "/projects/mine-sweeper", // Internal link using React Router
                },
                {
                  name: "Sabinet Admin",
                  description:
                    "Static Admin Website using Bootstrapmade Template.",
                  link: "https://teachdian.github.io/SabinetAdmin/",
                },
                {
                  name: "Project C",
                  description: "A brief description.",
                  link: "https://example.com/project-c",
                },
              ],
            },
            {
              year: 2022,
              projects: [
                {
                  name: "Project D",
                  description: "A brief description.",
                  link: "https://example.com/project-d",
                },
                {
                  name: "Project E",
                  description: "A brief description.",
                  link: "https://example.com/project-e",
                },
                {
                  name: "Project F",
                  description: "A brief description.",
                  link: "https://example.com/project-f",
                },
              ],
            },
            {
              year: 2021,
              projects: [
                {
                  name: "Project G",
                  description: "A brief description.",
                  link: "https://example.com/project-g",
                },
                {
                  name: "Project H",
                  description: "A brief description.",
                  link: "https://example.com/project-h",
                },
                {
                  name: "Project I",
                  description: "A brief description.",
                  link: "https://example.com/project-i",
                },
              ],
            },
            {
              year: 2020,
              projects: [
                {
                  name: "Space Shooter",
                  description: "A retro space shooter game.",
                  link: "/projects/space-shooter", // Internal link using React Router
                },
                {
                  name: "Project K",
                  description: "A brief description.",
                  link: "https://example.com/project-k",
                },
                {
                  name: "Project L",
                  description: "A brief description.",
                  link: "https://example.com/project-l",
                },
              ],
            },
            {
              year: 2019,
              projects: [
                {
                  name: "Project M",
                  description: "A brief description.",
                  link: "https://example.com/project-m",
                },
                {
                  name: "Project N",
                  description: "A brief description.",
                  link: "https://example.com/project-n",
                },
                {
                  name: "Project O",
                  description: "A brief description.",
                  link: "https://example.com/project-o",
                },
              ],
            },
          ].map((section) => (
            <div key={section.year}>
              <h3 className="text-2xl font-semibold mb-4">{section.year}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.projects.map((project, index) =>
                  isExternalLink(project.link) ? (
                    <a
                      key={index}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                    >
                      <h4 className="text-lg font-medium">{project.name}</h4>
                      <p className="text-sm mt-2">{project.description}</p>
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={project.link}
                      className="p-4 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                    >
                      <h4 className="text-lg font-medium">{project.name}</h4>
                      <p className="text-sm mt-2">{project.description}</p>
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
