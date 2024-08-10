import React from "react";
import imageSrc from "../../assets/img/Sabinet.png"; // Adjust the path based on your file structure

const About = () => {
  return (
    <div className="about flex flex-col items-center justify-center h-screen text-gray-300">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-6 text-center">About Me</h2>
        <div className="about-content overflow-y-scroll max-h-[70vh] space-y-32 scrollbar-hide">
          {/* Introduction */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
            <div className="flex items-center space-x-8">
              <div className="w-40 h-40 border border-gray-700 rounded-lg shadow-lg">
                <img
                  src={imageSrc}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-lg">
                [Placeholder for Introduction: Name, Title, Location, Brief
                Summary]
              </p>
            </div>
          </section>

          {/* Professional Background */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">
              Professional Background
            </h3>
            <p className="text-lg">
              [Placeholder for Professional Background: Experience, Key Skills,
              Notable Achievements]
            </p>
          </section>

          {/* Education */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            <p className="text-lg">
              [Placeholder for Education: Degree, Institution, Relevant
              Coursework, Certifications]
            </p>
          </section>

          {/* Personal Interests */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Personal Interests</h3>
            <p className="text-lg">
              [Placeholder for Personal Interests: Hobbies, Volunteer Work,
              Tech-Related Interests]
            </p>
          </section>

          {/* Values and Philosophy */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">
              Values and Philosophy
            </h3>
            <p className="text-lg">
              [Placeholder for Values and Philosophy: Work Philosophy, Career
              Goals]
            </p>
          </section>

          {/* Call to Action */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-lg">
              [Placeholder for Call to Action: Encourage visitors to contact you
              via LinkedIn or email]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
