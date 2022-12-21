import os

from werkzeug.exceptions import BadRequest, Conflict, NotFound, InternalServerError
from werkzeug.security import generate_password_hash, check_password_hash

from managers.auth import AuthManager
from managers.s3 import add_pic_to_s3, delete_pic_from_s3
from models.emails import EmailsModel
from models.job import JobModel
from models.user import RecruiterModel, VisitorModel, AdminModel
from schemas.outgoing.job import NewJobSchemaResponse
from schemas.outgoing.user import UserProfileResponse
from utils.constants import allowed_profile_types
from utils.support import db_commit, return_current_user


class UserManagement:
    @staticmethod
    def register_user(registration_data):

        email = registration_data["email"]
        UserManagement.add_new_email(email)
        registration_data["password"] = generate_password_hash(
            registration_data["password"]
        )

        if "picture" in registration_data.keys():
            registration_data, path = add_pic_to_s3(registration_data)
            try:
                return UserManagement.commit_new_user(registration_data)
            except Exception:
                delete_pic_from_s3(registration_data["picture_name"])
                UserManagement.remove_existing_email(email)
                os.remove(path)
                raise InternalServerError("Registration failed.")
            finally:
                os.remove(path)
        else:
            return UserManagement.commit_new_user(registration_data)

    @staticmethod
    def commit_new_user(registration_data):
        profile_type = registration_data["profile_type"]
        user_model = allowed_profile_types[profile_type]
        registration_data.pop("profile_type")
        new_user = user_model(**registration_data)
        db_commit(new_user)
        return AuthManager.create_token(new_user), new_user.id, new_user.role.name, new_user.email

    @staticmethod
    def login_user(login_data):
        user = VisitorModel.query.filter_by(email=login_data["email"]).first()
        if not user:
            user = RecruiterModel.query.filter_by(email=login_data["email"]).first()
            if not user:
                user = AdminModel.query.filter_by(email=login_data["email"]).first()
                if not user:
                    raise NotFound("User does not exist.")

        if check_password_hash(user.password, login_data["password"]):
            return AuthManager.create_token(user), user.id, user.role.name, user.email
        raise BadRequest("Wrong password.")

    @staticmethod
    def my_profile():
        user = return_current_user()
        return UserProfileResponse().dump(user)

    @staticmethod
    def my_listings():
        user = return_current_user()
        offers = JobModel.query.filter_by(recruiter_id=user.id).all()
        offers = sorted(
            [offer for offer in offers], key=lambda x: x.entry_date, reverse=True
        )
        return NewJobSchemaResponse().dump(offers, many=True)

    @staticmethod
    def edit_my_profile(to_edit):
        user = return_current_user()
        try:
            if "picture" in to_edit.keys():
                if user.picture_name is not None:
                    delete_pic_from_s3(user.picture_name)
                    user.picture_url = None
                data, path = add_pic_to_s3(to_edit)
                user.picture_url = data["picture_url"]
                user.picture_name = data["picture_name"]
                os.remove(path)
        except Exception:
            raise BadRequest("Picture upload failed.")
        finally:
            if user.email != to_edit["email"]:
                UserManagement.add_new_email(to_edit["email"])
                UserManagement.remove_existing_email(user.email)
                user.email = to_edit["email"]
            user.full_name = to_edit["full_name"]

            db_commit()
            return

    @staticmethod
    def add_new_email(email_data):
        try:
            new_email = EmailsModel(**{"email": email_data})
            db_commit(new_email)
        except Exception:
            raise Conflict("Email is already taken.")

    @staticmethod
    def remove_existing_email(email):
        EmailsModel.query.filter_by(email=email).delete()

