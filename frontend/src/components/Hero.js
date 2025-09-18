import React, { useEffect, useState } from "react";
import "../styles/hero.css";
import ProfileImg from "../assets/images/profile_photo.jpg";
import ResumeFile from "../assets/images/VIVEKKUMAR_RESUME3.pdf"; // import resume (can also be PDF)
import { FaNodeJs, FaDatabase, FaLaptopCode, FaJs, FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaDownload } from "react-icons/fa";

import { initSparkles } from "../scripts/hero-sparkles";
import { initTyping } from "../scripts/typing"; // Import typing

const descriptions = [
  { text: "Front-End Developer", icon: <FaLaptopCode /> },
  { text: "Backend Developer", icon: <FaNodeJs /> },
  { text: "Fullstack Developer", icon: <FaReact /> },
  { text: "UI Developer", icon: <FaLaptopCode /> },
  { text: "Web Developer", icon: <FaLaptopCode /> }
];

function AnimatedDescription({ text, icon, index }) {
  return (
    <div className={`floating-desc float-${index}`} style={{ zIndex: 1 }}>
      {icon} {text}
    </div>
  );
}

function Hero() {
  const [showDescriptions, setShowDescriptions] = useState(true);

  const toggleDescriptions = () => setShowDescriptions(!showDescriptions);

  useEffect(() => {
    initSparkles();
    initTyping();
  }, []);

  return (
    <section className="hero" id="home">
      
      <canvas id="hero-sparkles"></canvas>

      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 hero-text">
            <h1>
              <span className="greet-heading">Hello, I'm</span>{" "}
              <span className="name-highlight name-box">Vivekkumar</span>{" "}
              <p><span className="typing text-gradient"></span></p>
            </h1>

            {/* Resume Download Button */}
            <div className="resume-btn-container">
              <a href={ResumeFile} download="Vivekkumar_Resume" className="btn hero-btn1">
                <FaDownload className="desc-icon" /> Download Resume
              </a>
            </div>
          </div>

          <div className="col-md-6 hero-img text-center position-relative">
            <img
              src={ProfileImg}
              alt="Vivekkumar Profile"
              className="img-fluid profile-image"
              onClick={toggleDescriptions}
            />
            <div className="img-caption card-style">
  {/* Background animation layer */}
  <div className="card-bg-animation"></div>

  {/* Name & Nickname */}
  <h4 className="caption-title">Vivekkumar</h4>

  {/* Personal Info */}
  <div className="caption-info">
    <p className="caption-dob">DOB: 17 April 2001</p>
    <p className="caption-location">Hyderabad, India</p>
    <p className="caption-email">ananthulavivekumar@gmail.com</p>
    <p className="caption-phone">+91 9618021890</p>
  </div>

  {/* Skill Badges */}
  <div className="caption-badges">
    <span className="badge">React</span>
    <span className="badge">Node.js</span>
    <span className="badge">JavaScript</span>
    <span className="badge">UI/UX</span>
    <span className="badge">HTML</span>
    <span className="badge">CSS</span>
  </div>
  {/* Short bio / tagline */}
  <p className="caption-text">
    Passionate about building scalable, modern & creative digital experiences
  </p>
  </div>

            {showDescriptions &&
              descriptions.map((desc, index) => {
                if (window.innerWidth <= 768 && index > 2) return null; // Reduce load on mobile
                return <AnimatedDescription key={index} text={desc.text} icon={desc.icon} index={index} />;
              })
            }
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="hero-button-container btn hero-btn" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
          Connect & Collaborate <FaLaptopCode className="desc-icon" />
        </div>

</div>

      {/* Floating Bubble Icons */}
      <div className="bubble-icon node"><FaNodeJs /></div>
      <div className="bubble-icon db"><FaDatabase /></div>
      <div className="bubble-icon laptop"><FaLaptopCode /></div>
      <div className="bubble-icon js"><FaJs /></div>
      <div className="bubble-icon react"><FaReact /></div>
      <div className="bubble-icon html"><FaHtml5 /></div>
      <div className="bubble-icon css"><FaCss3Alt /></div>
      <div className="bubble-icon bootstrap"><FaBootstrap /></div>

      <div className="section-navigation">
        <a href="#navbar" className="nav-btn back-btn">Back</a>
        <a href="#about" className="nav-btn next-btn">Next</a>
      </div>
    </section>
  );
}

export default Hero;
