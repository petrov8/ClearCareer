from db import db


class IdModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)


class EmailModel(db.Model):
    __abstract__ = True

    email = db.Column(db.String(50), nullable=False, unique=True)


class InputModel(IdModel):
    __abstract__ = True

    picture_url = db.Column(db.String(255), nullable=True)
    picture_name = db.Column(db.String(255), nullable=True)
