import React, { useState, useEffect } from "react";
import "../styles/projects.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../scripts/balloons.js"; // balloons animation

import devjobsImg from "../assets/images/devjobs.png"; 
import loginform from "../assets/images/login-form.png";
import lotteryticket from "../assets/images/lottery-ticket.png";
import restaurentapp from "../assets/images/restaurent-app.png";
import skillsetdesign from "../assets/images/skillset-design.png";
import smarthealth from "../assets/images/smart-health.png";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // initialize balloons after component mounts
    if (window.initBalloons) {
      window.initBalloons();
    }
  }, []);

  const categories = ["All", "React", "Javascript", "HTML/CSS", "Bootstrap"];
  const categoryMapping = {
    "All": [],
    "React": ["React", "React.js"],
    "Javascript": ["Javascript"],
    "HTML/CSS": ["HTML", "CSS"],
    "Bootstrap": ["Bootstrap"]
  };

  const projects = [
    {
      title: "TechTalent Finder Dashboard",
      desc: "Responsive, user-friendly platform to explore tech job opportunities efficiently with advanced filters.",
      tech: ["HTML", "CSS", "Bootstrap"],
      github: "https://github.com/Avivek12/devjobs-ui-dashboard",
      live: "https://devjobs-ui-dashboard.vercel.app/",
      img: devjobsImg,
    },
    {
      title: "Raffle for Agricultural Land",
      desc: "Interactive web app for land raffle, allowing ticket purchase, winner announcement, and smooth UX.",
      tech: ["React.js", "Javascript", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/Avivek12/ticket-chance",
      live: "https://ticket-chance.vercel.app/",
      img: lotteryticket,
    },
    {
      title: "SmartHealth Companion",
      desc: "Healthcare platform offering appointments, wellness tips, and secure doctor consultations.",
      tech: ["React", "Bootstrap"],
      github: "https://github.com/Avivek12/MyHealthCompanion",
      live: "https://my-health-companion.vercel.app/",
      img: smarthealth,
    },
    {
      title: "User Registration Login Form",
      desc: "Responsive login/signup page demonstrating form handling, input validation, and clean UI design.",
      tech: ["Javascript", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/Avivek12/web-page-login",
      live: "https://web-page-login-nine.vercel.app/",
      img: loginform,
    },
    {
      title: "Interactive Restaurant Web Application",
      desc: "Modern restaurant website with engaging visuals, easy menu navigation, offers, and smooth UX.",
      tech: ["Javascript", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/Avivek12/Restaurent-Web-Page-Better-User-Experience",
      live: "https://restaurent-web-page-better-user-experience.vercel.app/",
      img: restaurentapp,
    },
    {
      title: "Personal Skillset Website",
      desc: "Skill-portfolio website showcasing my skills, projects, and interests in a visually engaging way.",
      tech: ["Javascript", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/Avivek12/My-Skillset-Website",
      live: "https://my-skillset-website.vercel.app/",
      img: skillsetdesign,
    },
  ];

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    return project.tech.some(t => categoryMapping[activeCategory].includes(t));
  });

  return (
    <section className="projects-section" id="projects">
      {/* Balloons Container */}
      <div className="balloons-container"></div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title" data-aos="fade-down">Projects</h2>

        <div className="projects-nav" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row g-4 mt-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <div key={idx} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="project-card glass-card">
                  <div className="project-img-wrapper">
                    <img src={project.img} alt={project.title} className="project-img" />
                  </div>
                  <div className="project-info">
                    <h5 className="project-title">{project.title}</h5>
                    <p className="project-desc">{project.desc}</p>
                    <div className="tech-list">
                      {project.tech.map((t, i) => (
                        <span key={i} className={`tech-pill tech-${i}`}>{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-live">Live Demo</a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-github">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects-msg" data-aos="fade-up">No projects found in this category.</p>
          )}
        </div>
      </div>

      <div className="section-navigation">
        <a href="#skills" className="nav-btn back-btn">Back</a>
        <a href="#contact" className="nav-btn next-btn">Next</a>
      </div>
    </section>
  );
};

export default Projects;
