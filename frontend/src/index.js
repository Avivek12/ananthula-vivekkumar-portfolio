import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";
import "./styles/animations.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/contact.css";
import "./styles/footer.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
