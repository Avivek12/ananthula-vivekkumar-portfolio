import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { initNavbarStars } from "../scripts/navbar-stars"; // optional canvas stars

function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Initialize navbar stars (optional)
    if (initNavbarStars) initNavbarStars();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section)
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <nav id = "navbar" className={`navbar ${scroll ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-container">
        <div className="navbar-brand" onClick={() => scrollToSection("home")}>
          Vivekkumar Ananthula
        </div>

        {/* Menu Links */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          {["home", "about", "skills", "projects", "contact"].map((section) => (
            <button
              key={section}
              className="nav-link"
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <div
          className={`navbar-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar3"></span>
        </div>
      </div>
      <canvas id="navbar-stars"></canvas>
    </nav>
  );
}

export default Navbar;
