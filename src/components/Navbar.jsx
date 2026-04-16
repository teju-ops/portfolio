import React from "react";

export default function Navbar({ activeSection, isAdminPage = false, onBrandClick, onAdminClick, scrollTo }) {
  const sections = ["home", "proficiency", "projects", "about", "contact"];

  return (
    <nav>
      <div className="nav-inner">
        <div className="brand-wrap">
          <button className="brand-name" type="button" onClick={onBrandClick}>
            Tejaswini M
          </button>
          <button
            className={`admin-logo-button ${isAdminPage ? "active" : ""}`}
            type="button"
            onClick={onAdminClick}
            aria-label="Open admin portal"
            title="Open admin portal"
          >
            TM
          </button>
        </div>
        <div className="nav-links">
          {sections.map((section) => (
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
