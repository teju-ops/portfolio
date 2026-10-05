import React, { useRef } from 'react';

const projects = [
  {
    title: 'TaskFlow – Workflow Management Web Application',
    tone: 'a',
    description: [
      'Developed full-stack features in a MERN application, building React.js UI, Express.js REST APIs and MongoDB schemas for task, user and reporting modules used by multiple users.',
      'Built reusable React components and responsive layouts, cutting duplicate UI code and keeping the UI consistent across modules.',
      'Took ownership of reporting module end to end - requirements, UI, API, MongoDB and delivered it to production.',
      'Reduced dashboard load time by adding pagination, indexing MongoDB fields and removing unnecessary React re-renders.',
      'Fixed API integration failure (CORS and payload mismatch) by tracing network calls and correcting server validation.',
      'Worked with senior developers, QA team and product team through daily standups, PR reviews and sprint planning.',
      'Tech: React.js, Node.js, Express.js, MongoDB, Mongoose, REST APIs, Git/GitHub. Used debounced search and indexed queries.',
    ],
  },
  {
    title: 'Habitty Application (Live Demo)',
    tone: 'b',
    link: 'https://habitt-y.netlify.app/',
    description: [
      'Developed a Python-based habit-tracking application with a minimalist interface and user login/password authentication.',
      'Implemented CRUD operations for creating, updating, tracking, and managing user habits.',
      'Structured application functionality using modular Python code to improve maintainability and usability.',
      'Tech: Python, HTML5',
    ],
  },
  {
    title: '32-Bit MIPS Processor',
    tone: 'c',
    description: [
      'Designed a 5-stage pipelined processor to improve execution efficiency.',
      'Published an IEEE paper on processor design and performance analysis.',
    ],
  },
];

function Projects() {
  const track = useRef(null);
  const scroll = (dir) => {
    const t = track.current;
    if (t) t.scrollBy({ left: dir * (t.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="projects-head reveal">
        <h2 className="section-title">Projects</h2>
        <div className="arrows">
          <button className="round-btn" onClick={() => scroll(-1)} aria-label="Previous project">‹</button>
          <button className="round-btn" onClick={() => scroll(1)} aria-label="Next project">›</button>
        </div>
      </div>
      <div className="track" ref={track}>
        {projects.map((p, i) => (
          <article key={p.title} className="card project reveal" style={{ '--d': `${i * 100}ms` }}>
            <div className={`project-visual tone-${p.tone}`} aria-hidden="true">
              <svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
                <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".5">
                  <circle cx="40" cy="30" r="18" /><circle cx="100" cy="62" r="26" />
                  <rect x="140" y="14" width="36" height="36" rx="8" />
                  <path d="M10 85 L60 70 L110 90 L190 60" />
                </g>
              </svg>
            </div>
            <div className="project-body">
              <h3>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a>
                ) : p.title}
              </h3>
              <ul>
                {p.description.map((d) => <li key={d}>{d}</li>)}
              </ul>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Live Demo ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Projects;
