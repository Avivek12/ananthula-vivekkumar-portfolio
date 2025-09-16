import React, { useState, useEffect } from "react";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Fetch initial like count from backend
    fetch("http://localhost:5000/api/feedback/likes")
      .then(res => res.json())
      .then(data => setLikes(data.likes))
      .catch(() => setLikes(0));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/messages", {
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
    // Check if user already liked
    if (localStorage.getItem("likedContact") === "true") {
      alert("You already liked!");
      return;
    }

    fetch("http://localhost:5000/api/feedback/like", { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setLikes(data.likes);
        localStorage.setItem("likedContact", "true"); // mark as liked
      })
      .catch(err => console.error(err));
  };

  return (
    <section className="contact" id="contact">
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

        {/* Feedback Like Section */}
        <div className="feedback">
          <button onClick={handleLike} className="like-btn">👍 Like</button>
          <span className="like-count">{likes} Likes</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;
