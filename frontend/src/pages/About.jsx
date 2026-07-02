import React, { useEffect, useState } from "react";
import { getProfile } from "../api";
import { FaGraduationCap, FaCertificate, FaLocationDot, FaCodeBranch } from "react-icons/fa6";

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(console.error);
  }, []);

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Building <span className="gradient-text">Cloud-Native</span> Solutions</h2>
            <div className="about-text">
              <p>Hello, I'm <strong>Tanuj Nimkar</strong>, an AWS Certified DevOps Engineer passionate about building scalable, secure, and automated cloud infrastructure.</p>
              <p>I specialize in <strong>AWS, Kubernetes, Terraform, Docker, Jenkins, GitHub Actions, ArgoCD, Helm</strong>, and DevSecOps practices such as code quality gates and container vulnerability scanning.</p>
              <p>{profile?.summary}</p>
            </div>
            <div className="facts-grid">
              <div className="fact-card"><FaGraduationCap /><h4>MCA Graduate</h4><p>G.H. Raisoni College of Engineering</p></div>
              <div className="fact-card"><FaCertificate /><h4>AWS Certified</h4><p>SAA-C03 & CLF-C02</p></div>
              <div className="fact-card"><FaLocationDot /><h4>Based In</h4><p>{profile?.location || "Nagpur, India"}</p></div>
              <div className="fact-card"><FaCodeBranch /><h4>8+ Projects</h4><p>Cloud & DevOps on GitHub</p></div>
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-head">
              <span className="t1"></span><span className="t2"></span><span className="t3"></span>
            </div>
            <div className="terminal-body">
              <div><span className="c2">tanuj@devops</span>:<span className="c3">~$</span> whoami</div>
              <div className="c1">DevOps Engineer | AWS Certified</div>
              <br />
              <div><span className="c2">tanuj@devops</span>:<span className="c3">~$</span> kubectl get pods</div>
              <div className="c1">✓ e-commerce-app     Running</div>
              <div className="c1">✓ cicd-pipeline      Running</div>
              <div className="c1">✓ gitops-platform    Running</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}