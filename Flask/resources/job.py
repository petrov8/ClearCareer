from abc import ABC

from flask import request
from flask_api import status
from flask_restful import Resource

from managers.auth import auth
from managers.job import JobManagement
from models.enum import UserTypes
from schemas.incoming.job import NewJobSchema, EditJobSchema
from utils.decors import permission_validator, schema_validator


class PostJobResource(Resource, ABC):
    @staticmethod
    @auth.login_required
    @permission_validator(UserTypes.recruiter)
    @schema_validator(NewJobSchema)
    def post():
        data = request.get_json()
        return JobManagement.add_new_job(data), status.HTTP_201_CREATED


class ShowJobsResource(Resource):
    @staticmethod
    def get():
        return JobManagement.show_all_jobs(), status.HTTP_200_OK


class ShowJobDetails(Resource):
    @staticmethod
    @auth.login_required
    def get(job_id):
        return JobManagement.show_job_details(job_id), status.HTTP_202_ACCEPTED


class EditJobDetails(Resource):
    @staticmethod
    @auth.login_required
    @schema_validator(EditJobSchema)
    def put(job_id):
        data = request.get_json()
        return JobManagement.edit_job_details(job_id, data), status.HTTP_200_OK


class DeleteJobPosting(Resource):
    @staticmethod
    @auth.login_required
    def delete(job_id):
        return JobManagement.delete_posting(job_id), status.HTTP_200_OK
