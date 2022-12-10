from marshmallow import Schema, fields, validate, ValidationError


def check_if_string(value):
    value = value.replace(" ", "")
    error = [char for char in value if not char.isalpha()]
    if error:
        raise ValidationError("Input must contain letters only.")


class BaseUserSchema(Schema):
    email = fields.Email(required=True)


class BaseJobSchema(Schema):
    title = fields.Str(
        required=True,
        validate=validate.And(validate.Length(min=2, max=30), check_if_string),
    )
    category = fields.Str(
        required=True,
        validate=validate.And(validate.Length(min=2, max=20), check_if_string),
    )
