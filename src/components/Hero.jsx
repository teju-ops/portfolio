import React from "react";

export default function Hero({ scrollTo }) {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <div>
          <span className="hero-badge">Full Stack Developer</span>
          <h1 className="hero-title">Tejaswini K<br />Mahajan</h1>
          <p className="hero-desc">
            A passionate developer focused on building resilient software systems and intelligent user experiences.
            Currently pursuing Electronics and Telecommunication at DSCE, bridging the gap between hardware efficiency
            and modern software architecture.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Projects →
            </button>
            <a className="btn-secondary" href="mailto:tejumahajan1008@gmail.com">
              Download Resume
            </a>
          </div>
        </div>
        <div className="hero-img-wrap">
          <div className="hero-img-ring">
            <img
              src="/assets/profile.jpg"
              alt="Tejaswini K Mahajan"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
