import os
from unittest.mock import patch

from flask_testing import TestCase

from config import initiate_app
from db import db
from models.job import JobModel
from models.user import RecruiterModel
from services.aws_s3 import S3Service
from services.kraken_io import KrakenIoService
from tests.support import *
from utils.constants import TEMP

create_job_endpoint = {
    ("/job/create", "POST"),
}

test_body = {
    "title": "Testing hard",
    "category": "Tests",
    "description": "Tests are cool",
    "requirements": "Tests are annoying",
    "salary": 1500,
    "picture": sample_base64_pic,
    "extension": extension,
}
expected_picture_name = "s3_works"


class TestJob(TestCase):
    def create_app(self):
        return initiate_app("config.TestConfig")

    def setUp(self):
        db.init_app(self.app)
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    @patch("shortuuid.random", mock_shortuuid)
    @patch.object(KrakenIoService, "upload_image", return_value=sample_img_url)
    @patch.object(S3Service, "upload_picture", return_value=expected_picture_name)
    def test_create_new_job(self, mocked_s3_upload, mocked_kraken_io):

        assert len(JobModel.query.all()) == 0
        assert len(RecruiterModel.query.all()) == 0

        user, token = create_recruiter()
        headers = compose_headers(token)
        message = None
        iterate_endpoints(
            self, create_job_endpoint, 201, message, headers, None, test_body
        )

        all_jobs_after = JobModel.query.all()
        test_job = all_jobs_after[0]

        assert len(all_jobs_after) == 1
        assert len(RecruiterModel.query.all()) == 1

        # picture and extension as per test_body
        output_body = {
            "title": test_job.title,
            "category": test_job.category,
            "description": test_job.description,
            "requirements": test_job.requirements,
            "salary": test_job.salary,
            "picture": sample_base64_pic,
            "extension": extension,
        }

        assert test_body == output_body
        assert test_job.picture_name == f"{mock_shortuuid(0)}.jpeg"
        assert test_job.picture_url == expected_picture_name

        file_name = f"{str(mock_shortuuid(0))}.{test_body['extension']}"
        path = os.path.join(TEMP, file_name)

        mocked_s3_upload.assert_called_once_with(path, file_name)
        mocked_kraken_io.aasert_called_once_with(path)

    def test_new_job_schema_err(self):
        user, token = create_recruiter()
        headers = compose_headers(token)

        # TESTING TITLE
        body = test_body.copy()

        # empty string
        body["title"] = ""
        message = "Invalid fields, {'title': ['Length must be between 2 and 30.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # too long
        body["title"] = "t" * 31
        message = "Invalid fields, {'title': ['Length must be between 2 and 30.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # digits
        body["title"] = "12"
        message = "Invalid fields, {'title': ['Input must contain letters only.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # TESTING CATEGORY
        body = test_body.copy()

        # empty string
        body["category"] = ""
        message = "Invalid fields, {'category': ['Length must be between 2 and 20.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # too long
        body["category"] = "t" * 31
        message = "Invalid fields, {'category': ['Length must be between 2 and 20.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # digits
        body["category"] = "12"
        message = "Invalid fields, {'category': ['Input must contain letters only.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # TESTING SALARY
        body = test_body.copy()

        # strings
        body["salary"] = "test"
        message = "Invalid fields, {'salary': ['Not a valid number.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # lower bound
        body["salary"] = 700
        message = "Invalid fields, {'salary': ['Must be greater than 700 and less than or equal to 1000000.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # upper bound
        body["salary"] = 1_000_001
        message = "Invalid fields, {'salary': ['Must be greater than 700 and less than or equal to 1000000.']}"
        iterate_endpoints(self, create_job_endpoint, 400, message, headers, None, body)

        # TESTING FOR MISSING FIELDS

        missing_fields_test(self, test_body, create_job_endpoint, headers)
