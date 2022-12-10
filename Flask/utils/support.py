import base64

from werkzeug.exceptions import BadRequest, NotFound

from db import db
from managers.auth import auth
from models.job import JobModel


def return_current_user():
    return auth.current_user()


def return_current_job(job_id):
    job = JobModel.query.filter_by(id=job_id).first()
    if not job:
        raise NotFound(f"Job offer {job_id} does not exist.")
    return job


def db_commit(*args):
    if args:
        db.session.add(args[0])
    db.session.commit()


def db_delete(entry):
    db.session.delete(entry)
    db_commit()


def decode_picture(path, encoded_pic):
    with open(path, "wb") as pic:
        try:
            pic.write(base64.b64decode(encoded_pic.encode("utf-8")))
        except Exception:
            raise BadRequest("Invalid picture.")



