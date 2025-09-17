import React, { useEffect, useState } from "react";
import "../styles/hero.css";
import ProfileImg from "../assets/images/profile_photo.jpg";
import { FaNodeJs, FaDatabase, FaLaptopCode, FaJs, FaReact, FaHtml5, FaCss3Alt, FaBootstrap } from "react-icons/fa";

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
          </div>
          <div className="col-md-6 hero-img text-center position-relative">
            <img
              src={ProfileImg}
              alt="Vivekkumar Profile"
              className="img-fluid profile-image"
              onClick={toggleDescriptions}
            />
            <div className="img-caption">
              <h4>Vivekkumar</h4>
              <p>Passionate about building scalable, modern & creative digital experiences</p>
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
        <div className="hero-button-container">
          <a href="#contact" className="btn hero-btn">
            Connect & Collaborate <FaLaptopCode className="desc-icon" />
          </a>
        </div>
      </div>

      {/* Floating Bubble Icons (replaced orbits) */}
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
  <a href="#abou" className="nav-btn next-btn">Next</a>
</div>
    </section>
  );
}

export default Hero;
