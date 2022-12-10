import os

from models.user import VisitorModel, RecruiterModel, AdminModel

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEMP = os.path.join(ROOT, "temp")

allowed_profile_types = {
    "Job Seeker": VisitorModel,
    "Recruiter": RecruiterModel,
    "Administrator": AdminModel
}

avatar_use_cases = {
    "register_user": "avatar",
    "edit_my_profile": "avatar"
}



