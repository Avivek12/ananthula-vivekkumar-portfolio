import React, { useState, useEffect } from "react";
import "../styles/contact.css";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaHeart } from "react-icons/fa";

// Use environment variable for API URL; empty string for production (same domain)
const API_URL = ""; // empty string works for same domain


function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Fetch initial like count
  useEffect(() => {
    fetch(`${API_URL}/api/feedback/likes`)
      .then(res => res.json())
      .then(data => setLikes(data.likes))
      .catch(() => setLikes(0));

    // Check if user already liked
    if (localStorage.getItem("likedContact") === "true") setLiked(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setSuccess(true);
        setFormData({ fullName: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => console.error(err));
  };

  const handleLike = () => {
    if (liked) {
      alert("You already liked!");
      return;
    }

    fetch(`${API_URL}/api/feedback/like`, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes);
        localStorage.setItem("likedContact", "true");
        setLiked(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="contact" id="contact">
      {/* Feedback Like Section */}
      <div className="feedback">
        <button onClick={handleLike} className="like-btn" disabled={liked}>
          <FaHeart className="like-icon" /> {liked ? "Liked" : "Like"}
        </button>
        <span className="like-count">{likes} Likes</span>
      </div>

      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit" className="btn btn-contact">Send Message</button>
          {success && <div className="success-msg animate-fade-in">Message Sent!</div>}
        </form>
      </div>

      {/* Contact Links */}
      <div className="contact-info-container">
        <h2 className="contact-info-title">Connect With Me</h2>
        <div className="contact-links">
          <a href="https://github.com/Avivek12" target="_blank" rel="noopener noreferrer" className="contact-card github">
            <FaGithub className="contact-icon" /> Github
          </a>
          <a href="https://www.linkedin.com/in/vivekkumar-a-8123911b7" target="_blank" rel="noopener noreferrer" className="contact-card linkedin">
            <FaLinkedin className="contact-icon" /> LinkedIn
          </a>
          <a href="https://twitter.com/Vivekananthula" target="_blank" rel="noopener noreferrer" className="contact-card twitter">
            <FaTwitter className="contact-icon" /> Twitter
          </a>
          <a href="https://wa.me/919618021890" target="_blank" rel="noopener noreferrer" className="contact-card whatsapp">
            <FaWhatsapp className="contact-icon" /> Whatsapp
          </a>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <div className="contact-input">
            <label>Email Address</label>
            <input type="text" value="ananthulavivekumar@gmail.com" readOnly />
          </div>
          <div className="contact-input">
            <label>Full Name</label>
            <input type="text" value="Ananthula Vivekkumar" readOnly />
          </div>
          <div className="contact-input">
            <label>Location</label>
            <input type="text" value="Hyderabad, India" readOnly />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
