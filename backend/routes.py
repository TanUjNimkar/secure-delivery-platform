from flask import Blueprint, jsonify, request
from database import db
from models import Contact, Project, Skill, Experience, Certification, Visitor
import re

api = Blueprint("api", __name__)

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


# ---------------- PROFILE ----------------
@api.route("/profile", methods=["GET"])
def get_profile():
    return jsonify({
        "name": "Tanuj Nimkar",
        "title": "AWS Certified DevOps Engineer",
        "location": "Nagpur, India",
        "phone": "+91 81800 16769",
        "email": "tanujnimkar.cloud@gmail.com",
        "github": "https://www.linkedin.com/in/tanuj-nimkar",
        "linkedin": "www.linkedin.com/in/tanuj-nimkar",
        "summary": (
            "AWS-certified DevOps Engineer with proven experience designing and deploying "
            "cloud-native infrastructure on AWS, automating end-to-end CI/CD pipelines, and "
            "orchestrating containerized workloads using Kubernetes and ArgoCD."
        ),
    })


# ---------------- PROJECTS ----------------
@api.route("/projects", methods=["GET"])
def get_projects():
    category = request.args.get("category")
    query = Project.query
    if category and category.lower() != "all":
        query = query.filter_by(category=category)
    projects = query.all()
    return jsonify([p.to_dict() for p in projects])


# ---------------- SKILLS ----------------
@api.route("/skills", methods=["GET"])
def get_skills():
    skills = Skill.query.all()
    return jsonify([s.to_dict() for s in skills])


# ---------------- EXPERIENCE ----------------
@api.route("/experience", methods=["GET"])
def get_experience():
    exp = Experience.query.all()
    return jsonify([e.to_dict() for e in exp])


# ---------------- CERTIFICATIONS ----------------
@api.route("/certifications", methods=["GET"])
def get_certifications():
    certs = Certification.query.all()
    return jsonify([c.to_dict() for c in certs])


# ---------------- CONTACT ----------------
@api.route("/contact", methods=["POST"])
def post_contact():
    data = request.get_json(force=True)
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"status": "error", "message": "Name, email and message are required."}), 400

    if not EMAIL_REGEX.match(email):
        return jsonify({"status": "error", "message": "Invalid email address."}), 400

    contact = Contact(name=name, email=email, subject=subject, message=message)
    db.session.add(contact)
    db.session.commit()

    return jsonify({"status": "success", "message": "Your message has been sent!"}), 201


@api.route("/contact", methods=["GET"])
def list_contacts():
    """Admin endpoint — list all messages (secure this in production)."""
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return jsonify([c.to_dict() for c in contacts])


# ---------------- VISITOR COUNTER ----------------
@api.route("/visitors", methods=["GET"])
def get_visitors():
    visitor = Visitor.query.first()
    if not visitor:
        visitor = Visitor(total_visits=0)
        db.session.add(visitor)
        db.session.commit()

    visitor.total_visits += 1
    db.session.commit()
    return jsonify({"total_visits": visitor.total_visits})


# ---------------- HEALTH CHECK ----------------
@api.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})