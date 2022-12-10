from unittest.mock import patch

from flask_testing import TestCase

from config import initiate_app
from db import db
from models.job import JobModel
from models.user import RecruiterModel, AdminModel
from services.aws_s3 import S3Service
from tests.factories import JobSeekerFactory, RecruiterFactory, JobFactory, AdminFactory
from tests.support import (
    generate_token,
    iterate_endpoints,
    compose_headers,
    missing_fields_test,
)

protected_endpoints = {
    ("/user/profile", "GET"),
    ("/user/profile/edit", "PUT"),
    ("/user/jobs", "GET"),
    ("/job/create", "POST"),
    ("/job/details/edit/1", "PUT"),
    ("/job/details/1", "GET"),
    ("/job/delete/1", "DELETE"),
}

public_endpoints = {
    ("/user/register", "POST"),
    ("/user/login", "POST"),
    ("/user/dashboard", "GET"),
}

permission_endpoints = {
    ("/job/create", "POST"),
}
registration_endpoints = {("/user/register", "POST")}

ownership_endpoints = {("/job/details/edit/1", "PUT"), ("/job/delete/1", "DELETE")}


class TestApp(TestCase):
    def create_app(self):
        return initiate_app("config.TestConfig")

    def setUp(self):
        db.init_app(self.app)
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_missing_token_err(self):
        iterate_endpoints(self, protected_endpoints, 401, "Missing token")

    def test_invalid_token_err(self):
        headers = compose_headers("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9")
        iterate_endpoints(
            self, protected_endpoints, 401, "Invalid token", headers, None, None
        )

    def test_expired_token_err(self):
        # test token - invalid in app
        headers = compose_headers(
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9."
            "eyJzdWIiOjcsImV4cCI6MTY2MTc1OTI4NiwidHlwZSI6IkFkbWluTW9kZWwifQ."
            "xS6U10Mv1XCCHhUnDKbMywRh7Zf7gEDaJri_GfkwGyo"
        )
        iterate_endpoints(
            self, protected_endpoints, 401, "Expired token", headers, None, None
        )

    def test_register_schema_errs(self):
        headers = {"Content-Type": "application/json"}
        test_body = {
            "full_name": "Test Testing",
            "email": "test@abv.bg",
            "password": "Testinghard1!",
            "profile_type": "Job Seeker",
        }

        # TESTING FULL_NAME

        # just first name (20 edge case for name len)
        body = test_body.copy()
        body["full_name"] = "T" * 2
        message = "Invalid fields, {'full_name': ['Both `first` and `last` names are required.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # 'full_name' is shorter than required
        body["full_name"] = f"T Testing"
        message = "Invalid fields, {'full_name': ['Names are too short. Initial are not accepted.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # 'full_name' is longer than required
        body["full_name"] = f"{'T' * 21} {'T' * 19}"
        message = "Invalid fields, {'full_name': ['Length must be between 2 and 20.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # 'full_name' must contain strings only
        body["full_name"] = "21 Testing"
        message = "Invalid fields, {'full_name': ['Input must contain letters only.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # TESTING EMAIL ADDRESS

        # no email address
        body = test_body.copy()
        body["email"] = ""
        message = "Invalid fields, {'email': ['Not a valid email address.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # invalid email address format
        body["email"] = "johnabv.com"
        message = "Invalid fields, {'email': ['Not a valid email address.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # TESTING PASSWORD

        # missing password
        body = test_body.copy()
        body["password"] = ""
        message = (
            "Invalid fields, {'password': ['Password does not meet requirements.']}"
        )
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # no special character in password
        body["password"] = "Testing1"
        message = (
            "Invalid fields, {'password': ['Password does not meet requirements.']}"
        )
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # no digits in password
        body["password"] = "Testing!"
        message = (
            "Invalid fields, {'password': ['Password does not meet requirements.']}"
        )
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # no capital letter in password
        body["password"] = "testing!"
        message = (
            "Invalid fields, {'password': ['Password does not meet requirements.']}"
        )
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # TESTING PROFILE TYPE

        # missing profile type
        body = test_body.copy()
        body["profile_type"] = ""
        message = "Invalid fields, {'profile_type': ['Invalid profile type.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # non-existing profile type
        body["profile_type"] = "Admin"
        message = "Invalid fields, {'profile_type': ['Invalid profile type.']}"
        iterate_endpoints(
            self, registration_endpoints, 400, message, headers, None, body
        )

        # TESTING FOR MISSING FIELDS

        missing_fields_test(self, test_body, registration_endpoints, headers)

    @patch.object(S3Service, "delete_picture")
    def test_permissions_admin(self, mocked_s3_delete):

        assert len(JobModel.query.all()) == 0
        assert len(RecruiterModel.query.all()) == 0
        recruiter = RecruiterFactory()
        JobFactory()
        # new_job = JobFactory
        # new_job.recruiter_id = recruiter.id
        # new_job()

        admin = AdminFactory()
        token = generate_token(admin)
        headers = compose_headers(token)

        edit_data = {
            "title": "Edit",
            "category": "Edit",
            "description": "Edit",
            "requirements": "Edit",
            "salary": 1500,
        }

        assert len(JobModel.query.all()) == 1
        assert len(RecruiterModel.query.all()) == 1
        assert len(AdminModel.query.all()) == 1

        iterate_endpoints(
            self, ownership_endpoints, 200, None, headers, None, edit_data
        )

    def test_permissions_err(self):

        user = JobSeekerFactory()
        token = generate_token(user)
        headers = compose_headers(token)

        iterate_endpoints(
            self, permission_endpoints, 403, "Access denied!", headers, None, None
        )

    def test_ownership_err_recruiter(self):
        RecruiterFactory()
        JobFactory()

        not_owner = RecruiterFactory()
        token = generate_token(not_owner)
        headers = compose_headers(token)

        edit_data = {
            "title": "Edit",
            "category": "Edit Edit",
            "description": "sample description",
            "requirements": "sample requirements",
            "salary": 1500,
        }

        iterate_endpoints(
            self, ownership_endpoints, 403, "No edit rights.", headers, None, edit_data
        )
