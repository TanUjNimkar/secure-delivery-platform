import React from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaGithub } from "react-icons/fa6";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <span className="section-tag">Contact</span>
        <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
        <p className="section-desc">Have an opportunity or want to collaborate? Send me a message.</p>
        <div className="contact-grid">
          <div className="contact-info-card">
            <div className="contact-info-item">
              <div className="icon"><FaEnvelope /></div>
              <div><h4>Email</h4><a href="mailto:tanujnimkar.cloud@gmail.com">tanujnimkar.cloud@gmail.com</a></div>
            </div>
            <div className="contact-info-item">
              <div className="icon"><FaPhone /></div>
              <div><h4>Phone</h4><a href="tel:+918180016769">+91 81800 16769</a></div>
            </div>
            <div className="contact-info-item">
              <div className="icon"><FaLocationDot /></div>
              <div><h4>Location</h4><p>Nagpur, India</p></div>
            </div>
            <div className="contact-info-item">
              <div className="icon"><FaGithub /></div>
              <div><h4>GitHub</h4><a href="https://github.com/TanUjNimkar" target="_blank" rel="noreferrer">github.com/TanUjNimkar</a></div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}