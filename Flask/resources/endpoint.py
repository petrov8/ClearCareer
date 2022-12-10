from resources.job import (
    PostJobResource,
    ShowJobsResource,
    ShowJobDetails,
    EditJobDetails,
    DeleteJobPosting,
)
from resources.user import (
    RegisterUserResource,
    LoginUserResource,
    MyProfileResource,
    MyJobsResource,
    LogoutUserResource,
    EditMyProfile,
)


endpoints = (
    (LoginUserResource, "/user/login"),
    (RegisterUserResource, "/user/register"),
    (LogoutUserResource, "/user/logout"),
    (MyProfileResource, "/user/profile"),
    (EditMyProfile, "/user/profile/edit"),
    (MyJobsResource, "/user/jobs"),
    (PostJobResource, "/job/create"),
    (ShowJobsResource, "/job/dashboard"),
    (ShowJobDetails, "/job/details/<int:job_id>"),
    (EditJobDetails, "/job/details/edit/<int:job_id>"),
    (DeleteJobPosting, "/job/delete/<int:job_id>"),
)
