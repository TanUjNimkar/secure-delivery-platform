import React, { useEffect, useState } from "react";
import { getCertifications } from "../api";
import Loader from "../components/Loader";
import { FaAws, FaCloud, FaGraduationCap } from "react-icons/fa6";

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCertifications()
      .then(setCerts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section id="certifications">
      <div className="container">
        <span className="section-tag">Certifications</span>
        <h2 className="section-title">Verified <span className="gradient-text">Credentials</span></h2>
        <p className="section-desc">Industry-recognized AWS certifications validating cloud expertise.</p>
        <div className="cert-grid">
          {certs.map((c) => (
            <div className="cert-card" key={c.id}>
              <div className="cert-badge">{c.code?.includes("SAA") ? <FaAws /> : <FaCloud />}</div>
              <h3>{c.title}</h3>
              <div className="code">{c.code}</div>
              <div className="issuer">{c.issuer}</div>
            </div>
          ))}
        </div>

        <div className="edu-section">
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic <span className="gradient-text">Background</span></h2>
          <div className="edu-grid">
            <div className="edu-card">
              <FaGraduationCap />
              <div>
                <h4>Master of Computer Applications (MCA)</h4>
                <p>G.H. Raisoni College of Engineering, Nagpur</p>
                <span className="year">2023 – 2025</span>
              </div>
            </div>
            <div className="edu-card">
              <FaGraduationCap />
              <div>
                <h4>Bachelor of Computer Applications (BCA)</h4>
                <p>Brijlal Biyani Science College, Amravati</p>
                <span className="year">2020 – 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}