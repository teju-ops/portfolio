import React from 'react';

const groups = [
  { title: 'Frontend Technologies', cls: 'span-4', items: ['React.js', 'JavaScript', 'HTML5', 'CSS3'] },
  { title: 'Programming Languages', cls: 'span-2', items: ['Python', 'JavaScript'], plain: true },
  { title: 'Backend & Data', cls: 'span-3', items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs'] },
  { title: 'Development Tools', cls: 'span-3', items: ['Git', 'GitHub'] },
];

function Proficiency() {
  return (
    <div className="container">
      <h2 className="section-title reveal">Proficiency</h2>
      <div className="bento">
        {groups.map((g, i) => (
          <div key={g.title} className={`card bento-card ${g.cls} reveal`} style={{ '--d': `${i * 90}ms` }}>
            <h3>{g.title}</h3>
            <div className="chips">
              {g.items.map((s) => (
                <span key={s} className={`chip chip-${i % 3}`}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proficiency;
