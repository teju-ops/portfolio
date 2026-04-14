import React, { useRef } from "react";
import { projects } from "../constants";

export default function Projects({ addReveal }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 440, behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="projects" className="section-projects">
        <div className="section-inner">
          <div className="projects-header">
            <div>
              <h2 className="section-title reveal" ref={addReveal} style={{ marginBottom: 0 }}>Featured Projects</h2>
              <p className="projects-subtitle">A selection of my technical journey and solutions.</p>
            </div>
            <div className="carousel-btns">
              <button className="carousel-btn" onClick={() => scrollCarousel(-1)}>‹</button>
              <button className="carousel-btn" onClick={() => scrollCarousel(1)}>›</button>
            </div>
          </div>
          <div className="carousel-track" ref={carouselRef}>
            {projects.map((p) => (
              <div key={p.title} className="project-card">
                <div className="project-img" style={{ background: p.bg }}>
                  <img src={p.img} alt={p.title} />
                  {p.badge && <span className="project-badge">{p.badge}</span>}
                </div>
                <div className="project-body">
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tags">
                    {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IEEE Publication Banner */}
      <section className="section-ieee">
        <div className="ieee-inner">
          <span className="ieee-icon">📄</span>
          <div>
            <div className="ieee-label">IEEE Paper Publication</div>
            <div className="ieee-title">5 Stages of MIPS Processor</div>
            <div className="ieee-desc">
              Authored an IEEE paper detailing the design and implementation of a 5-stage pipelined MIPS processor,
              focusing on instruction execution, pipeline stages, and performance optimization.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
