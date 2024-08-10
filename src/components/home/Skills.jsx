import React from "react";

const Skills = () => {
  return (
    <div className="skills flex items-center justify-center h-screen text-gray-300">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-semibold mb-4">My Skills</h2>
        <ul className="grid grid-cols-2 gap-4">
          <li className="text-lg">JavaScript</li>
          <li className="text-lg">React.js</li>
          <li className="text-lg">CSS3</li>
          <li className="text-lg">HTML5</li>
          <li className="text-lg">Node.js</li>
          <li className="text-lg">Tailwind CSS</li>
          {/* Add more skills as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
