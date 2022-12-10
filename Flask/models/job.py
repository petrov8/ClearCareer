from sqlalchemy import func

from db import db
from models.base import InputModel


class JobModel(InputModel):
    __tablename__ = "job"

    title = db.Column(db.String(30), nullable=False)
    category = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text, nullable=False)
    requirements = db.Column(db.Text, nullable=False)
    salary = db.Column(db.Float, nullable=False)
    entry_date = db.Column(db.DateTime, server_default=func.now())
    recruiter_email = db.Column(db.String(30), nullable=False)
    recruiter_id = db.Column(db.Integer, db.ForeignKey("recruiter.id"))

