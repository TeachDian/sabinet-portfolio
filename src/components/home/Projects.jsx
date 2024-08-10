import React from "react";

const Projects = () => {
  return (
    <div className="projects flex items-center justify-center h-screen text-gray-300">
      <div className="max-w-4xl">
        <h2 className="text-4xl font-semibold mb-4">My Projects</h2>
        <ul className="space-y-4">
          <li className="text-lg">
            Project 1 - A detailed description of Project 1.
          </li>
          <li className="text-lg">
            Project 2 - A detailed description of Project 2.
          </li>
          <li className="text-lg">
            Project 3 - A detailed description of Project 3.
          </li>
          {/* Add more projects as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
