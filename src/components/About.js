import React from 'react';

const jobs = [
  {
    company: 'Flamboyanz Software Pvt. Ltd., Bangalore',
    tag: 'Currently Working',
    date: 'Aug 2024 – Present',
    points: [
      'Implemented assigned React pages and basic CRUD APIs under senior developer guidance, fixed 15+ bugs in the first 6 months.',
      'Developed and maintained scalable web applications using React.js, Node.js, Express.js, and MongoDB, following modular and reusable architecture.',
      'Troubleshot application issues and resolved frontend, API integration, and data-handling problems during development and implementation.',
      'Followed reusable coding practices and modular development approaches to build maintainable and scalable application components.',
    ],
  },
  {
    company: 'Beekoder Pvt. Ltd., Bangalore',
    tag: 'Internship',
    date: 'Oct 2023 – Nov 2023',
    points: [
      'Developed responsive user interfaces and job application forms using HTML, CSS, and JavaScript.',
      'Implemented clean layouts and interactive UI elements with a focus on usability and responsive design.',
    ],
  },
];

function About() {
  return (
    <div className="container">
      <h2 className="section-title reveal">About</h2>
      <h3 className="sub-title reveal">Professional Experience</h3>
      <div className="timeline">
        {jobs.map((j, i) => (
          <div key={j.company} className="job card reveal" style={{ '--d': `${i * 120}ms` }}>
            <span className="dot" />
            <div className="job-head">
              <h4>{j.company}</h4>
              <span className="date">{j.date}</span>
            </div>
            <span className={`chip ${i === 0 ? 'chip-2' : 'chip-1'}`}>{j.tag}</span>
            <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
