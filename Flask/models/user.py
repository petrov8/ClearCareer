from sqlalchemy import func

from db import db
from models.base import InputModel, EmailModel
from models.enum import UserTypes


class BaseUserModel(InputModel, EmailModel):
    __abstract__ = True

    full_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    entry_date = db.Column(db.DateTime, server_default=func.now())


class VisitorModel(BaseUserModel):
    __tablename__ = "user"

    role = db.Column(db.Enum(UserTypes), default=UserTypes.visitor)


class RecruiterModel(BaseUserModel):
    __tablename__ = "recruiter"

    role = db.Column(db.Enum(UserTypes), default=UserTypes.recruiter)
    job = db.relationship("JobModel", backref="recruiter", lazy="dynamic")


class AdminModel(BaseUserModel):
    __tablename__ = "admin"

    role = db.Column(db.Enum(UserTypes), default=UserTypes.admin)
