from marshmallow import fields, validate

from schemas.base import BaseJobSchema


class EditJobSchema(BaseJobSchema):
    description = fields.Str(required=True, validate=validate.Length(min=8, max=2000))
    requirements = fields.Str(required=True, validate=validate.Length(min=8, max=2000))
    salary = fields.Float(
        required=True,
        validate=validate.Range(
            min=700, max=1_000_000, min_inclusive=False, max_inclusive=True
        ),
    )
    picture = fields.Str(required=False)
    extension = fields.Str(required=False)


class NewJobSchema(EditJobSchema):
    picture = fields.Str(required=True)
    extension = fields.Str(required=True)
