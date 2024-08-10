import React from "react";

const Contact = () => {
  return (
    <div className="contact flex items-center justify-center h-screen text-gray-300">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-semibold mb-4">Contact Me</h2>
        <p className="text-lg mb-4">You can reach me at:</p>
        <ul className="space-y-2">
          <li className="text-lg">
            Email:
            <a
              href="mailto:your.email@example.com"
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              your.email@example.com
            </a>
          </li>
          <li className="text-lg">
            LinkedIn:
            <a
              href="https://www.linkedin.com/in/your-profile"
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              your-profile
            </a>
          </li>
          <li className="text-lg">
            GitHub:
            <a
              href="https://github.com/your-username"
              className="text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              your-username
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
