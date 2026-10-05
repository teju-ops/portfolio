import React from 'react';

function Home() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="container hero-grid">
      <div className="hero-text">
        <p className="eyebrow hero-in" style={{ '--d': '0ms' }}>Software Developer</p>
        <h1 className="hero-in" style={{ '--d': '100ms' }}>Tejaswini<br />M</h1>
        <p className="hero-desc hero-in" style={{ '--d': '220ms' }}>
          Full-stack developer passionate about building scalable web applications
          with MERN stack and Python. Currently working at Flamboyanz Software
          Pvt. Ltd. as a Software Developer.
        </p>
        <div className="hero-actions hero-in" style={{ '--d': '340ms' }}>
          <button className="btn btn-primary" onClick={() => go('projects')}>
            View Projects <span className="arrow">→</span>
          </button>
          <a className="btn btn-soft" href="/Tejaswini_K_Mahajan_Resume.pdf" download="Tejaswini_K_Mahajan_Resume.pdf">
            Download Resume
          </a>
        </div>
      </div>
      <div className="hero-photo hero-in" style={{ '--d': '200ms' }}>
        <div className="photo-ring">
          <img src="/tej.jpeg" alt="Tejaswini M" />
        </div>
      </div>
    </div>
  );
}

export default Home;
