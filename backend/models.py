from datetime import datetime
from database import db


class Contact(db.Model):
    __tablename__ = "contact"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    subject = db.Column(db.String(200))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
        }


class Project(db.Model):
    __tablename__ = "projects"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    github = db.Column(db.String(300), nullable=False)
    technologies = db.Column(db.String(300))  # comma-separated
    category = db.Column(db.String(100))
    icon = db.Column(db.String(100), default="cloud")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "github": self.github,
            "technologies": self.technologies.split(",") if self.technologies else [],
            "category": self.category,
            "icon": self.icon,
        }


class Skill(db.Model):
    __tablename__ = "skills"
    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, default=70)

    def to_dict(self):
        return {
            "id": self.id,
            "skill": self.skill,
            "category": self.category,
            "level": self.level,
        }


class Experience(db.Model):
    __tablename__ = "experience"
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(150))
    duration = db.Column(db.String(100))
    responsibilities = db.Column(db.Text)  # pipe-separated

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
            "company": self.company,
            "location": self.location,
            "duration": self.duration,
            "responsibilities": self.responsibilities.split("|") if self.responsibilities else [],
        }


class Certification(db.Model):
    __tablename__ = "certifications"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    issuer = db.Column(db.String(150))
    code = db.Column(db.String(50))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "issuer": self.issuer,
            "code": self.code,
        }


class Visitor(db.Model):
    __tablename__ = "visitors"
    id = db.Column(db.Integer, primary_key=True)
    total_visits = db.Column(db.Integer, default=0)