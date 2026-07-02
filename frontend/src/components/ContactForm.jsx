import React, { useState } from "react";
import { postContact } from "../api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // {type, message}
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!EMAIL_REGEX.test(form.email)) {
      setStatus({ type: "error", message: "⚠️ Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await postContact(form);
      setStatus({ type: "success", message: `✅ ${res.message}` });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setStatus({ type: "error", message: `❌ ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" />
        </div>
      </div>
      <div className="form-group">
        <label>Subject</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Job Opportunity" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Write your message..." />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && <div className={`form-msg ${status.type}`}>{status.message}</div>}
    </form>
  );
}