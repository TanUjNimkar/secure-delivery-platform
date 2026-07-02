import React, { useEffect, useState } from "react";
import { getProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";

const categories = [
  "All", "Cloud Infrastructure", "CI/CD", "DevSecOps",
  "Kubernetes", "Cloud Native", "Infrastructure as Code", "Full-Stack",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects(filter === "All" ? null : filter)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <section id="projects" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
        <p className="section-desc">Production-grade cloud, DevOps, and GitOps projects built end-to-end.</p>

        <div className="filter-bar">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? "active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}