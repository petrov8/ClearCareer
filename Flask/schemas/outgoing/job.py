from marshmallow import fields

from schemas.base import BaseJobSchema


class NewJobSchemaResponse(BaseJobSchema):
    id = fields.Integer(required=True)
    salary = fields.Float(required=True)
    picture_url = fields.Str(required=True)


class DetailsJobResponse(NewJobSchemaResponse):
    picture_url = fields.Str(required=True)
    description = fields.Str(required=True)
    requirements = fields.Str(required=True)
    recruiter_id = fields.Integer(required=True)
