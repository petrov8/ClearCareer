from functools import wraps

from flask import request
from werkzeug.exceptions import BadRequest, Forbidden

from managers.auth import auth
from models.enum import UserTypes
from utils.support import return_current_job, return_current_user


def schema_validator(schema_name):
    def original_function(func):
        @wraps(func)
        def extended_function(*args, **kwargs):
            data = request.get_json()
            schema = schema_name()
            errors = schema.validate(data)
            if errors:
                raise BadRequest(f"Invalid fields, {errors}")
            return func(*args, **kwargs)
        return extended_function
    return original_function


def permission_validator(role):
    def original_function(func):
        @wraps(func)
        def extended_function(*args, **kwargs):
            current_user = auth.current_user()
            if current_user.role != role:
                raise Forbidden("Access denied!")
            return func(*args, **kwargs)
        return extended_function
    return original_function


def check_ownership_decorator(original_func):
    @wraps(original_func)
    def extended_function(job_id, *args):
        offer = return_current_job(job_id)
        user = return_current_user()
        if not (user.role == UserTypes.admin or user.id == offer.recruiter_id):
            raise Forbidden("No edit rights.")
        return original_func(offer, *args)
    return extended_function


# def add_new_email(original_func):
#     @wraps(original_func)
#     def extended_function(data):
#         current_email = EmailsModel.query.filer_by(email=data["email"]).first()
#         if current_email:
#             raise Conflict("Email already in use.")
#         new_email = EmailsModel(**{"email": data["email"]})
#         db_commit(new_email)
#         return original_func(data)
#     return extended_function

