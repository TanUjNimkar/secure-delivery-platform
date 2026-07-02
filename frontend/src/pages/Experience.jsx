import React, { useEffect, useState } from "react";
import { getExperience } from "../api";
import Loader from "../components/Loader";

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then(setExperience)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section id="experience">
      <div className="container">
        <span className="section-tag">Experience</span>
        <h2 className="section-title">My Professional <span className="gradient-text">Journey</span></h2>
        <p className="section-desc">Hands-on experience automating infrastructure and delivery pipelines.</p>
        <div className="timeline">
          {experience.map((exp) => (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-card">
                <span className="badge">{exp.duration}</span>
                <h3>{exp.role}</h3>
                <div className="company">{exp.company} · {exp.location}</div>
                <ul>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}