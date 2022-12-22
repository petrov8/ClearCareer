from flask import request
from flask_api import status
from flask_restful import Resource

from managers.auth import auth
from managers.user import UserManagement
from schemas.incoming.user import RegisterSchema, LoginSchema, EditUserSchema
from utils.decors import schema_validator


class RegisterUserResource(Resource):
    @staticmethod
    @schema_validator(RegisterSchema)
    def post():
        data = request.get_json()
        token, user_id, user_role, user_email = UserManagement.register_user(data)
        return {
            "token": token,
            "_id": user_id,
            "_role": user_role,
            "_email": user_email
        }, status.HTTP_201_CREATED


class LoginUserResource(Resource):
    @staticmethod
    @schema_validator(LoginSchema)
    def post():
        data = request.get_json()
        token, user_id, user_role, user_email = UserManagement.login_user(data)
        return {
            "token": token,
            "_id": user_id,
            "_role": user_role,
            "_email": user_email
        }, status.HTTP_202_ACCEPTED


class LogoutUserResource(Resource):
    @staticmethod
    def get():
        return status.HTTP_204_NO_CONTENT


class MyProfileResource(Resource):
    @staticmethod
    @auth.login_required
    def get():
        return UserManagement.my_profile(), status.HTTP_202_ACCEPTED


class MyJobsResource(Resource):
    @staticmethod
    @auth.login_required
    def get():
        return UserManagement.my_listings(), status.HTTP_202_ACCEPTED


class EditMyProfile(Resource):
    @staticmethod
    @auth.login_required
    @schema_validator(EditUserSchema)
    def put():
        data = request.get_json()
        return UserManagement.edit_my_profile(data), status.HTTP_200_OK
