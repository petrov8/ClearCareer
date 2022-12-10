from managers.auth import AuthManager
from managers.job import JobManagement
from tests.factories import RecruiterFactory, VisitorModel
from utils.support import return_current_user


def generate_token(user):
    token = AuthManager.create_token(user)
    return token


def create_recruiter():
    user = RecruiterFactory()
    token = generate_token(user)
    return user, token


def create_visitor():
    user = VisitorModel()
    token = generate_token(user)
    return user, token


def compose_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


def create_job(job_info):
    new_job = JobManagement.add_new_job(job_info)
    return new_job


def current_user():
    return return_current_user()


def mock_shortuuid(a):
    return "test_image_name"


def missing_fields_test(self, test_body, test_endpoints, headers):
    body = test_body.copy()
    for key in test_body.keys():
        message = (
            "Invalid fields, {" + f"'{key}'" + ": ['Missing data for required field.']}"
        )
        body.pop(key)
        iterate_endpoints(self, test_endpoints, 400, message, headers, None, body)
        body = test_body.copy()


def iterate_endpoints(
    self,
    endpoints_data,
    exp_status_code,
    expt_resp_message,
    headers=None,
    payload=None,
    body=None,
):

    if not headers:
        headers = {}
    if not payload:
        payload = {}
    if not body:
        body = {}

    resp = None
    for endpoint, method in endpoints_data:
        if method == "GET":
            resp = self.client.get(endpoint, headers=headers, json=body)
        elif method == "POST":
            resp = self.client.post(endpoint, headers=headers, json=body)
        elif method == "PUT":
            resp = self.client.put(endpoint, headers=headers, json=body)
        elif method == "DELETE":
            resp = self.client.delete(endpoint, headers=headers, json=body)

        assert resp.status_code == exp_status_code
        print(resp.status_code)
        if expt_resp_message is not None:
            assert resp.json["message"] == str(expt_resp_message)


# stored in s3. Do not delete --> test_job.py --> 'test_create_new_job' will fail
sample_img_url = "https://job-website-flask-2022.s3.eu-central-1.amazonaws.com/36ZbEuhFmSvcRcvKBsizrjvSvA48sh.jpeg"
extension = "jpeg"
sample_base64_pic = (
    "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"
)
