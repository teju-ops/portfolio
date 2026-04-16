import React from "react";

export default function Hero({ scrollTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div>
          <span className="hero-badge">Full Stack Developer</span>
          <h1 className="hero-title">
            Tejaswini K
            <br />
            Mahajan
          </h1>
          <p className="hero-desc">
            Detail-oriented and result-driven developer with skills in building responsive and user-friendly web
            applications using React.js, HTML, CSS, and JavaScript. Skilled in developing RESTful APIs using Node.js
            and Express.js and working with MongoDB for database management. Strong understanding of component-based
            architecture, state management, API integration, and CRUD operations. Passionate about clean code,
            continuous learning, and scalable full-stack application development.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects →
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>
              Contact Me
            </button>
          </div>
        </div>
        <div className="hero-img-wrap">
          <div className="hero-img-ring">
            <img src="/assets/profile.jpg" alt="Tejaswini K Mahajan" />
          </div>
        </div>
      </div>
    </section>
  );
}
