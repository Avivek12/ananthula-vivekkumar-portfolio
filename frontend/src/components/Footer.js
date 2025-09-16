import React from "react";

import "../styles/footer.css";
import "../styles/animations.css";
function Footer() {
  return (
    <footer id = "footer" className="footer">
      <div className="container text-center">
        <p>© 2025 Vivek. All rights reserved.</p>
        <div className="footer-links">
          <a href="#home" aria-label="Go to Home section">Home</a>
          <a href="#about" aria-label="Go to About section">About</a>
          <a href="#projects" aria-label="Go to Projects section">Projects</a>
          <a href="#contact" aria-label="Go to Contact section">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
