import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Tejaswini M.</p>
        <div className="footer-links">
          <a href="https://github.com/teju-ops" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:tejumahajan1008@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
