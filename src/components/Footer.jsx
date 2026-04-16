import React from "react";

export default function Footer({ scrollTo }) {
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-copy">© 2026 Tejaswini K Mahajan. Built with Precision.</span>
        <div className="footer-links">
          <button className="footer-link footer-button" onClick={() => scrollTo("projects")}>Projects</button>
          <button className="footer-link footer-button" onClick={() => scrollTo("admin")}>Inbox</button>
          <a className="footer-link" href="https://github.com/teju-ops" target="_blank" rel="noreferrer">GitHub</a>
          <button className="footer-link footer-button" onClick={() => scrollTo("contact")}>Contact</button>
          <a className="footer-link" href="mailto:tejumahajan1008@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
