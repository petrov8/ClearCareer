import factory

from db import db
from models.enum import UserTypes
from models.job import JobModel
from models.user import VisitorModel, RecruiterModel, AdminModel


class BaseFactory(factory.Factory):
    @classmethod
    def create(cls, **kwargs):
        new_object = super().create(**kwargs)
        print(db.session)
        db.session.add(new_object)
        db.session.commit()
        return new_object


class JobSeekerFactory(BaseFactory):
    class Meta:
        model = VisitorModel

    id = factory.Sequence(lambda n: n + 1)
    full_name = "Test Testing"
    email = factory.Faker("email")
    password = factory.Faker("password")
    entry_date = "2022-08-26"
    role = UserTypes.visitor
    picture_url = "1111"
    picture_name = "picture"


class RecruiterFactory(BaseFactory):
    class Meta:
        model = RecruiterModel

    id = factory.Sequence(lambda n: n + 1)
    full_name = "Test Testing"
    email = factory.Faker("email")
    password = factory.Faker("password")
    entry_date = factory.Faker("date")
    role = UserTypes.recruiter
    picture_url = "1111"
    picture_name = "picture"


class AdminFactory(BaseFactory):
    class Meta:
        model = AdminModel

    id = factory.Sequence(lambda n: n)
    full_name = "Test Testing"
    email = factory.Faker("email")
    password = factory.Faker("password")
    entry_date = factory.Faker("date")
    role = UserTypes.admin
    picture_url = "1111"
    picture_name = "picture"


class JobFactory(BaseFactory):
    class Meta:
        model = JobModel

    id = 1
    title = factory.Faker("name")
    category = factory.Faker("name")
    description = factory.Faker("text")
    requirements = factory.Faker("text")
    salary = 1000
    entry_date = factory.Faker("date")
    recruiter_id = 1
    picture_url = "1111"
    picture_name = "picture"
