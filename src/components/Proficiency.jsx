import React from "react";

export default function Proficiency({ addReveal }) {
  return (
    <section id="proficiency" className="section-proficiency">
      <div className="section-inner">
        <h2 className="section-title reveal" ref={addReveal}>Proficiency</h2>
        <div className="skill-grid">
          {/* AI/ML */}
          <div className="skill-card large reveal" ref={addReveal}>
            <div className="skill-card-title">
              <span style={{ fontSize: "1.5rem" }}>🧠</span> AI/ML
            </div>
            <div>
              {["Machine Learning", "NLP", "Deep Learning", "Scikit-learn", "TensorFlow", "PyTorch"].map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </div>
          {/* Languages */}
          <div className="skill-card reveal reveal-delay-1" ref={addReveal}>
            <div className="skill-card-title">Programming Languages</div>
            <ul className="tag-list">
              {["Python", "JavaScript", "SQL"].map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
          {/* Frontend */}
          <div className="skill-card reveal reveal-delay-2" ref={addReveal}>
            <div className="skill-card-title">Frontend Technologies</div>
            <div>
              {["HTML5", "CSS3", "React.js"].map((t) => <span key={t} className="tag-sm">{t}</span>)}
            </div>
          </div>
          {/* Backend */}
          <div className="skill-card reveal reveal-delay-1" ref={addReveal}>
            <div className="skill-card-title">Backend &amp; Data</div>
            <div className="backend-grid">
              <div>
                <div className="backend-label">Engines</div>
                <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>Node.js</div>
                <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>Express.js</div>
              </div>
              <div>
                <div className="backend-label">Storage</div>
                <div style={{ fontStyle: "italic", fontSize: "0.9rem" }}>MongoDB</div>
              </div>
            </div>
          </div>
          {/* Tools */}
          <div className="skill-card reveal reveal-delay-2" ref={addReveal}>
            <div className="skill-card-title">Development Tools</div>
            <div className="tools-row">
              <div className="tool-item">
                <span className="tool-icon">⌨️</span>
                <span className="tool-label">VS Code</span>
              </div>
              <div className="tool-item">
                <span className="tool-icon">🐙</span>
                <span className="tool-label">GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
