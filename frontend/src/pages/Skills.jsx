import React, { useEffect, useState } from "react";
import { getSkills } from "../api";
import SkillBar from "../components/SkillBar";
import Loader from "../components/Loader";
import { FaAws, FaLayerGroup, FaDocker, FaArrowsSpin, FaChartLine, FaShieldHalved } from "react-icons/fa6";

const categoryMeta = {
  Cloud: { icon: <FaAws />, title: "Cloud (AWS)" },
  Infrastructure: { icon: <FaLayerGroup />, title: "Infrastructure" },
  Containers: { icon: <FaDocker />, title: "Containers" },
  "CI/CD": { icon: <FaArrowsSpin />, title: "CI/CD & GitOps" },
  Monitoring: { icon: <FaChartLine />, title: "Monitoring" },
  Security: { icon: <FaShieldHalved />, title: "Security" },
  Programming: { icon: <FaShieldHalved />, title: "Programming & Scripting" },
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  if (loading) return <Loader />;

  return (
    <section id="skills" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <span className="section-tag">Skills</span>
        <h2 className="section-title">My <span className="gradient-text">Technical</span> Toolbox</h2>
        <p className="section-desc">Technologies and tools I use to design, automate, and secure cloud-native infrastructure.</p>
        <div className="skills-grid">
          {Object.entries(grouped).map(([category, items]) => (
            <div className="skill-card" key={category}>
              <div className="skill-card-head">
                <div className="icon">{categoryMeta[category]?.icon}</div>
                <h3>{categoryMeta[category]?.title || category}</h3>
              </div>
              {items.map((s) => (
                <SkillBar key={s.id} skill={s.skill} level={s.level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}