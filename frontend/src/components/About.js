import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaCode,
  FaHeart,
  FaBriefcase,
  FaPaintBrush,
  FaRocket,
  FaMagic,
  FaPuzzlePiece,
  FaRobot,
  FaGlobe,
} from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./../styles/about.css";


const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [eduStage, setEduStage] = useState("10th");

  const tabs = [
    { key: "education", label: "Education", icon: <FaGraduationCap /> },
    { key: "skills", label: "Skills", icon: <FaCode /> },
    { key: "interests", label: "Interests", icon: <FaHeart /> },
    { key: "experience", label: "Experience", icon: <FaBriefcase /> },
  ];

  const eduTabs = ["10th", "12th", "BTech", "NxtWave"];

  const educationData = {
    "10th": {
      year: "2017-18",
      title: "SSC / 10th",
      institute: "Mahatma Jyothi Bhaphule Residential School",
      Percentage: "Percentage: 87%",
      desc: "Completed 10th with distinction, strong base in Mathematics and Science.",
      Location: "Luxettipet, Mancherial",
    },
    "12th": {
      year: "2018-20",
      title: "Intermediate / 12th",
      institute: "SR Junior College",
      Percentage: "Percentage: 95.8%",
      desc: "Focused on PCM subjects; secured top grades.",
      Location: "Nizamabad",
    },
    BTech: {
      year: "2020 - 24",
      title: "B.Tech in Electronics and Communication Engineering",
      institute: "Vardhaman College Of Engineering (VMEG)",
      Percentage: "CGPA: 7.8",
      desc: "Specialized in Full Stack Development, Data Structures, and Algorithms (Beginner).",
      Location: "Shamshabad, Hyderabad",
    },
    NxtWave: {
      year: "2024 - Present",
      title: "Full Stack Development Program",
      institute: "NxtWave CCBP",
      Percentage: "Yet to complete",
      desc: "Training on real-world projects using React, Node, Express, and Databases.",
      Location: "Hyderabad",
    },
  };

  // Particle Init
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Spotlight effect
  useEffect(() => {
    const section = document.querySelector(".about-section");
    const spotlight = document.createElement("div");
    spotlight.classList.add("spotlight");
    section.appendChild(spotlight);

    const moveSpotlight = (e) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--x", `${e.clientX - rect.left}px`);
      section.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    section.addEventListener("mousemove", moveSpotlight);
    return () => section.removeEventListener("mousemove", moveSpotlight);
  }, []);

  return (
    <section className="about-section" id="about">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: ["#ffcc70", "#6dd3ff", "#c77dff"] },
            links: { enable: false },
            move: { enable: true, speed: 1.5, outModes: "out" },
            number: { value: 50 },
            opacity: { value: 0.35, animation: { enable: true, speed: 1 } },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 6 }, animation: { enable: true, speed: 2 } },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 80, duration: 0.4 },
              push: { quantity: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Heading */}
      <h2 className="section-title">About Me</h2>

      {/* Tab Cards */}
      <div className="tab-cards">
        {tabs.map((tab) => (
          <motion.div
            key={tab.key}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-card ${activeTab === tab.key ? "active" : ""}`}
          >
            <div className="icon">{tab.icon}</div>
            <h4>{tab.label}</h4>
          </motion.div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <AnimatePresence mode="wait">
          {/* Education */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <div className="edu-subtabs">
                {eduTabs.map((stage) => (
                  <button
                    key={stage}
                    className={`edu-btn ${eduStage === stage ? "active" : ""}`}
                    onClick={() => setEduStage(stage)}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              <motion.div
                key={eduStage}
                className="edu-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <h3>{educationData[eduStage].title}</h3>
                <span className="education-org-name">
                  {educationData[eduStage].institute}
                </span>
                <p className="education-percentage">
                  {educationData[eduStage]?.Percentage}
                </p>
                <span className="edu-year">{educationData[eduStage].year}</span>
                <p>{educationData[eduStage].desc}</p>
                <p>{educationData[eduStage].Location}</p>
              </motion.div>
            </motion.div>
          )}

          {/* Skills */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Skills & Expertise</h3>
              <ul className="skills-list colorful-hover">
                <li> <FaCode /> Frontend: HTML, CSS, JavaScript, React</li>
                <li> <FaCode /> Backend: Node.js, Express.js</li>
                <li> <FaCode /> Database: MySQL, SQLite, MongoDB</li>
                <li> <FaCode /> Tools: Git & GitHub, Bootstrap</li>
                <li> <FaCode /> API Testing: Postman</li>
              </ul>
            </motion.div>
          )}

          {/* Interests */}
          {activeTab === "interests" && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Interests</h3>
              <ul className="interests-list colorful-hover">
                <li><FaPaintBrush /> Building modern web apps</li>
                <li><FaRocket /> Exploring new technologies</li>
                <li><FaMagic /> UI/UX design with animations</li>
                <li><FaPuzzlePiece /> Problem solving & DSA</li>
                <li><FaRobot /> Machine Learning & AI</li>
                <li><FaGlobe /> Fullstack Applications for real-world solutions</li>
              </ul>
            </motion.div>
          )}

          {/* Experience */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              className="experience-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
            >
              <h3>Experience & Knowledge</h3>
              <ul className="experience-list colorful-hover">
                <li><FaRobot /> Machine Learning Fundamentals</li>
                <li><FaCode /> Python Libraries: Numpy, Pandas, Matplotlib</li>
                <li><FaCode /> Java: OOPs, Servlets, JSP, Spring Boot, Hibernate</li>
                <li><FaCode /> Hands-on with React, Node, Express</li>
                <li><FaCode /> Built projects integrating APIs & Databases</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="section-navigation">
  <a href="#home" className="nav-btn back-btn">Back</a>
  <a href="#skills" className="nav-btn next-btn">Next</a>
</div>

    </section>
  );
};

export default About;
