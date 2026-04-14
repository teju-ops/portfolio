import React from "react";

export default function Navbar({ activeSection, scrollTo }) {
  return (
    <nav>
      <div className="nav-inner">
        <span className="logo">Tejaswin.M</span>
        <div className="nav-links">
          {["home", "proficiency", "about", "contact"].map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <a
            className="btn-resume"
            href="https://github.com/teju-ops"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
