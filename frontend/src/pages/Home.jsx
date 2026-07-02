import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaPhone, FaDownload, FaDiagramProject } from "react-icons/fa6";
import { FaAws, FaDocker, FaCloud, FaGitAlt, FaCubes, FaUserAstronaut } from "react-icons/fa";

export default function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <FaAws className="floating-icon" style={{ top: "10%", left: "5%" }} />
        <FaDocker className="floating-icon" style={{ top: "65%", left: "10%", color: "var(--accent-2)" }} />
        <FaCloud className="floating-icon" style={{ top: "20%", right: "8%", color: "var(--accent-3)" }} />
        <FaGitAlt className="floating-icon" style={{ top: "70%", right: "15%" }} />
        <FaCubes className="floating-icon" style={{ top: "40%", left: "45%", color: "var(--accent-2)" }} />
      </div>
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge"><span className="dot"></span> Available for opportunities</div>
            <h1>Hi, I'm <span className="gradient-text">Tanuj Nimkar</span></h1>
            <div className="role">AWS Certified DevOps Engineer</div>
            <p className="subtitle">
              Cloud <span className="sep">•</span> Kubernetes <span className="sep">•</span> Terraform
              <span className="sep">•</span> Docker <span className="sep">•</span> Jenkins <span className="sep">•</span> GitOps
            </p>
            <div className="hero-buttons">
              <a href="/resume.pdf" download className="btn btn-primary"><FaDownload /> Download Resume</a>
              <Link to="/projects" className="btn btn-outline"><FaDiagramProject /> View Projects</Link>
            </div>
            <div className="social-row">
              <a href="https://github.com/TanUjNimkar" target="_blank" rel="noreferrer" className="social-icon"><FaGithub /></a>
              <a href="#" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>
              <a href="mailto:tanujnimkar.cloud@gmail.com" className="social-icon"><FaEnvelope /></a>
              <a href="tel:+918180016769" className="social-icon"><FaPhone /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit-badge orbit1"><FaAws style={{ color: "#ff9900" }} /> AWS Certified</div>
            <div className="orbit-badge orbit2">Kubernetes</div>
            <div className="orbit-badge orbit3">CI/CD</div>
            <div className="avatar-ring">
              <div className="avatar-inner">
                <FaUserAstronaut />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}