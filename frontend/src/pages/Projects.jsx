import React, { useEffect, useState } from "react";
import { getProjects } from "../api";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";

const categories = [
  "All",
  "Cloud Infrastructure",
  "CI/CD",
  "DevSecOps",
  "Kubernetes",
  "Cloud Native",
  "Infrastructure as Code",
  "Full-Stack",
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const data = await getProjects(
          filter === "All" ? null : filter
        );

        console.log("Projects API Response:", data);

        setProjects(data);
      } catch (err) {
        console.error("Projects Error:", err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [filter]);

  return (
    <section id="projects" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <span className="section-tag">Portfolio</span>

        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <p className="section-desc">
          Production-grade cloud, DevOps, and GitOps projects built end-to-end.
        </p>

        <div className="filter-bar">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                filter === category ? "active" : ""
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <p style={{ color: "red", marginTop: "2rem" }}>{error}</p>
        ) : projects.length === 0 ? (
          <p style={{ marginTop: "2rem" }}>
            No projects found.
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}