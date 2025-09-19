import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";

function PortfolioNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="dark"
      variant="dark"
      className={`portfolio-navbar  ${scrolled ? "navbar-scrolled" : ""}`}
    >
      {/* Use one Container to align with sections */}
      <Container>
        <Navbar.Brand onClick={() => scrollToSection("home")}>
          Ananthula Vivekkumar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="portfolio-navbar" />
        <Navbar.Collapse id="portfolio-navbar">
          <Nav className="ms-auto">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <Nav.Link key={item} onClick={() => scrollToSection(item)}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PortfolioNavbar;
