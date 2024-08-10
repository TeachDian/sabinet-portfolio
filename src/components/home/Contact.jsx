import React, { useRef, useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
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

  const contacts = [
    {
      name: "Email",
      icon: <FaEnvelope />,
      link: "mailto:johnphilip.sabinet0924@gmail.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/john-philip-sabinet-51b979238/",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com/TeachDian",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: "https://x.com/sabinet_philip",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://web.facebook.com/philip.sabinet0924",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      link: "https://instagram.com/sabinet_philip",
    },
    // Add more social media or contact options as needed
  ];

  return (
    <div className="contact flex items-center justify-center h-screen text-gray-300">
      <div className="max-w-4xl w-full px-6">
        <h2 className="text-4xl font-semibold mb-6 text-center">Contact Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-gray-700 rounded-lg shadow-lg transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-gray-700 flex items-center space-x-4"
              onMouseEnter={playHoverSound}
            >
              <span className="text-2xl">{contact.icon}</span>
              <span className="text-lg font-medium">{contact.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
