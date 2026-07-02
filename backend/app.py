import os
from flask import Flask
from flask_cors import CORS
from database import db
from routes import api
from models import Project, Skill, Experience, Certification, Visitor


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL", "sqlite:///portfolio.db"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)
    app.register_blueprint(api, url_prefix="/api")

    # ---------------- ROOT ROUTE ----------------
    @app.route("/")
    def index():
        return {
            "message": "Tanuj Nimkar Portfolio API is running 🚀",
            "endpoints": [
                "/api/profile",
                "/api/projects",
                "/api/skills",
                "/api/experience",
                "/api/certifications",
                "/api/contact (POST)",
                "/api/visitors",
                "/api/health",
            ],
        }

    @app.route("/favicon.ico")
    def favicon():
        return "", 204

    with app.app_context():
        db.create_all()
        seed_data()

    return app


def seed_data():
    """Seed the database only if empty."""
    if Project.query.first() is None:
        projects = [
            Project(
                title="Production-Grade Cloud Native E-Commerce Platform",
                description="Production-ready cloud-native e-commerce platform deployed on AWS EKS using Terraform, GitOps, Helm, and ArgoCD.",
                github="https://github.com/TanUjNimkar/Production-Grade-Cloud-Native-E-Commerce-Platform",
                technologies="AWS,EKS,Terraform,Docker,ArgoCD,Helm,CloudWatch,NGINX,Cert-Manager",
                category="Cloud Infrastructure",
                icon="cart",
            ),
            Project(
                title="End-to-End DevOps CI/CD Pipeline",
                description="Complete DevSecOps pipeline: Build -> Test -> SonarQube -> Trivy -> Docker -> EC2 Deploy.",
                github="https://github.com/TanUjNimkar/end-to-end-devops-cicd-pipeline",
                technologies="Jenkins,Docker,AWS,SonarQube,Trivy,GitHub",
                category="CI/CD",
                icon="jenkins",
            ),
            Project(
                title="Terraform Bootstrap",
                description="Terraform bootstrap project for AWS infrastructure and remote backend configuration.",
                github="https://github.com/TanUjNimkar/terraform-bootstrap",
                technologies="Terraform,AWS,S3,DynamoDB",
                category="Infrastructure as Code",
                icon="diagram",
            ),
            Project(
                title="Simple Quiz DevOps",
                description="Simple quiz application demonstrating Docker, CI/CD, and deployment practices.",
                github="https://github.com/TanUjNimkar/simple-quiz-devops",
                technologies="Docker,GitHub Actions,AWS",
                category="CI/CD",
                icon="question",
            ),
            Project(
                title="DevSecOps GitOps EKS Platform",
                description="Enterprise DevSecOps platform with Kubernetes, GitOps, ArgoCD, and security scanning.",
                github="https://github.com/TanUjNimkar/devsecops-gitops-eks-platform",
                technologies="Kubernetes,ArgoCD,Helm,Trivy,SonarQube",
                category="DevSecOps",
                icon="shield",
            ),
            Project(
                title="AWS EKS GitOps Ecommerce Platform",
                description="Cloud-native e-commerce application deployed on Amazon EKS using GitOps principles.",
                github="https://github.com/TanUjNimkar/aws-eks-gitops-ecommerce-platform",
                technologies="AWS,Terraform,ArgoCD,Docker,Helm",
                category="Cloud Native",
                icon="cloud",
            ),
            Project(
                title="EKS GitOps 3-Tier App",
                description="Three-tier architecture (Frontend, Backend, Database) deployed on Kubernetes with GitOps.",
                github="https://github.com/TanUjNimkar/eks-gitops-3tier-app",
                technologies="Kubernetes,ArgoCD,Docker,Helm",
                category="Kubernetes",
                icon="layers",
            ),
            Project(
                title="Next.js Movie Browser",
                description="Movie browsing application built with Next.js featuring search and API integration.",
                github="https://github.com/TanUjNimkar/nextjs-movie-browser",
                technologies="Next.js,React,JavaScript",
                category="Full-Stack",
                icon="film",
            ),
        ]
        db.session.bulk_save_objects(projects)

    if Skill.query.first() is None:
        skills = [
            Skill(skill="AWS (EC2, IAM, VPC)", category="Cloud", level=90),
            Skill(skill="EKS / Route53 / RDS", category="Cloud", level=85),
            Skill(skill="CloudWatch / S3 / ACM", category="Cloud", level=88),
            Skill(skill="Terraform", category="Infrastructure", level=88),
            Skill(skill="Ansible", category="Infrastructure", level=78),
            Skill(skill="Docker", category="Containers", level=90),
            Skill(skill="Kubernetes", category="Containers", level=85),
            Skill(skill="Helm", category="Containers", level=80),
            Skill(skill="Jenkins", category="CI/CD", level=85),
            Skill(skill="GitHub Actions", category="CI/CD", level=82),
            Skill(skill="ArgoCD", category="CI/CD", level=80),
            Skill(skill="Prometheus & Grafana", category="Monitoring", level=75),
            Skill(skill="AWS CloudWatch", category="Monitoring", level=85),
            Skill(skill="Trivy / SonarQube", category="Security", level=78),
            Skill(skill="Bash / Linux", category="Programming", level=85),
            Skill(skill="Python", category="Programming", level=65),
        ]
        db.session.bulk_save_objects(skills)

    if Experience.query.first() is None:
        exp = Experience(
            role="DevOps Engineer Intern",
            company="SwiftSoft InfoTech",
            location="Hyderabad",
            duration="Feb 2026 - Apr 2026",
            responsibilities="Designed Jenkins & GitHub Actions CI/CD pipelines|Containerized microservices with Docker for AWS deployment|Administered Linux servers and Git workflows|Automated infrastructure with Ansible|Integrated Prometheus & Grafana for monitoring",
        )
        db.session.add(exp)

    if Certification.query.first() is None:
        certs = [
            Certification(title="AWS Certified Solutions Architect - Associate", issuer="Amazon Web Services", code="SAA-C03"),
            Certification(title="AWS Certified Cloud Practitioner", issuer="Amazon Web Services", code="CLF-C02"),
        ]
        db.session.bulk_save_objects(certs)

    if Visitor.query.first() is None:
        db.session.add(Visitor(total_visits=0))

    db.session.commit()


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)