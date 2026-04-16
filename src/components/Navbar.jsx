import React from "react";

export default function Navbar({ activeSection, scrollTo }) {
  return (
    <nav>
      <div className="nav-inner">
        <span className="logo">Tejaswin.M</span>
        <div className="nav-links">
          {["home", "proficiency", "projects", "about", "contact", "admin"].map((section) => (
            <button
              key={section}
              className={`nav-link ${activeSection === section ? "active" : ""}`}
              onClick={() => scrollTo(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <a
            className="btn-resume"
            href="https://github.com/teju-ops"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
