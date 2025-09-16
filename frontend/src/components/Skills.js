import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Needed for animations
import "../styles/skills.css";
import "../styles/animations.css";
import "../scripts/skills-bg.js"; // Interactive background

import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiSqlite } from "react-icons/si";


const Skills = () => {
  const sectionRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState("HTML/CSS");

  // Primary skill data
  const primarySkills = [
    { name: "HTML/CSS", icon: <FaHtml5 />, level: 95, short: "Semantic markup & modern responsive styling." },
    { name: "JavaScript", icon: <SiJavascript />, level: 90, short: "ES6+, DOM, async patterns & modular architecture." },
    { name: "ReactJS", icon: <FaReact />, level: 88, short: "Component design, hooks, state management & performance." },
    { name: "NodeJS/Express", icon: <FaNodeJs />, level: 82, short: "RESTful APIs, middleware, authentication and server design." },
    { name: "SQLite", icon: <SiSqlite />, level: 78, short: "Embedded relational DB design & query optimisation." },
  ];

  // Trigger animations + interactive background
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("is-visible"));

    if (window.initSkillsBg) window.initSkillsBg();
  }, []);

  return (
    <section className="skills-section advanced-skills" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-center">Technical Proficiencies & Domain Expertise</h2>
        <p className="section-sub text-center">
          Click on a skill below to view detailed information about that technology.
        </p>

        {/* Tabs for Primary Skills */}
        <div className="primary-skills-tabs">
          {primarySkills.map((skill) => (
            <button
              key={skill.name}
              className={`primary-tab ${activeSkill === skill.name ? "active" : ""}`}
              onClick={() => setActiveSkill(skill.name)}
            >
              {skill.icon} {skill.name}
            </button>
          ))}
        </div>

        {/* Active Skill Card */}
        <AnimatePresence mode="wait">
          {primarySkills.map((skill) =>
            activeSkill === skill.name ? (
              <motion.div
                key={skill.name}
                className="active-skill-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="skill-circle-wrap">
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="radial">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        style={{ strokeDasharray: `${skill.level}, 100` }}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="percentage">{skill.level}%</text>
                    </svg>
                  </div>
                </div>
                <div className="skill-meta">
                  <h5 className="skill-title">{skill.name}</h5>
                  <p className="skill-desc">{skill.short}</p>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
      <div className="section-navigation">
  <a href="#about" className="nav-btn back-btn">Back</a>
  <a href="#projects" className="nav-btn next-btn">Next</a>
</div>

      {/* Interactive particle background */}
      <canvas id="skills-bg-canvas" className="skills-bg" aria-hidden="true" />
      

    </section>
  );
};

export default Skills;
