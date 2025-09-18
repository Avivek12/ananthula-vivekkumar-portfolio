import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RecruiterDashboard from "./components/RecruiterDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><Hero /><About /><Skills /><Projects /><Contact /><Footer /></>} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
