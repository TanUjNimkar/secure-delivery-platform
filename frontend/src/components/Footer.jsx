import React from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-socials">
          <a href="https://github.com/TanUjNimkar" target="_blank" rel="noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="social-icon">
            <FaLinkedinIn />
          </a>
          <a href="mailto:tanujnimkar.cloud@gmail.com" className="social-icon">
            <FaEnvelope />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Tanuj Nimkar. Built with React, Flask, Docker & Nginx.</p>
      </div>
    </footer>
  );
}