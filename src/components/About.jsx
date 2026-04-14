import React from "react";
import { internships } from "../constants";

export default function About({ addReveal }) {
  return (
    <section id="about" className="section-about">
      <div className="section-inner">
        <div className="about-grid">
          <div>
            <h2 className="section-title reveal" ref={addReveal}>About</h2>
            <div className="edu-card reveal" ref={addReveal}>
              <div className="edu-label">Education</div>
              <div className="edu-school">Dayananda Sagar College of Engineering</div>
              <div className="edu-dept">BE – Electronics &amp; Telecommunication</div>
              <div className="edu-meta">
                <span className="cgpa-badge">CGPA: 7.8</span>
                <span className="edu-year">2021 – 2025</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="internship-title reveal" ref={addReveal}>Professional Internships</h3>
            <div className="timeline">
              {internships.map((intern, i) => (
                <div key={i} className={`timeline-item reveal reveal-delay-${i + 1}`} ref={addReveal}>
                  <div className="timeline-dot" />
                  <div className="intern-card">
                    <div className="intern-header">
                      <span className="intern-role">{intern.role}</span>
                      <span className="intern-date">{intern.date}</span>
                    </div>
                    <div className="intern-company">{intern.company}</div>
                    <div className="intern-desc">{intern.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
