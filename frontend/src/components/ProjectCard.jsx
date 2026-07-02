import React from "react";
import { FaGithub, FaCloud } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <span className="category-pill">{project.category}</span>
      <div className="project-top">
        <div className="project-icon">
          <FaCloud />
        </div>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tech-tags">
        {project.technologies.map((t, i) => (
          <span key={i} className="tech-tag">{t}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>
  );
}