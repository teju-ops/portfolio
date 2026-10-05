import React, { useState } from 'react';
import { useActiveSection } from '../useReveal';

const items = [
  { id: 'home', label: 'Home' },
  { id: 'proficiency', label: 'Proficiency' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  useActiveSection(['home', 'proficiency', 'projects', 'about', 'contact'], setActive);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('home')}>Tejaswini M</button>
        <button
          className={`menu-icon ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-menu ${open ? 'active' : ''}`}>
          {items.map((i) => (
            <li key={i.id}>
              <button className={`nav-link ${active === i.id ? 'current' : ''}`} onClick={() => go(i.id)}>
                {i.label}
              </button>
            </li>
          ))}
          <li>
            <button className="btn btn-primary btn-sm" onClick={() => go('contact')}>Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
